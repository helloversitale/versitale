import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  industry: string;
  challenge: string;
}

const ADMIN_EMAIL = "hello@versitale.com";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { name, email, company, industry, challenge }: ContactSubmission = await req.json();

    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You, ${name}!</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for reaching out to Versitale! We've received your inquiry and are excited to help transform your business with AI.</p>
            <p><strong>What's Next?</strong></p>
            <p>Please complete your booking to schedule a free consultation with our team. We'll discuss your specific challenges and show you how AI can drive unprecedented growth for ${company}.</p>
            <p style="text-align: center;">
              <a href="${Deno.env.get('VITE_APP_URL') || 'https://versitale.com'}/booking?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}" class="button">Complete Your Booking</a>
            </p>
            <p><strong>Your Submission Summary:</strong></p>
            <ul>
              <li><strong>Company:</strong> ${company}</li>
              <li><strong>Industry:</strong> ${industry}</li>
              <li><strong>Challenge:</strong> ${challenge}</li>
            </ul>
            <p>If you have any questions in the meantime, feel free to reply to this email.</p>
            <p>Best regards,<br>The Versitale Team</p>
          </div>
          <div class="footer">
            <p>Versitale - AI Solutions for Business Growth</p>
            <p>Serving businesses in Aruba and globally</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2c3e50; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #667eea; }
          .label { font-weight: bold; color: #667eea; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎉 New Contact Form Submission</h2>
          </div>
          <div class="content">
            <p><strong>A new prospect has submitted the contact form!</strong></p>
            <div class="field">
              <div class="label">Name:</div>
              <div>${name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Company:</div>
              <div>${company}</div>
            </div>
            <div class="field">
              <div class="label">Industry:</div>
              <div>${industry}</div>
            </div>
            <div class="field">
              <div class="label">Biggest Challenge:</div>
              <div>${challenge}</div>
            </div>
            <p><strong>⏰ They've been directed to complete their calendar booking.</strong></p>
            <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log('Email notifications would be sent to:', email, 'and', ADMIN_EMAIL);
    console.log('Note: Email service integration required (e.g., SendGrid, Resend, AWS SES)');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Notifications queued successfully',
        note: 'Email service integration required for actual sending'
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
    console.error('Error in send-contact-notification:', error);
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