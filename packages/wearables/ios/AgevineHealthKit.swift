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
    
    // In a real application, this would set up an HKAnchoredObjectQuery or HKObserverQuery
    // to stream data via WebSockets to the provided endpoint.
    print("[AgevineHealthKit] Started native WebSocket EKG streaming to \(endpoint)")
    resolve(true)
  }
}
