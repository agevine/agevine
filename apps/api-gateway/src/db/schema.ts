import { pgTable, serial, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";

// 1. Users (The Caregivers / Family Members)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. Patients (The Elderly Parents)
export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(), // Links to caregiver
  fullName: varchar("full_name", { length: 255 }).notNull(),
  dateOfBirth: timestamp("date_of_birth"),
  phoneNumber: varchar("phone_number", { length: 20 }), // For Twilio AI voice calls
  timezone: varchar("timezone", { length: 50 }).default("UTC"),
  doctorEmail: varchar("doctor_email", { length: 255 }),
  deviceBattery: integer("device_battery").default(100),
  deviceStatus: varchar("device_status", { length: 50 }).default("Online"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. Vitals Logs (Data from Apple Watch / Garmin / Oura)
export const vitalsLogs = pgTable("vitals_logs", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id).notNull(),
  heartRate: integer("heart_rate"), // bpm
  steps: integer("steps"),
  bloodOxygen: integer("blood_oxygen"), // percentage
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// 4. Voice Logs (Transcripts from Daily AI Check-ins)
export const voiceLogs = pgTable("voice_logs", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id).notNull(),
  transcript: varchar("transcript", { length: 5000 }), // The raw conversation
  summary: varchar("summary", { length: 1000 }), // Summary of the call
  durationSeconds: integer("duration_seconds"), // Length of the call
  sentimentScore: integer("sentiment_score"), // 1-100 score of their mood
  cognitiveFlag: boolean("cognitive_flag").default(false), // True if AI detected confusion/repetition
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// 5. IoT Events (Smart Home Sensors, Fall Mats, etc.)
export const iotEvents = pgTable("iot_events", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id).notNull(),
  sensorType: varchar("sensor_type", { length: 100 }).notNull(), // 'bed_sensor', 'fall_mat', 'motion'
  eventType: varchar("event_type", { length: 100 }).notNull(), // 'trigger', 'reading', 'alert'
  value: varchar("value", { length: 255 }), // e.g. 'true', 'detected', '35.5'
  metadata: varchar("metadata", { length: 2000 }), // JSON string for extra data
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// 6. Alert Rules (Configurable thresholds)
export const alertRules = pgTable("alert_rules", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id).notNull(),
  metric: varchar("metric", { length: 50 }).notNull(), // heartRate, steps, bloodOxygen, cognitiveFlag, fallDetected
  condition: varchar("condition", { length: 20 }).notNull(), // gt, lt, eq
  threshold: varchar("threshold", { length: 255 }).notNull(), // Value to compare against
  channel: varchar("channel", { length: 50 }).notNull(), // email, sms, webhook
  destination: varchar("destination", { length: 255 }).notNull(), // email address, phone number, or URL
  enabled: boolean("enabled").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 7. Alert Events (Audit log of sent alerts)
export const alertEvents = pgTable("alert_events", {
  id: serial("id").primaryKey(),
  ruleId: integer("rule_id").references(() => alertRules.id).notNull(),
  patientId: integer("patient_id").references(() => patients.id).notNull(),
  message: varchar("message", { length: 2000 }).notNull(),
  channel: varchar("channel", { length: 50 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(), // 'sent', 'failed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 8. SaaS Waitlist
export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
