export interface AgevineIoTConfig {
  apiKey?: string;
  endpoint: string; // Base URL of Agevine API Gateway
}

export interface IoTSensorPayload {
  patientId: number;
  sensorType: 'bed_sensor' | 'fall_mat' | 'motion' | 'temperature' | 'custom';
  eventType: 'trigger' | 'reading' | 'alert';
  value: string;
  metadata?: any;
}

export interface IoTSensorAdapter {
  sensorName: string;
  connect(): Promise<void>;
  onEvent(callback: (payload: IoTSensorPayload) => void): void;
  disconnect(): void;
}

export class WebhookAdapter implements IoTSensorAdapter {
  sensorName = 'Generic Webhook Sensor';
  private callback: ((payload: IoTSensorPayload) => void) | null = null;

  async connect() {
    console.log(`[WebhookAdapter] Ready to receive HTTP webhooks.`);
  }

  onEvent(callback: (payload: IoTSensorPayload) => void) {
    this.callback = callback;
  }

  disconnect() {
    this.callback = null;
  }

  // Exposed so the host app can feed webhooks into this adapter
  public handleIncomingWebhook(payload: IoTSensorPayload) {
    if (this.callback) {
      this.callback(payload);
    }
  }
}

export class MQTTAdapter implements IoTSensorAdapter {
  sensorName = 'MQTT Smart Home Sensor';
  private brokerUrl: string;

  constructor(brokerUrl: string) {
    this.brokerUrl = brokerUrl;
  }

  async connect() {
    // In a real implementation, you would use the mqtt.js package here
    console.log(`[MQTTAdapter] (Mock) Connected to MQTT broker at ${this.brokerUrl}`);
  }

  onEvent(callback: (payload: IoTSensorPayload) => void) {
    // Mock incoming MQTT message
    setTimeout(() => {
      callback({
        patientId: 0,
        sensorType: 'motion',
        eventType: 'trigger',
        value: 'detected',
        metadata: { topic: 'home/bedroom/motion' }
      });
    }, 5000);
  }

  disconnect() {
    console.log(`[MQTTAdapter] (Mock) Disconnected`);
  }
}

export class BLEAdapter implements IoTSensorAdapter {
  sensorName = 'BLE Fall Detection Wristband';

  async connect() {
    console.log(`[BLEAdapter] (Mock) Scanning for BLE devices...`);
  }

  onEvent(callback: (payload: IoTSensorPayload) => void) {
    // BLE scanning loop mock
  }

  disconnect() {
    console.log(`[BLEAdapter] (Mock) Disconnected`);
  }
}

export class AgevineIoTClient {
  private config: AgevineIoTConfig;

  constructor(config: AgevineIoTConfig) {
    if (!config.endpoint) {
      throw new Error("AgevineIoTClient requires an endpoint configuration");
    }
    this.config = config;
  }

  async reportEvent(payload: IoTSensorPayload): Promise<boolean> {
    try {
      const url = `${this.config.endpoint}/api/v1/iot/webhook`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(this.config.apiKey ? { "Authorization": `Bearer ${this.config.apiKey}` } : {})
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Agevine API returned ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error("[Agevine IoT SDK] Failed to report event:", error);
      return false;
    }
  }

  registerAdapter(adapter: IoTSensorAdapter) {
    adapter.onEvent((payload) => {
      this.reportEvent(payload);
    });
  }
}
