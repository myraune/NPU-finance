// One-off script: ensure production Turso DB has the correct events.
// Run with: DATABASE_URL=libsql://... DATABASE_AUTH_TOKEN=... npx tsx scripts/seed-production-event.ts
import { createClient } from "@libsql/client";

const url = process.env.DATABASE_URL?.replace(/\\n$/, "").trim();
const authToken = process.env.DATABASE_AUTH_TOKEN?.replace(/\\n$/, "").trim();

if (!url || !url.startsWith("libsql://")) {
  console.error("DATABASE_URL must be a libsql:// URL");
  process.exit(1);
}

const client = createClient({ url, authToken });

const EVENTS = [
  {
    id: "angel-escobedo-april-2026",
    title: "Angel Escobedo and Navigating Early Career Success in Finance",
    description:
      "Gain information on how to navigate through internships and establish your career path. Our guest speaker has experience at JP Morgan, Morgan Stanley, angel investing, private equity, venture capital, PwC, and is currently an analyst at Old National Bank. Snacks and beverages will be provided! Speaker's LinkedIn: https://www.linkedin.com/in/escobedo-angel",
    date: "Apr 15",
    time: "12:00 – 2:00 PM",
    location: "JC 208",
    status: "PAST",
  },
  {
    id: "elvin-ahmeti-april-2026",
    title: "A Deal Walkthrough with Guestspeaker Elvin Ahmeti",
    description:
      "From handshake to closing: See how a real cross-border deal actually gets done. Valuation, negotiation, strategy… and the surprises no one sees coming. In collaboration with BSE-330-01 International Finance. Snacks and beverages will be provided!",
    date: "Apr 30",
    time: "6:30 – 9:30 PM",
    location: "JC 211",
    status: "UPCOMING",
  },
];

async function main() {
  console.log("Connected to:", url);

  // Ensure an admin user exists to own the events.
  const userRes = await client.execute({
    sql: "SELECT id FROM User WHERE email = ? LIMIT 1",
    args: ["shamri@northpark.edu"],
  });

  let createdById: string;
  if (userRes.rows.length > 0) {
    createdById = String(userRes.rows[0].id);
    console.log("Found admin user:", createdById);
  } else {
    createdById = "admin-shamri-" + Date.now();
    const now = new Date().toISOString();
    await client.execute({
      sql: `INSERT INTO User (id, email, name, role, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        createdById,
        "shamri@northpark.edu",
        "Mohamed Zarook Mohamed Shamri",
        "ADMIN",
        now,
        now,
      ],
    });
    console.log("Created admin user:", createdById);
  }

  // Wipe stale events/registrations and re-seed cleanly.
  await client.execute("DELETE FROM Registration");
  await client.execute("DELETE FROM Event");
  console.log("Wiped old events & registrations");

  const now = new Date().toISOString();
  for (const EVENT of EVENTS) {
    await client.execute({
      sql: `INSERT INTO Event
              (id, title, description, date, time, location, status, createdAt, updatedAt, createdById)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        EVENT.id,
        EVENT.title,
        EVENT.description,
        EVENT.date,
        EVENT.time,
        EVENT.location,
        EVENT.status,
        now,
        now,
        createdById,
      ],
    });
    console.log("Inserted event:", EVENT.id, `(${EVENT.status})`);
  }

  const check = await client.execute(
    "SELECT id, title, date, time, location, status FROM Event",
  );
  console.log("Events in DB:", check.rows);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
