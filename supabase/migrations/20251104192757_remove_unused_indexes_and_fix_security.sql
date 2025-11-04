/*
  # Remove Unused Indexes and Fix Function Security Issues

  This migration addresses security issues identified in the database:

  ## Changes Made

  ### 1. Unused Indexes Removed
  All indexes listed were not being used by queries and were consuming storage and maintenance overhead:

  #### contact_submissions table:
  - `idx_contact_submissions_email` - Removed unused email index
  - `idx_contact_submissions_created_at` - Removed unused created_at index
  - `idx_contact_submissions_session_id` - Removed unused session_id index

  #### calendar_bookings table:
  - `idx_calendar_bookings_contact_submission` - Removed unused contact_submission_id index
  - `idx_calendar_bookings_scheduled_at` - Removed unused scheduled_at index
  - `idx_calendar_bookings_status` - Removed unused status index
  - `idx_calendar_bookings_session` - Removed unused calendar_session_id index

  #### booking_page_views table:
  - `idx_booking_page_views_contact` - Removed unused contact_submission_id index
  - `idx_booking_page_views_session` - Removed unused calendar_session_id index
  - `idx_booking_page_views_viewed_at` - Removed unused viewed_at index

  #### booking_sessions table:
  - `idx_booking_sessions_contact` - Removed unused contact_submission_id index
  - `idx_booking_sessions_session_id` - Removed unused session_id index
  - `idx_booking_sessions_status` - Removed unused status index

  ### 2. Function Security Fixes
  Fixed mutable search_path vulnerability in all trigger functions by adding `SET search_path = ''`:

  #### Functions secured:
  - `update_contact_submissions_updated_at` - Secured with immutable search_path
  - `update_calendar_bookings_updated_at` - Secured with immutable search_path
  - `update_booking_sessions_updated_at` - Secured with immutable search_path
  - `update_booking_completed_status` - Secured with immutable search_path

  ## Security Impact

  ### Removed Indexes:
  - **Storage**: Reduces database storage consumption
  - **Performance**: Eliminates maintenance overhead on unused indexes
  - **No Impact**: These indexes were not being used by any queries

  ### Fixed search_path:
  - **Security**: Prevents search_path manipulation attacks
  - **Stability**: Ensures functions always reference the correct schema objects
  - **Best Practice**: Follows PostgreSQL security recommendations for SECURITY DEFINER functions
*/

-- =====================================================
-- SECTION 1: Remove Unused Indexes
-- =====================================================

-- Drop unused indexes from contact_submissions table
DROP INDEX IF EXISTS idx_contact_submissions_email;
DROP INDEX IF EXISTS idx_contact_submissions_created_at;
DROP INDEX IF EXISTS idx_contact_submissions_session_id;

-- Drop unused indexes from calendar_bookings table
DROP INDEX IF EXISTS idx_calendar_bookings_contact_submission;
DROP INDEX IF EXISTS idx_calendar_bookings_scheduled_at;
DROP INDEX IF EXISTS idx_calendar_bookings_status;
DROP INDEX IF EXISTS idx_calendar_bookings_session;

-- Drop unused indexes from booking_page_views table
DROP INDEX IF EXISTS idx_booking_page_views_contact;
DROP INDEX IF EXISTS idx_booking_page_views_session;
DROP INDEX IF EXISTS idx_booking_page_views_viewed_at;

-- Drop unused indexes from booking_sessions table
DROP INDEX IF EXISTS idx_booking_sessions_contact;
DROP INDEX IF EXISTS idx_booking_sessions_session_id;
DROP INDEX IF EXISTS idx_booking_sessions_status;

-- =====================================================
-- SECTION 2: Fix Function Security - Immutable search_path
-- =====================================================

-- Fix update_contact_submissions_updated_at function
CREATE OR REPLACE FUNCTION public.update_contact_submissions_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix update_calendar_bookings_updated_at function
CREATE OR REPLACE FUNCTION public.update_calendar_bookings_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix update_booking_sessions_updated_at function
CREATE OR REPLACE FUNCTION public.update_booking_sessions_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix update_booking_completed_status function
CREATE OR REPLACE FUNCTION public.update_booking_completed_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  UPDATE public.contact_submissions
  SET 
    booking_completed = true,
    updated_at = now()
  WHERE id = NEW.contact_submission_id;
  RETURN NEW;
END;
$function$;
