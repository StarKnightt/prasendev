// Builds the Cloudflare Worker bundle (replaces a plain `opennextjs-cloudflare build`).
//
// Why this exists: @opennextjs/cloudflare's patchVercelOgLibrary has a Windows
// bug — it rewrites the @vercel/og import (node -> edge) in the wrong copy of
// the built OG route (.next/server instead of the copy bundled into
// .open-next), so /api/og crashes in workerd trying to read the fallback font
// from disk. This script runs the same steps the adapter would, but applies
// the node -> edge import fix to the Next build output *before* the OpenNext
// bundling step (--skipNextBuild) copies and bundles it.
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const run = (cmd) =>
  execSync(cmd, {
    stdio: "inherit",
    // NEXT_PRIVATE_STANDALONE is what the adapter sets when it runs
    // `next build` itself; --skipNextBuild requires the standalone output.
    env: { ...process.env, NEXT_PRIVATE_STANDALONE: "true" },
  });

run("npx next build");

for (const file of [
  ".next/server/app/api/og/route.js",
  ".next/standalone/.next/server/app/api/og/route.js",
]) {
  if (!existsSync(file)) continue;
  const src = readFileSync(file, "utf8");
  const out = src.replaceAll(
    "next/dist/compiled/@vercel/og/index.node.js",
    "next/dist/compiled/@vercel/og/index.edge.js"
  );
  if (out !== src) {
    writeFileSync(file, out);
    console.log(`patched ${file}: @vercel/og node -> edge import`);
  }
}

run("npx opennextjs-cloudflare build --skipNextBuild");
