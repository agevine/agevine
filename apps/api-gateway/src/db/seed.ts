import { db } from "./index";
import { users, patients, vitalsLogs, voiceLogs } from "./schema";

async function seed() {
  console.log("Seeding database with Agevine mock data...");

  // 1. Clear existing data
  await db.delete(voiceLogs);
  await db.delete(vitalsLogs);
  await db.delete(patients);
  await db.delete(users);

  // 2. Insert Caregiver (User)
  const [caregiver] = await db.insert(users).values({
    email: "caregiver@agevine.com",
    passwordHash: "hashed_password_placeholder",
    fullName: "Jane Doe",
  }).returning();

  console.log(`Inserted caregiver: ${caregiver.fullName}`);

  // 3. Insert Patient
  const [patient] = await db.insert(patients).values({
    userId: caregiver.id,
    fullName: "Margaret Doe",
    dateOfBirth: new Date("1952-04-15"),
    phoneNumber: "+15551234567",
    timezone: "America/New_York",
  }).returning();

  console.log(`Inserted patient: ${patient.fullName}`);

  // 4. Insert Vitals Logs
  await db.insert(vitalsLogs).values({
    patientId: patient.id,
    heartRate: 74, // bpm
    steps: 4200,
    bloodOxygen: 98,
    timestamp: new Date(),
  });

  // 5. Insert Voice Logs
  await db.insert(voiceLogs).values({
    patientId: patient.id,
    transcript: "I slept really well last night. I'm going to have some tea and read my book.",
    sentimentScore: 85,
    cognitiveFlag: false,
    timestamp: new Date(),
  });

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
