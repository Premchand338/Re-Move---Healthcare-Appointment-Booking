CREATE UNIQUE INDEX appointments_active_therapist_start_unique
  ON appointments (therapist_id, appointment_at)
  WHERE status = 'booked';
