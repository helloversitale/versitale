/*
  # Create contact_submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text, required) - Full name of the contact
      - `email` (text, required) - Email address of the contact
      - `company` (text, required) - Company name
      - `industry` (text, required) - Industry type (healthcare, dental-clinics, real-estate, etc.)
      - `challenge` (text, required) - Description of their biggest challenge
      - `booking_completed` (boolean, default false) - Whether they completed the calendar booking
      - `created_at` (timestamptz, default now()) - When the submission was created
      - `updated_at` (timestamptz, default now()) - When the submission was last updated

  2. Indexes
    - Index on email for efficient lookups
    - Index on created_at for sorting and filtering

  3. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for public inserts (anyone can submit a contact form)
    - No public read access to protect contact information

  4. Important Notes
    - Data safety is critical - no destructive operations
    - Email notifications will be triggered via Edge Functions
    - Booking completion status can be updated via future functionality
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  industry text NOT NULL,
  challenge text NOT NULL,
  booking_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "No public read access to contact submissions"
  ON contact_submissions
  FOR SELECT
  TO anon
  USING (false);

CREATE OR REPLACE FUNCTION update_contact_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_submissions_updated_at();