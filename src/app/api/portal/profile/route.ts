import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const profileSchema = z.object({
  bio: z.string().max(500).optional().or(z.literal("")),
  major: z.string().max(100).optional().or(z.literal("")),
  year: z
    .enum(["Freshman", "Sophomore", "Junior", "Senior", "Graduate", ""])
    .optional(),
  linkedinUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),
  imageUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      bio: true,
      major: true,
      year: true,
      linkedinUrl: true,
      imageUrl: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      bio: data.bio || null,
      major: data.major || null,
      year: data.year || null,
      linkedinUrl: data.linkedinUrl || null,
      imageUrl: data.imageUrl || null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      bio: true,
      major: true,
      year: true,
      linkedinUrl: true,
      imageUrl: true,
    },
  });

  return NextResponse.json(user);
}
