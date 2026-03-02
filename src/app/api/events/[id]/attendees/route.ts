import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function maskName(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return "Anonymous";
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return parts[0];
  const first = parts[0];
  const last = parts[parts.length - 1];
  return `${first} ${last[0]?.toUpperCase() ?? ""}.`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const registrations = await prisma.registration.findMany({
    where: { eventId: id },
    select: { name: true, major: true, year: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  const attendees = registrations.map((r) => ({
    name: maskName(r.name),
    major: r.major,
    year: r.year,
  }));

  return NextResponse.json(attendees);
}
