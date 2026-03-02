import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url || !url.startsWith("libsql://")) {
  console.error("DATABASE_URL must be a libsql:// URL");
  process.exit(1);
}

const adapter = new PrismaLibSQL({ url, authToken });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create founder accounts (no password needed — SSO only)
  const founders = await Promise.all([
    prisma.user.upsert({
      where: { email: "temirlan@northpark.edu" },
      update: {},
      create: {
        email: "temirlan@northpark.edu",
        name: "Temirlan Avtandilov",
        role: "ADMIN",
      },
    }),
    prisma.user.upsert({
      where: { email: "shamri@northpark.edu" },
      update: {},
      create: {
        email: "shamri@northpark.edu",
        name: "Mohamed Zarook Mohamed Shamri",
        role: "ADMIN",
      },
    }),
  ]);

  console.log(`Created ${founders.length} founder accounts`);

  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: "Spring Investment Workshop",
        description: "Learn the fundamentals of building a diversified portfolio. Open to all majors.",
        date: "2026-03-15",
        time: "5-7 PM",
        location: "Anderson Hall 201",
        status: "UPCOMING",
        createdById: founders[0].id,
      },
    }),
    prisma.event.create({
      data: {
        title: "Wall Street Alumni Panel",
        description: "North Park alumni at top financial institutions share career journeys and advice.",
        date: "2026-03-28",
        time: "6-8 PM",
        location: "Magnuson Campus Center",
        status: "UPCOMING",
        createdById: founders[0].id,
      },
    }),
    prisma.event.create({
      data: {
        title: "Stock Pitch Competition",
        description: "Present your best stock pick to a panel of judges. Cash prizes for top three.",
        date: "2026-04-10",
        time: "4-7 PM",
        location: "Burgh Hall 105",
        status: "UPCOMING",
        createdById: founders[1].id,
      },
    }),
    prisma.event.create({
      data: {
        title: "Financial Literacy Week",
        description: "Week-long series on personal finance, budgeting, and investing basics.",
        date: "2026-04-21",
        time: "Various",
        location: "Multiple Locations",
        status: "UPCOMING",
        createdById: founders[1].id,
      },
    }),
    prisma.event.create({
      data: {
        title: "Fall Kickoff Mixer",
        description: "Welcome event to kick off the semester.",
        date: "2025-09-10",
        time: "6-8 PM",
        location: "Magnuson Campus Center",
        status: "PAST",
        createdById: founders[0].id,
      },
    }),
    prisma.event.create({
      data: {
        title: "Bloomberg Terminal Training",
        description: "Hands-on training with Bloomberg terminals.",
        date: "2025-10-15",
        time: "4-6 PM",
        location: "Anderson Hall 201",
        status: "PAST",
        createdById: founders[1].id,
      },
    }),
  ]);

  console.log(`Created ${events.length} events`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
