CREATE TABLE "patients" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"date_of_birth" timestamp,
	"phone_number" varchar(20),
	"timezone" varchar(50) DEFAULT 'UTC',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vitals_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"heart_rate" integer,
	"steps" integer,
	"blood_oxygen" integer,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "voice_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"transcript" varchar(5000),
	"sentiment_score" integer,
	"cognitive_flag" boolean DEFAULT false,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vitals_logs" ADD CONSTRAINT "vitals_logs_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voice_logs" ADD CONSTRAINT "voice_logs_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;