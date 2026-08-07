import Foundation
import HealthKit

@objc(AgevineHealthKit)
class AgevineHealthKit: NSObject {
  
  let healthStore = HKHealthStore()
  var isConnected = false
  
  @objc
  func requestPermissions(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    guard HKHealthStore.isHealthDataAvailable() else {
      reject("UNAVAILABLE", "HealthKit is not available on this device", nil)
      return
    }
    
    let typesToRead: Set = [
      HKObjectType.quantityType(forIdentifier: .heartRate)!,
      HKObjectType.quantityType(forIdentifier: .stepCount)!,
      HKObjectType.quantityType(forIdentifier: .oxygenSaturation)!,
      HKObjectType.categoryType(forIdentifier: .appleStandHour)!
    ]
    
    healthStore.requestAuthorization(toShare: nil, read: typesToRead) { (success, error) in
      if success {
        self.isConnected = true
        resolve(true)
      } else {
        self.isConnected = false
        reject("AUTH_FAILED", error?.localizedDescription ?? "Authorization failed", error)
      }
    }
  }
  
  @objc
  func startEKGStreaming(_ endpoint: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    guard isConnected else {
      reject("NOT_CONNECTED", "Please request permissions first", nil)
      return
    }
    
    guard let wsUrl = URL(string: endpoint.replacingOccurrences(of: "http", with: "ws") + "/api/v1/wearables/stream?patientId=1") else {
      reject("INVALID_URL", "Invalid endpoint URL", nil)
      return
    }
    
    let session = URLSession(configuration: .default)
    let webSocketTask = session.webSocketTask(with: wsUrl)
    webSocketTask.resume()
    
    let heartRateType = HKObjectType.quantityType(forIdentifier: .heartRate)!
    let query = HKAnchoredObjectQuery(type: heartRateType, predicate: nil, anchor: nil, limit: HKObjectQueryNoLimit) { (query, samples, deletedObjects, newAnchor, error) in
        self.processSamples(samples: samples, webSocketTask: webSocketTask)
    }
    
    query.updateHandler = { (query, samples, deletedObjects, newAnchor, error) in
        self.processSamples(samples: samples, webSocketTask: webSocketTask)
    }
    
    healthStore.execute(query)
    
    print("[AgevineHealthKit] Started native WebSocket EKG streaming to \(wsUrl)")
    resolve(true)
  }
  
  private func processSamples(samples: [HKSample]?, webSocketTask: URLSessionWebSocketTask) {
      guard let quantitySamples = samples as? [HKQuantitySample] else { return }
      
      for sample in quantitySamples {
          let heartRateUnit = HKUnit(from: "count/min")
          let heartRate = sample.quantity.doubleValue(for: heartRateUnit)
          
          let payload = "{\"patientId\": 1, \"heartRate\": \(heartRate)}"
          let message = URLSessionWebSocketTask.Message.string(payload)
          
          webSocketTask.send(message) { error in
              if let error = error {
                  print("[AgevineHealthKit] WebSocket Error: \(error)")
              }
          }
      }
  }
}
