import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, interest, message } =
      await req.json();

    const interestLabels: Record<string, string> = {
      tour: "Booking a Tour",
      membership: "Membership Information",
      training: "Personal Training",
      boxing: "Boxing Classes",
      physio: "Physiotherapy",
      other: "Other",
    };

    const { error } = await resend.emails.send({
      from: "LUX Fitness <onboarding@resend.dev>",
      to: "carlos@luxit.io",
      replyTo: email,
      subject: `[LUX Fitness] New inquiry — ${interestLabels[interest] ?? interest ?? "General"}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333">
          <h2 style="color:#c4a35a;margin-bottom:24px">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;font-weight:bold;width:120px">Name</td><td>${firstName} ${lastName}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold">Email</td><td><a href="mailto:${email}" style="color:#c4a35a">${email}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:bold">Phone</td><td>${phone || "—"}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold">Interest</td><td>${interestLabels[interest] ?? interest ?? "—"}</td></tr>
          </table>
          <hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>
          <p style="font-weight:bold;margin-bottom:8px">Message</p>
          <p style="white-space:pre-wrap;color:#555">${message || "—"}</p>
          <hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>
          <p style="font-size:12px;color:#999">Sent from the LUX Fitness website contact form</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
