# Wearables Integration Guide

This guide will show you exactly how to integrate Agevine with any smartwatch or IoT medical device. Agevine supports 3 different ways to get data into the platform: Native Modules (iOS/Android), Cloud OAuth (Oura/Whoop), and Generic Webhooks (Generic/Cheap Smartwatches).

## 1. Native Mobile Integration (Apple Watch & Wear OS)

If you are building your own companion app for iOS or Android, you can directly import our native modules. This allows you to pull high-frequency data (like WebSockets) straight from the phone's local health sensors.

### iOS (Apple HealthKit)
1. In your Xcode project, add the `@agevine/wearables` dependency.
2. Ensure you have the `NSHealthShareUsageDescription` key in your `Info.plist`.
3. Import and use the module in your Swift code:
```swift
import AgevineHealthKit

let agevine = AgevineHealthKit()

// 1. Request Permission
agevine.requestPermissions({ success in 
    // 2. Start Streaming EKG/HR data to the API Gateway
    agevine.startEKGStreaming("ws://localhost:3005")
}, reject: { error in 
    print(error)
})
```

### Android (Google Health Connect)
1. Ensure your Android `AndroidManifest.xml` has Health Connect permissions declared.
2. Import the Kotlin module:
```kotlin
import com.agevine.wearables.AgevineHealthConnect

val agevine = AgevineHealthConnect(context)

// Check permissions and start streaming
if (agevine.checkPermissions(true)) {
    val stream = agevine.startVitalsStream("ws://localhost:3005")
    stream.collect { record -> 
        // Data is automatically sent to the Agevine dashboard
    }
}
```

## 2. Cloud Integrations (Oura, Whoop, Garmin)

If the user has a device that syncs to a 3rd-party cloud, you don't need a native app. You can use our backend Node.js SDK to authenticate them via OAuth2.

```typescript
import { AgevineClient, OuraAdapter } from '@agevine/wearables';

const oura = new OuraAdapter();

// Generate the login link for the user
const authUrl = oura.getAuthorizationUrl('https://yourapp.com/callback');

// Once they log in, fetch their vitals
const vitals = await oura.fetchVitals(userToken);
```

## 3. Generic Smartwatches (Cheap / Unbranded Devices)

If you are using a generic unbranded smartwatch (e.g., from AliExpress) that doesn't have an open API, you can easily route its data into Agevine using our generic HTTP webhooks. 

Most of these watches sync to an open-source app on the phone like **Gadgetbridge**. You can configure Gadgetbridge to make a standard HTTP POST request every time the watch reads the heart rate.

Point the watch's webhook URL to your Agevine API Gateway:
`POST http://your-api-gateway.com/api/v1/wearables/webhook`

**Payload Format:**
```json
{
  "patientId": 1,
  "heartRate": 72,
  "steps": 4500,
  "bloodOxygen": 98
}
```
As long as the cheap smartwatch can fire a JSON payload, Agevine can graph it!
