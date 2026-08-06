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
  sentimentScore: integer("sentiment_score"), // 1-100 score of their mood
  cognitiveFlag: boolean("cognitive_flag").default(false), // True if AI detected confusion/repetition
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});
