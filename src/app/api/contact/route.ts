import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import nodemailer from "nodemailer";

const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || "npfis@northpark.edu";

function getTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

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
  const transporter = getTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"NPFIS Contact Form" <${process.env.SMTP_USER}>`,
        to: NOTIFY_EMAIL,
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
      console.error("Failed to send notification email:", emailError);
    }
  }

  return NextResponse.json(submission, { status: 201 });
}
