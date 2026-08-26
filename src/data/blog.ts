import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { unified } from "unified";

// Fine-grained shiki bundle instead of the default full bundle: the full
// bundle inlines every grammar (~10 MB) into the server build, which blows
// past the Cloudflare Workers size limit. Add languages here when a blog
// post needs them; unlisted languages render as plain (unhighlighted) code.
const highlighterPromise = createHighlighterCore({
  themes: [
    import("shiki/themes/min-light.mjs"),
    import("shiki/themes/min-dark.mjs"),
  ],
  langs: [
    import("shiki/langs/bash.mjs"),
    import("shiki/langs/javascript.mjs"),
    import("shiki/langs/typescript.mjs"),
    import("shiki/langs/tsx.mjs"),
    import("shiki/langs/json.mjs"),
    import("shiki/langs/python.mjs"),
    import("shiki/langs/diff.mjs"),
    import("shiki/langs/markdown.mjs"),
  ],
  // Pure-JS regex engine: no oniguruma wasm needed, works in workerd.
  engine: createJavaScriptRegexEngine(),
});

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags?: string[];
};

export type TocEntry = {
  id: string;
  text: string;
  level: 2 | 3;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-");
}

function getNodeText(node: any): string {
  if (node.type === "text") return node.value;
  return (node.children ?? []).map(getNodeText).join("");
}

function rehypeHeadingIds(toc: TocEntry[]) {
  return () => (tree: any) => {
    const counts = new Map<string, number>();
    const visit = (node: any) => {
      if (node.tagName === "h2" || node.tagName === "h3") {
        const text = getNodeText(node).trim();
        if (text) {
          const base = slugify(text) || "section";
          const count = counts.get(base) ?? 0;
          counts.set(base, count + 1);
          const id = count === 0 ? base : `${base}-${count}`;
          node.properties = { ...node.properties, id };
          toc.push({ id, text, level: node.tagName === "h2" ? 2 : 3 });
        }
      }
      (node.children ?? []).forEach(visit);
    };
    visit(tree);
  };
}

function calculateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string) {
  const toc: TocEntry[] = [];
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHeadingIds(toc))
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
      getHighlighter: (() => highlighterPromise) as never,
    })
    .use(rehypeStringify)
    .process(markdown);

  return { html: p.toString(), toc };
}

export async function getPost(slug: string) {
  const filePath = path.join("content", `${slug}.mdx`);
  let source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = matter(source);
  const { html: content, toc } = await markdownToHTML(rawContent);
  const readingTime = calculateReadingTime(rawContent);
  return {
    source: content,
    toc,
    metadata: { ...metadata, readingTime } as Metadata & { readingTime: string },
    slug,
  };
}

async function getAllPosts(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      let slug = path.basename(file, path.extname(file));
      let { metadata, source } = await getPost(slug);
      return {
        metadata,
        slug,
        source,
      };
    })
  );
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content"));
}
