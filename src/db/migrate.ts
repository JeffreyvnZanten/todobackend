import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const connectionString = process.env.DB_URL!;
const migrationClient = postgres(connectionString, { max: 1 });

async function runMigrations() {
  try {
    await migrate(drizzle(migrationClient), {
      migrationsFolder: "./drizzle",
    });
    console.log("Migrations run successfully");
    await migrationClient.end();
  } catch (error) {
    console.error("Failed to run migrations:", error);
    await migrationClient.end();
  }
}

runMigrations();

// 2e methode

// import "dotenv/config";
// import postgres from "postgres";
// import { drizzle } from "drizzle-orm/postgres-js";

// import fs from "fs";
// import path from "path";

// const connectionString = process.env.DB_URL!;
// const sqlClient = postgres(connectionString, { max: 1 });
// const db = drizzle(sqlClient);

// async function runMigrations() {
//   try {
//     await sqlClient`
//       CREATE TABLE IF NOT EXISTS _drizzle_migrations (
//         id TEXT PRIMARY KEY,
//         name TEXT NOT NULL,
//         run_on TIMESTAMPTZ NOT NULL DEFAULT now()
//       )
//     `;

//     const migrationDir = path.resolve(__dirname, "./drizzle");
//     const files = fs
//       .readdirSync(migrationDir)
//       .filter((f) => f.endsWith(".sql"))
//       .sort();

//     for (const file of files) {
//       const already = await sqlClient<{ count: number }[]>`
//         SELECT count(*)::int AS count
//           FROM _drizzle_migrations
//          WHERE id = ${file}
//       `;
//       if (already[0].count > 0) {
//         console.log(`⏭  Skipping ${file} (already applied)`);
//         continue;
//       }

//       const sql = fs.readFileSync(path.join(migrationDir, file), "utf-8");
//       try {
//         await sqlClient.unsafe(sql);
//         await sqlClient`
//           INSERT INTO _drizzle_migrations (id, name)
//           VALUES (${file}, ${file})
//         `;
//         console.log(`✅ Applied ${file}`);
//       } catch (e: any) {
//         if (e.code === "42P07") {
//           console.warn(`⚠️  ${file}: tabel bestaat al, overslaan`);
//           await sqlClient`
//             INSERT INTO _drizzle_migrations (id, name)
//             VALUES (${file}, ${file})
//           `;
//         } else {
//           throw e;
//         }
//       }
//     }

//     console.log("🎉 All migrations processed.");
//   } catch (err) {
//     console.error("❌ Migration runner failed:", err);
//     process.exit(1);
//   } finally {
//     await sqlClient.end();
//   }
// }

// runMigrations();
