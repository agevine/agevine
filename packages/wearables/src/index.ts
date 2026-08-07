import WebSocket from 'ws';

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

export interface OAuthProviderAdapter {
  providerName: string;
  getAuthorizationUrl(redirectUri: string): string;
  handleCallback(code: string, redirectUri: string): Promise<{ accessToken: string, refreshToken: string }>;
  fetchVitals(accessToken: string): Promise<VitalsPayload>;
}

export class OuraAdapter implements OAuthProviderAdapter {
  providerName = 'Oura';
  
  getAuthorizationUrl(redirectUri: string): string {
    return `https://cloud.ouraring.com/oauth/authorize?client_id=YOUR_ID&response_type=code&redirect_uri=${redirectUri}`;
  }
  
  async handleCallback(code: string, redirectUri: string) {
    const res = await fetch("https://api.ouraring.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`
    });
    if (!res.ok) throw new Error("Oura OAuth failed");
    return res.json();
  }
  
  async fetchVitals(accessToken: string): Promise<VitalsPayload> {
    const res = await fetch("https://api.ouraring.com/v2/usercollection/heartrate", {
      headers: { "Authorization": `Bearer ${accessToken}` }
    });
    if (!res.ok) throw new Error("Failed to fetch Oura vitals");
    const data = await res.json();
    return { patientId: 0, heartRate: data.data?.[0]?.bpm || 0 };
  }
}

export class WhoopAdapter implements OAuthProviderAdapter {
  providerName = 'Whoop';
  getAuthorizationUrl(redirectUri: string) { return `https://api.prod.whoop.com/oauth/oauth2/auth?client_id=YOUR_ID&response_type=code&redirect_uri=${redirectUri}`; }
  async handleCallback(code: string, redirectUri: string) { 
    const res = await fetch("https://api.prod.whoop.com/oauth/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`
    });
    return res.json(); 
  }
  async fetchVitals(accessToken: string): Promise<VitalsPayload> { 
    const res = await fetch("https://api.prod.whoop.com/developer/v1/recovery", {
      headers: { "Authorization": `Bearer ${accessToken}` }
    });
    const data = await res.json();
    return { patientId: 0, heartRate: data.score?.resting_heart_rate || 0 }; 
  }
}

export class GarminAdapter implements OAuthProviderAdapter {
  providerName = 'Garmin';
  getAuthorizationUrl(redirectUri: string) { return `https://connect.garmin.com/oauth`; }
  async handleCallback() { return { accessToken: 'mock', refreshToken: 'mock' }; }
  async fetchVitals() { return { patientId: 0, heartRate: 65, steps: 8000 }; }
}

export class AgevineClient {
  private config: AgevineConfig;
  private ws: WebSocket | null = null;

  constructor(config: AgevineConfig) {
    if (!config.endpoint) {
      throw new Error("AgevineClient requires an endpoint configuration");
    }
    this.config = config;
  }

  /**
   * Syncs smartwatch or IoT device vitals via HTTP POST (Rest).
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

  /**
   * Starts a high-frequency WebSocket connection to stream live EKG and heart rate data.
   */
  startStream(patientId: number, onOpen?: () => void) {
    const wsUrl = this.config.endpoint.replace(/^http/, 'ws') + `/api/v1/wearables/stream?patientId=${patientId}`;
    
    this.ws = new WebSocket(wsUrl);
    
    this.ws.on('open', () => {
      console.log(`[Agevine SDK] WebSocket streaming started for patient ${patientId}`);
      if (onOpen) onOpen();
    });

    this.ws.on('error', (err) => {
      console.error(`[Agevine SDK] WebSocket error:`, err);
    });

    this.ws.on('close', () => {
      console.log(`[Agevine SDK] WebSocket streaming stopped.`);
    });
  }

  /**
   * Sends a high-frequency data packet via WebSocket.
   */
  streamData(vitals: VitalsPayload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(vitals));
    } else {
      console.warn("[Agevine SDK] WebSocket is not connected. Call startStream() first.");
    }
  }

  stopStream() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
