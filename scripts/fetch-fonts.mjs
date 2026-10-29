// Downloads the Fontshare fonts into src/fonts/ (gitignored).
// Switzer and General Sans are under the ITF Free Font License: self-hosting on
// prasen.dev is allowed, redistributing the files through a public repo is not,
// so the woff2 files are fetched at install/build time instead of committed.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { inflateRawSync } from "node:zlib";

const OUT = "src/fonts";
const FONTS = [
  { slug: "switzer", files: ["Switzer-Variable.woff2", "Switzer-VariableItalic.woff2"] },
  { slug: "general-sans", files: ["GeneralSans-Semibold.woff2"] },
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

mkdirSync(OUT, { recursive: true });
for (const { slug, files } of FONTS) {
  if (files.every((f) => existsSync(`${OUT}/${f}`))) continue;
  const res = await fetch(`https://api.fontshare.com/v2/fonts/download/${slug}`);
  if (!res.ok) throw new Error(`Fontshare download failed for ${slug}: ${res.status}`);
  const found = unzip(Buffer.from(await res.arrayBuffer()), files);
  for (const f of files) {
    if (!found[f]) throw new Error(`${f} missing from the ${slug} zip`);
    writeFileSync(`${OUT}/${f}`, found[f]);
  }
  console.log(`fonts: fetched ${files.join(", ")}`);
}
