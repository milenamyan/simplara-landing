import { NextRequest, NextResponse } from 'next/server';

// NOTE: This endpoint is currently not being used.
// The waitlist form now submits directly to Google Sheets via Google Apps Script.
// See GOOGLE_SHEETS_SETUP.md for implementation details.
//
// You can use this endpoint if you want to add additional backend logic,
// such as:
// - Validating data before sending to Google Sheets
// - Sending confirmation emails
// - Triggering webhooks
// - Logging to your own database
//
// To use this endpoint, update WaitlistForm.tsx to call '/api/waitlist' instead of
// the Google Apps Script URL.

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // TODO: Implement your backend logic here
    // Options:
    // 1. Save to database
    // 2. Send to Google Sheets
    // 3. Send to email service
    // 4. Forward to CRM

    // Example: Log to console (replace with actual implementation)
    console.log('Waitlist submission:', formData);

    // Example: Send email notification
    // await sendEmail({
    //   to: 'team@simplara.app',
    //   subject: 'New Waitlist Signup',
    //   body: JSON.stringify(formData, null, 2)
    // });

    // Example: Save to database
    // await db.waitlist.create({
    //   data: formData
    // });

    return NextResponse.json(
      { success: true, message: 'Successfully joined waitlist' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check if email is already on waitlist
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');
  
  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter required' },
      { status: 400 }
    );
  }

  // TODO: Check if email exists in your database
  // const exists = await db.waitlist.findUnique({ where: { email } });

  return NextResponse.json({
    exists: false // Replace with actual check
  });
}
