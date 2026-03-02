import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const event = await prisma.event.create({
    data: {
      ...parsed.data,
      imageUrl: parsed.data.imageUrl || null,
      capacity: parsed.data.capacity ?? null,
      lumaUrl: parsed.data.lumaUrl || null,
      createdById: (session.user as { id?: string }).id ?? "",
    },
  });

  return NextResponse.json(event, { status: 201 });
}
