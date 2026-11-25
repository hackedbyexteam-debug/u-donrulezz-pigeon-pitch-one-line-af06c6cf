import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Our churn is zero because our users literally cannot leave the park. Our CAC is a bag of breadcrumbs. Our moat is the sky.";

const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry must be 1-200 characters, got ${charCount}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote ${outPath} (${charCount} chars)`);
