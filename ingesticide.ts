import { readdirSync, readFileSync } from "fs";
import pg from "pg";
const { Pool } = pg;
const db = new Pool({ connectionString: process.env.PG_CONNECTION_STRING });

const dir = "../Downloads/gcide-0.54";
const files = readdirSync(dir).filter((f) => f.startsWith("CIDE."));
const hwRegex = /<hw>(.*?)<\/hw>/gs;
const posRegex = /<pos>(.*?)<\/pos>/s;
const defRegex = /<def>(.*?)<\/def>/gs;
const etyRegex = /<ety>(.*?)<\/ety>/s;

for (const file of files) {
  const content = readFileSync(`${dir}/${file}`, "utf8");
  const entries = [...content.matchAll(hwRegex)];
  for (const [_, hw] of entries) {
    const entryStart = content.indexOf(`<hw>${hw}</hw>`);
    const nextEntryStart = content.indexOf("<hw>", entryStart + 1);
    const entryBlock = content.slice(
      entryStart,
      nextEntryStart === -1 ? undefined : nextEntryStart,
    );
    const pos = entryBlock.match(posRegex)?.[1] ?? null;
    const defs = [...entryBlock.matchAll(defRegex)].map((m) => m[1]);
    const ety = entryBlock.match(etyRegex)?.[1] ?? null;
    await db.query(
      "INSERT INTO dictionary (headword, pos, definitions, etymology, entry_raw) VALUES ($1, $2, $3, $4, $5)",
      [hw, pos, defs, ety, entryBlock],
    );
  }
}
