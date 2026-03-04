import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || "npfis@northpark.edu";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { name, email, subject, message } = parsed.data;

  // Save to database
  const submission = await prisma.contactSubmission.create({
    data: { name, email, subject, message },
  });

  // Send email notification
  if (resend) {
    try {
      await resend.emails.send({
        from: "NPFIS Contact Form <noreply@financeinvestmentsociety.com>",
        to: [NOTIFY_EMAIL],
        subject: `[NPFIS] ${subject} — from ${name}`,
        text: [
          `New contact form submission:`,
          ``,
          `Name: ${name}`,
          `Email: ${email}`,
          `Subject: ${subject}`,
          ``,
          `Message:`,
          message,
          ``,
          `---`,
          `Submitted at ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}`,
        ].join("\n"),
      });
    } catch (emailError) {
      // Log but don't fail the request if email fails
      console.error("Failed to send notification email:", emailError);
    }
  }

  return NextResponse.json(submission, { status: 201 });
}
