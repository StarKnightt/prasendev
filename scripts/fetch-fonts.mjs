// Downloads the Fontshare fonts into src/fonts/ (gitignored).
// Switzer and General Sans are under the ITF Free Font License: self-hosting on
// prasen.dev is allowed, redistributing the files through a public repo is not,
// so the woff2 files are fetched at install/build time instead of committed.
//
// Never fails the build: if Fontshare is unreachable, the slots are filled with
// the committed OFL Inter from src/fonts-fallback/ and listed in .fallback, so
// the next run retries the real download.
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { inflateRawSync } from "node:zlib";

const OUT = "src/fonts";
const FALLBACK_DIR = "src/fonts-fallback";
const MARKER = `${OUT}/.fallback`;
const BASE = process.env.FONTSHARE_BASE ?? "https://api.fontshare.com";
const ATTEMPTS = 3;
const TIMEOUT_MS = 15000;

const FONTS = [
  {
    slug: "switzer",
    files: {
      "Switzer-Variable.woff2": "Inter-Variable.woff2",
      "Switzer-VariableItalic.woff2": "Inter-VariableItalic.woff2",
    },
  },
  { slug: "general-sans", files: { "GeneralSans-Semibold.woff2": "Inter-Variable.woff2" } },
];

function unzip(buf, wanted) {
  const found = {};
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error("not a zip");
  let p = buf.readUInt32LE(eocd + 16);
  const count = buf.readUInt16LE(eocd + 10);
  for (let i = 0; i < count; i++) {
    const method = buf.readUInt16LE(p + 10);
    const size = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString("utf8", p + 46, p + 46 + nameLen);
    const base = name.split("/").pop();
    if (name.includes("/WEB/") && wanted.includes(base)) {
      const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
      const data = buf.subarray(start, start + size);
      found[base] = method === 8 ? inflateRawSync(data) : data;
    }
    p += 46 + nameLen + extraLen + commentLen;
  }
  return found;
}

async function download(slug, wanted) {
  let lastError;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const res = await fetch(`${BASE}/v2/fonts/download/${slug}`, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const found = unzip(Buffer.from(await res.arrayBuffer()), wanted);
      const missing = wanted.filter((f) => !found[f]);
      if (missing.length) throw new Error(`missing ${missing.join(", ")} in zip`);
      return found;
    } catch (error) {
      lastError = error;
      if (attempt < ATTEMPTS) await new Promise((r) => setTimeout(r, attempt * 1000));
    }
  }
  throw lastError;
}

mkdirSync(OUT, { recursive: true });
const pending = new Set(existsSync(MARKER) ? readFileSync(MARKER, "utf8").split("\n").filter(Boolean) : []);
const stillFallback = [];

for (const { slug, files } of FONTS) {
  const names = Object.keys(files);
  if (names.every((f) => existsSync(`${OUT}/${f}`) && !pending.has(f))) continue;
  try {
    const found = await download(slug, names);
    for (const f of names) writeFileSync(`${OUT}/${f}`, found[f]);
    console.log(`fonts: fetched ${names.join(", ")}`);
  } catch (error) {
    console.warn(`fonts: Fontshare unavailable for ${slug} (${error.message}), using Inter fallback`);
    for (const [f, fallback] of Object.entries(files)) {
      copyFileSync(`${FALLBACK_DIR}/${fallback}`, `${OUT}/${f}`);
      stillFallback.push(f);
    }
  }
}

if (stillFallback.length) writeFileSync(MARKER, stillFallback.join("\n") + "\n");
else rmSync(MARKER, { force: true });
