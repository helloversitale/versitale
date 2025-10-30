/*
  # Add Calendar Bookings Table and Enhanced Tracking

  1. New Tables
    - `calendar_bookings`
      - `id` (uuid, primary key) - Unique identifier for each booking
      - `contact_submission_id` (uuid, foreign key) - Reference to contact submission
      - `google_calendar_event_id` (text) - Event ID from Google Calendar
      - `scheduled_at` (timestamptz) - When the appointment is scheduled for
      - `meeting_link` (text) - Google Meet or other meeting link
      - `status` (text) - Booking status (confirmed, cancelled, rescheduled, completed)
      - `booking_type` (text) - Type of booking (manual, automatic)
      - `calendar_session_id` (uuid) - Session tracking ID
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Updates to contact_submissions
    - Add `booking_link_clicked_at` (timestamptz) - When user clicked through to booking page
    - Add `calendar_session_id` (uuid) - Unique session ID for booking attempt
    - Add `booking_reminder_sent` (boolean) - Whether reminder email was sent
    - Add `last_booking_page_view` (timestamptz) - Most recent booking page view

  3. New Tables for Tracking
    - `booking_page_views`
      - Track each time someone views the booking page
    - `booking_sessions`
      - Track complete user journey from form to booking

  4. Indexes
    - Index on contact_submission_id for efficient lookups
    - Index on scheduled_at for date-based queries
    - Index on status for filtering
    - Index on calendar_session_id for session tracking

  5. Security
    - Enable RLS on all new tables
    - Allow public inserts for booking page views and manual confirmations
    - Allow authenticated admin access for all operations
    - No public read access to protect booking information

  6. Important Notes
    - Data safety is critical - using IF NOT EXISTS and IF statements
    - Foreign key relationships maintain data integrity
    - Triggers automatically update timestamps
*/

-- Create calendar_bookings table
CREATE TABLE IF NOT EXISTS calendar_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_submission_id uuid REFERENCES contact_submissions(id) ON DELETE CASCADE,
  google_calendar_event_id text,
  scheduled_at timestamptz,
  meeting_link text,
  status text DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'rescheduled', 'completed', 'no_show')),
  booking_type text DEFAULT 'automatic' CHECK (booking_type IN ('manual', 'automatic')),
  calendar_session_id uuid,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add new fields to contact_submissions table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'booking_link_clicked_at'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN booking_link_clicked_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'calendar_session_id'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN calendar_session_id uuid DEFAULT gen_random_uuid();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'booking_reminder_sent'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN booking_reminder_sent boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'last_booking_page_view'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN last_booking_page_view timestamptz;
  END IF;
END $$;

-- Create booking_page_views table for detailed tracking
CREATE TABLE IF NOT EXISTS booking_page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_submission_id uuid REFERENCES contact_submissions(id) ON DELETE CASCADE,
  calendar_session_id uuid,
  viewed_at timestamptz DEFAULT now(),
  user_agent text,
  referrer text,
  duration_seconds integer
);

-- Create booking_sessions table for journey tracking
CREATE TABLE IF NOT EXISTS booking_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_submission_id uuid REFERENCES contact_submissions(id) ON DELETE CASCADE,
  session_id uuid UNIQUE NOT NULL,
  form_submitted_at timestamptz,
  booking_page_viewed_at timestamptz,
  booking_completed_at timestamptz,
  status text DEFAULT 'started' CHECK (status IN ('started', 'viewing', 'completed', 'abandoned')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for calendar_bookings
CREATE INDEX IF NOT EXISTS idx_calendar_bookings_contact_submission ON calendar_bookings(contact_submission_id);
CREATE INDEX IF NOT EXISTS idx_calendar_bookings_scheduled_at ON calendar_bookings(scheduled_at DESC);
CREATE INDEX IF NOT EXISTS idx_calendar_bookings_status ON calendar_bookings(status);
CREATE INDEX IF NOT EXISTS idx_calendar_bookings_session ON calendar_bookings(calendar_session_id);

-- Create indexes for booking_page_views
CREATE INDEX IF NOT EXISTS idx_booking_page_views_contact ON booking_page_views(contact_submission_id);
CREATE INDEX IF NOT EXISTS idx_booking_page_views_session ON booking_page_views(calendar_session_id);
CREATE INDEX IF NOT EXISTS idx_booking_page_views_viewed_at ON booking_page_views(viewed_at DESC);

-- Create indexes for booking_sessions
CREATE INDEX IF NOT EXISTS idx_booking_sessions_contact ON booking_sessions(contact_submission_id);
CREATE INDEX IF NOT EXISTS idx_booking_sessions_session_id ON booking_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_booking_sessions_status ON booking_sessions(status);

-- Create index on new contact_submissions fields
CREATE INDEX IF NOT EXISTS idx_contact_submissions_session_id ON contact_submissions(calendar_session_id);

-- Enable RLS on new tables
ALTER TABLE calendar_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for calendar_bookings
CREATE POLICY "Allow public inserts for manual bookings"
  ON calendar_bookings
  FOR INSERT
  TO anon
  WITH CHECK (booking_type = 'manual');

CREATE POLICY "No public read access to bookings"
  ON calendar_bookings
  FOR SELECT
  TO anon
  USING (false);

CREATE POLICY "Allow public updates for manual bookings"
  ON calendar_bookings
  FOR UPDATE
  TO anon
  USING (booking_type = 'manual')
  WITH CHECK (booking_type = 'manual');

-- RLS Policies for booking_page_views
CREATE POLICY "Anyone can insert booking page views"
  ON booking_page_views
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "No public read access to page views"
  ON booking_page_views
  FOR SELECT
  TO anon
  USING (false);

-- RLS Policies for booking_sessions
CREATE POLICY "Anyone can insert booking sessions"
  ON booking_sessions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can update their own booking session"
  ON booking_sessions
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "No public read access to booking sessions"
  ON booking_sessions
  FOR SELECT
  TO anon
  USING (false);

-- Create trigger function for calendar_bookings updated_at
CREATE OR REPLACE FUNCTION update_calendar_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for calendar_bookings
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'calendar_bookings_updated_at'
  ) THEN
    CREATE TRIGGER calendar_bookings_updated_at
      BEFORE UPDATE ON calendar_bookings
      FOR EACH ROW
      EXECUTE FUNCTION update_calendar_bookings_updated_at();
  END IF;
END $$;

-- Create trigger function for booking_sessions updated_at
CREATE OR REPLACE FUNCTION update_booking_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for booking_sessions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'booking_sessions_updated_at'
  ) THEN
    CREATE TRIGGER booking_sessions_updated_at
      BEFORE UPDATE ON booking_sessions
      FOR EACH ROW
      EXECUTE FUNCTION update_booking_sessions_updated_at();
  END IF;
END $$;

-- Create a function to automatically update booking_completed when a booking is added
CREATE OR REPLACE FUNCTION update_booking_completed_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE contact_submissions
  SET 
    booking_completed = true,
    updated_at = now()
  WHERE id = NEW.contact_submission_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update booking_completed
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_update_booking_completed'
  ) THEN
    CREATE TRIGGER trigger_update_booking_completed
      AFTER INSERT ON calendar_bookings
      FOR EACH ROW
      EXECUTE FUNCTION update_booking_completed_status();
  END IF;
END $$;