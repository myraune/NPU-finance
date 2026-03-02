import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Returns registrations for the currently logged-in user (matched by email)
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const registrations = await prisma.registration.findMany({
    where: { email: session.user.email },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(registrations);
}
