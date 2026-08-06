export interface AgevineVoiceConfig {
  apiKey?: string;
  endpoint: string; // The base URL of the Agevine API Gateway
  openAiApiKey?: string; // Optional: For TTS generation
}

export interface VoicePayload {
  patientId: number;
  transcript: string;
  summary?: string;
  durationSeconds?: number;
  sentimentScore?: number; // 0-100 score of the patient's mood during the call
}

export interface TTSAdapter {
  synthesize(text: string): Promise<Buffer>;
}

export class OpenAIVoiceAdapter implements TTSAdapter {
  private apiKey: string;
  private voice: string;

  constructor(apiKey: string, voice: string = 'alloy') {
    this.apiKey = apiKey;
    this.voice = voice;
  }

  async synthesize(text: string): Promise<Buffer> {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: text,
        voice: this.voice,
        response_format: 'mp3'
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI TTS Error: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
}

export class DummyVoiceAdapter implements TTSAdapter {
  async synthesize(text: string): Promise<Buffer> {
    console.log(`[DummyVoiceAdapter] Synthesizing audio for: "${text}"`);
    // In a real scenario, this would return a pre-recorded mock MP3 buffer.
    // For local dev, we return a tiny valid empty mp3 buffer or a string converted to buffer.
    // We'll just return a 1-second silent MP3 buffer (magic bytes for MPEG ADTS, layer III, v1)
    const silentMp3Hex = "FFFBA444000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    return Buffer.from(silentMp3Hex, "hex");
  }
}

export class AgevineVoiceClient {
  private config: AgevineVoiceConfig;
  public tts: TTSAdapter;

  constructor(config: AgevineVoiceConfig) {
    if (!config.endpoint) {
      throw new Error("AgevineVoiceClient requires an endpoint configuration");
    }
    this.config = config;

    // Initialize the appropriate TTS adapter
    if (this.config.openAiApiKey) {
      this.tts = new OpenAIVoiceAdapter(this.config.openAiApiKey);
    } else {
      console.warn("[Agevine Voice SDK] No openAiApiKey provided. Falling back to DummyVoiceAdapter.");
      this.tts = new DummyVoiceAdapter();
    }
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

  /**
   * Convenience method to generate TTS audio buffer directly via the configured adapter.
   */
  async synthesizeSpeech(text: string): Promise<Buffer> {
    return this.tts.synthesize(text);
  }
}
