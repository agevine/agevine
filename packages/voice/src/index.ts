export interface AgevineVoiceConfig {
  apiKey?: string;
  endpoint: string; // The base URL of the Agevine API Gateway
}

export interface VoicePayload {
  patientId: number;
  transcript: string;
  summary?: string;
  durationSeconds?: number;
  sentimentScore?: number; // 0-100 score of the patient's mood during the call
}

export class AgevineVoiceClient {
  private config: AgevineVoiceConfig;

  constructor(config: AgevineVoiceConfig) {
    if (!config.endpoint) {
      throw new Error("AgevineVoiceClient requires an endpoint configuration");
    }
    this.config = config;
  }

  /**
   * Logs a completed AI voice check-in to the Agevine platform.
   * Can be triggered from webhook responses from Retell AI, Vapi, etc.
   */
  async logCall(payload: VoicePayload): Promise<boolean> {
    try {
      const url = `${this.config.endpoint}/api/v1/voice/webhook`;
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
      console.error("[Agevine Voice SDK] Failed to log call:", error);
      return false;
    }
  }
}
