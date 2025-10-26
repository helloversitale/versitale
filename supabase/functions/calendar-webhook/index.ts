import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CalendarWebhookPayload {
  eventId?: string;
  email?: string;
  scheduledAt?: string;
  meetingLink?: string;
  status?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: CalendarWebhookPayload = await req.json();
    const { eventId, email, scheduledAt, meetingLink, status } = payload;

    if (!email) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email is required"
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const { data: contactData, error: contactError } = await supabase
      .from('contact_submissions')
      .select('id, calendar_session_id, name')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (contactError || !contactData) {
      console.error('Contact submission not found for email:', email);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Contact submission not found'
        }),
        {
          status: 404,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const { error: bookingError } = await supabase
      .from('calendar_bookings')
      .insert({
        contact_submission_id: contactData.id,
        google_calendar_event_id: eventId,
        scheduled_at: scheduledAt,
        meeting_link: meetingLink,
        status: status || 'confirmed',
        booking_type: 'automatic',
        calendar_session_id: contactData.calendar_session_id,
        notes: 'Automatically created via Google Calendar webhook'
      });

    if (bookingError) {
      console.error('Error creating booking:', bookingError);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to create booking'
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    await supabase
      .from('booking_sessions')
      .update({
        booking_completed_at: new Date().toISOString(),
        status: 'completed'
      })
      .eq('session_id', contactData.calendar_session_id);

    console.log('Booking created successfully for:', email);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Booking created successfully'
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in calendar-webhook:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
