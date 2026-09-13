import { pool } from "../db";

async function initDatabase() {
  await pool.query(`
   CREATE TABLE IF NOT EXISTS patients (
  patient_id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(150) UNIQUE,
  date_of_birth DATE,
  address TEXT,
  emergency_contact VARCHAR(20),

  primary_issue VARCHAR(255),
  pain_area VARCHAR(100),
  pain_duration VARCHAR(100),
  pain_severity INTEGER CHECK (pain_severity BETWEEN 0 AND 10),

  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
)
  `);

  // CREATE TABLE IF NOT EXISTS does not modify a table that already exists.
  await pool.query(`
    ALTER TABLE patients
      ADD COLUMN IF NOT EXISTS primary_issue VARCHAR(255),
      ADD COLUMN IF NOT EXISTS pain_area VARCHAR(100),
      ADD COLUMN IF NOT EXISTS pain_duration VARCHAR(100),
      ADD COLUMN IF NOT EXISTS pain_severity INTEGER,
      ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE
  `)

  await pool.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'patients_pain_severity_range'
      ) THEN
        ALTER TABLE patients
          ADD CONSTRAINT patients_pain_severity_range
          CHECK (pain_severity BETWEEN 0 AND 10);
      END IF;
    END $$;
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS therapists (
      therapist_id BIGSERIAL PRIMARY KEY,
      full_name VARCHAR(120) NOT NULL,
      phone VARCHAR(20) NOT NULL UNIQUE,
      email VARCHAR(150) UNIQUE,
      specialization VARCHAR(120) NOT NULL,
      bio TEXT,
      active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // backend/script/initDatabase.ts (therapists table create hone ke baad add karo)

await pool.query(`
  ALTER TABLE therapists 
    ADD COLUMN IF NOT EXISTS title VARCHAR(120),
    ADD COLUMN IF NOT EXISTS degrees VARCHAR(120),
    ADD COLUMN IF NOT EXISTS category VARCHAR(50),
    ADD COLUMN IF NOT EXISTS clinical_focus TEXT,
    ADD COLUMN IF NOT EXISTS match_score NUMERIC(3,1),
    ADD COLUMN IF NOT EXISTS match_reasons TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS avatar_url TEXT,
    ADD COLUMN IF NOT EXISTS focus_tags TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS available_slots TEXT[] DEFAULT '{}'
`)

await pool.query(`
  ALTER TABLE therapists 
    ADD COLUMN IF NOT EXISTS experience_years INTEGER,
    ADD COLUMN IF NOT EXISTS clinic_location VARCHAR(255)
`)
console.log('Therapist rich-profile columns added.')

  await pool.query(`
    CREATE TABLE IF NOT EXISTS services (
      service_id BIGSERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL UNIQUE,
      description TEXT,
      duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
      price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
      active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS appointments (
      appointment_id BIGSERIAL PRIMARY KEY,
      patient_id BIGINT NOT NULL REFERENCES patients(patient_id) ON DELETE RESTRICT,
      therapist_id BIGINT NOT NULL REFERENCES therapists(therapist_id) ON DELETE RESTRICT,
      service_id BIGINT NOT NULL REFERENCES services(service_id) ON DELETE RESTRICT,
      appointment_at TIMESTAMPTZ NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'booked'
        CHECK (status IN ('booked', 'completed', 'cancelled', 'no_show')),
      patient_note TEXT,
      therapist_note TEXT,
      cancelled_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Existing CREATE TABLE statements ke niche, isi file me add karo:

await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'therapist', 'patient')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`)

await pool.query(`
  ALTER TABLE patients ADD COLUMN IF NOT EXISTS user_id BIGINT REFERENCES users(user_id)
`)

await pool.query(`
  ALTER TABLE therapists ADD COLUMN IF NOT EXISTS user_id BIGINT REFERENCES users(user_id)
`)

console.log('Users table + links ready.')

  await pool.query(`
    CREATE TABLE IF NOT EXISTS assessments (
      assessment_id BIGSERIAL PRIMARY KEY,
      patient_id BIGINT NOT NULL REFERENCES patients(patient_id) ON DELETE RESTRICT,
      body_part VARCHAR(50) NOT NULL,
      triggers TEXT[] NOT NULL,
      sensation VARCHAR(50) NOT NULL,
      duration VARCHAR(50) NOT NULL,
      goals TEXT[] NOT NULL,
      care_preference VARCHAR(50) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)
  await pool.query(`
  CREATE TABLE IF NOT EXISTS inquiries (
    inquiry_id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    notes TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`)
console.log('Inquiries table ready.')

  await pool.query(`
    ALTER TABLE therapists ADD COLUMN IF NOT EXISTS rating NUMERIC(2,1)
  `)
  await pool.query(`
    ALTER TABLE therapists ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0
  `)
  await pool.query(`
    ALTER TABLE therapists ADD COLUMN IF NOT EXISTS price_per_session NUMERIC(10,2)
  `)
  await pool.query(`
    ALTER TABLE therapists ADD COLUMN IF NOT EXISTS treats_body_parts TEXT[] DEFAULT '{}'
  `)
  
  await pool.query(`
  ALTER TABLE services ADD COLUMN IF NOT EXISTS mode VARCHAR(30) DEFAULT 'clinic' CHECK (mode IN ('clinic', 'home', 'tele'))
`)

console.log('Services mode-column ready.')

  console.log('Assessments table + therapist matching-fields ready.')

  console.log("Patients, therapists, services, and appointments tables are ready.");
  await pool.query(`ALTER TABLE patients DROP COLUMN IF EXISTS primary_issue`)
await pool.query(`ALTER TABLE patients DROP COLUMN IF EXISTS pain_area`)
await pool.query(`ALTER TABLE patients DROP COLUMN IF EXISTS pain_duration`)
await pool.query(`ALTER TABLE patients DROP COLUMN IF EXISTS pain_severity`)
console.log('Patient clinical-fields removed — now in assessments table.')
  await pool.end();
}
initDatabase().catch((error) => {
  console.error("Database initialization failed:", error.message);
  process.exit(1);
});
