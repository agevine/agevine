export interface AgevineConfig {
  apiKey?: string;
  endpoint: string; // The base URL of the Agevine API Gateway
}

export interface VitalsPayload {
  patientId: number;
  heartRate?: number;
  steps?: number;
  bloodOxygen?: number;
  temperature?: number;
}

export class AgevineClient {
  private config: AgevineConfig;

  constructor(config: AgevineConfig) {
    if (!config.endpoint) {
      throw new Error("AgevineClient requires an endpoint configuration");
    }
    this.config = config;
  }

  /**
   * Syncs smartwatch or IoT device vitals back to the Agevine platform.
   */
  async syncVitals(vitals: VitalsPayload): Promise<boolean> {
    try {
      const url = `${this.config.endpoint}/api/v1/wearables/webhook`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(this.config.apiKey ? { "Authorization": `Bearer ${this.config.apiKey}` } : {})
        },
        body: JSON.stringify(vitals)
      });

      if (!response.ok) {
        throw new Error(`Agevine API returned ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error("[Agevine SDK] Failed to sync vitals:", error);
      return false;
    }
  }
}
