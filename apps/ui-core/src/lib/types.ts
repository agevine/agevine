// Shared type definitions derived from the Drizzle schema in api-gateway/src/db/schema.ts
// These mirror the database row types so the frontend never needs `any`.

export interface Patient {
  id: number;
  userId: number;
  fullName: string;
  dateOfBirth: string | null;
  phoneNumber: string | null;
  timezone: string | null;
  doctorEmail: string | null;
  deviceBattery: number | null;
  deviceStatus: string | null;
  createdAt: string;
}

export interface VitalsLog {
  id: number;
  patientId: number;
  heartRate: number | null;
  steps: number | null;
  bloodOxygen: number | null;
  timestamp: string;
}

export interface VoiceLog {
  id: number;
  patientId: number;
  transcript: string | null;
  summary: string | null;
  durationSeconds: number | null;
  sentimentScore: number | null;
  cognitiveFlag: boolean | null;
  timestamp: string;
}

export interface AlertRule {
  id: number;
  patientId: number;
  metric: string;
  condition: string;
  threshold: string;
  channel: string;
  destination: string;
  enabled: boolean | null;
  createdAt: string;
}

export interface AlertEvent {
  id: number;
  ruleId: number;
  patientId: number;
  message: string;
  channel: string;
  status: string;
  createdAt: string;
}

export interface SystemStatus {
  twilio: boolean;
  sendgrid: boolean;
  openai: boolean;
}

export interface VitalsResponse {
  patient: Patient;
  heartRate: number | string;
  heartRateTrend: string;
  steps: number;
  stepsTrend: string;
  checkInMessage: string;
  checkInStatus: string;
}

export interface ChartDataPoint {
  time: string;
  heartRate: number;
  steps: number;
}
