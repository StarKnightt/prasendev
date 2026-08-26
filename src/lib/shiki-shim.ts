// Webpack alias target for the bare `shiki` full-bundle entry (~9 MB of
// grammars), which rehype-pretty-code statically imports but we never use:
// blog.ts passes a fine-grained highlighter via the `getHighlighter` option.
// Aliasing it out keeps the server bundle under the Cloudflare Workers size
// limit. Only `getHighlighter` is imported by rehype-pretty-code.
export function getHighlighter(): never {
  throw new Error(
    "The full shiki bundle is aliased out; pass a custom highlighter via rehype-pretty-code's getHighlighter option (see src/data/blog.ts)."
  );
}
