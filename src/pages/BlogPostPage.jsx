import { useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { blogPosts } from "../data/blogPosts";

/**
 * Lightweight renderer:
 * - Headings: #, ##, ###
 * - Bullets: - item
 * - Numbered: 1. item
 * - Numbered: 1) item
 * - Code blocks: lines starting with 4 spaces OR ``` fences (optional)
 * - Paragraphs
 *
 * Note: Keep blog content free of backticks if you are storing it in JS template strings.
 * If you want to use ``` fences in content, use String.raw in blogPosts.js.
 */
function renderSimpleMarkdown(md) {
  const rawLines = (md || "").replace(/\r\n/g, "\n").split("\n");
  const blocks = [];

  let paragraph = [];
  let inCode = false;
  let codeLines = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "p", text: paragraph.join(" ") });
      paragraph = [];
    }
  };

  const flushCode = () => {
    if (codeLines.length) {
      blocks.push({ type: "code", text: codeLines.join("\n") });
      codeLines = [];
    }
  };

  const pushListItem = (type, text) => {
    flushParagraph();
    flushCode();
    const last = blocks[blocks.length - 1];
    if (!last || last.type !== type) blocks.push({ type, items: [] });
    blocks[blocks.length - 1].items.push(text);
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];

    // Optional fenced code blocks (only safe if blog content uses String.raw)
    if (line.trim() === "```") {
      flushParagraph();
      if (inCode) {
        inCode = false;
        flushCode();
      } else {
        inCode = true;
        codeLines = [];
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    // Indented code (4 spaces)
    if (line.startsWith("    ")) {
      flushParagraph();
      codeLines.push(line.slice(4));
      const next = rawLines[i + 1] || "";
      if (!next.startsWith("    ")) flushCode();
      continue;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushCode();
      blocks.push({ type: "h3", text: trimmed.slice(4) });
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushCode();
      blocks.push({ type: "h2", text: trimmed.slice(3) });
      continue;
    }
    if (trimmed.startsWith("# ")) {
      flushParagraph();
      flushCode();
      blocks.push({ type: "h1", text: trimmed.slice(2) });
      continue;
    }

    // Bullets
    if (trimmed.startsWith("- ")) {
      pushListItem("ul", trimmed.slice(2));
      continue;
    }

    // Numbered list: "1. item"
    const olDot = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olDot) {
      pushListItem("ol", olDot[2]);
      continue;
    }

    // Numbered list: "1) item"
    const olParen = trimmed.match(/^(\d+)\)\s+(.*)$/);
    if (olParen) {
      pushListItem("ol", olParen[2]);
      continue;
    }

    // Paragraph
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushCode();
  return blocks;
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

function slugifyHeading(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * FIXED ISSUE:
 * When a post has repeated headings (common in templates),
 * multiple headings would get the same id -> TOC links break.
 * This makes ids unique by appending "-2", "-3", etc. as needed.
 */
function buildToc(blocks) {
  const toc = [];
  const seen = new Map(); // baseId -> count

  for (const b of blocks) {
    if (b.type === "h2" || b.type === "h3") {
      const baseId = slugifyHeading(b.text);
      const count = (seen.get(baseId) || 0) + 1;
      seen.set(baseId, count);

      const id = count === 1 ? baseId : `${baseId}-${count}`;
      toc.push({ level: b.type === "h2" ? 2 : 3, text: b.text, id });
    }
  }
  return toc;
}

/**
 * FIXED ISSUE:
 * Reading time on your data sometimes uses "10–12 min" (en dash),
 * and you were printing "{readingTime} read" which becomes
 * "10–12 min read read". This normalizes to a clean display.
 */
function normalizeReadingTime(post) {
  if (post.readingTime) return String(post.readingTime).replace(/\s*read$/i, "");
  // fallback estimate
  const words = (post.content || "")
    .replace(/[#>*`]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

function getRelatedPosts(current, limit = 3) {
  const sameCategory = blogPosts
    .filter((p) => p.slug !== current.slug && p.category === current.category)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  const byTags = blogPosts
    .filter((p) => p.slug !== current.slug)
    .map((p) => {
      const a = new Set(current.tags || []);
      const b = new Set(p.tags || []);
      let score = 0;
      for (const t of a) if (b.has(t)) score++;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort(
      (x, y) =>
        y.score - x.score || (y.p.date || "").localeCompare(x.p.date || "")
    )
    .map((x) => x.p);

  const merged = [];
  const pushUnique = (p) => {
    if (!merged.some((m) => m.slug === p.slug)) merged.push(p);
  };

  sameCategory.forEach(pushUnique);
  byTags.forEach(pushUnique);

  return merged.slice(0, limit);
}

export default function BlogPostPage() {
  const reduceMotion = useReducedMotion();
  const { slug } = useParams();

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  // Nice UX: ensure browser starts at top when changing slug
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  const fadeUp = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut", delay },
  });

  const cardMotion = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    whileHover: reduceMotion ? {} : { y: -6, scale: 1.01 },
    transition: { duration: 0.45, ease: "easeOut", delay },
  });

  const Card = ({ children, delay = 0 }) => (
    <motion.div
      {...cardMotion(delay)}
      className="
        group relative overflow-hidden
        rounded-2xl p-6
        bg-white/70 dark:bg-gray-900/60
        backdrop-blur border
        border-gray-200/70 dark:border-gray-700/70
        shadow-sm hover:shadow-lg
        transition-shadow
      "
    >
      <div
        aria-hidden
        className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          bg-gradient-to-br
          from-indigo-500/15 via-purple-500/15 to-pink-500/15
        "
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );

  if (!post) {
    return (
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="mt-3 text-slate-600 dark:text-gray-300">
          The blog post you’re looking for doesn’t exist.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-block text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          ← Back to Blog
        </Link>
      </section>
    );
  }

  const blocks = renderSimpleMarkdown(post.content);

  // Build TOC with unique ids and also prepare a heading id map for rendering
  const toc = buildToc(blocks);
  const related = getRelatedPosts(post, 3);

  // Prefer post.updatedAt if available; fall back to post.date
  const published = formatDate(post.date);
  const updated = post.updatedAt ? formatDate(post.updatedAt) : null;

  // Fixed display: no double "read"
  const readingTime = normalizeReadingTime(post);

  // For heading ids in the article itself (must match TOC ids including duplicates)
  const headingIdState = useMemo(() => {
    const seen = new Map();
    return {
      nextId(text) {
        const base = slugifyHeading(text);
        const count = (seen.get(base) || 0) + 1;
        seen.set(base, count);
        return count === 1 ? base : `${base}-${count}`;
      },
    };
  }, [slug]);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <header>
        <motion.nav {...fadeUp(0)} className="text-sm text-slate-500">
          <Link to="/blog" className="hover:underline">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-400">{post.title}</span>
        </motion.nav>

        <motion.div {...fadeUp(0.05)} className="mt-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500">
            <span>{published}</span>
            <span className="text-slate-300 dark:text-gray-700">•</span>
            <span>{readingTime} read</span>

            {post.category ? (
              <>
                <span className="text-slate-300 dark:text-gray-700">•</span>
                <span className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs">
                  {post.category}
                </span>
              </>
            ) : null}

            {updated ? (
              <>
                <span className="text-slate-300 dark:text-gray-700">•</span>
                <span className="text-xs">
                  Updated: <span className="font-medium">{updated}</span>
                </span>
              </>
            ) : null}
          </div>

          <div className="mt-2 text-sm text-slate-500">
            <span className="font-medium text-slate-600 dark:text-gray-200">
              {post.author || "Author"}
            </span>
          </div>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="mt-3 text-4xl font-bold tracking-tight"
        >
          {post.title}
        </motion.h1>

        <motion.p
          {...fadeUp(0.1)}
          className="mt-4 text-slate-600 dark:text-gray-300 leading-relaxed"
        >
          {post.excerpt}
        </motion.p>

        {Array.isArray(post.tags) && post.tags.length > 0 ? (
          <motion.div {...fadeUp(0.12)} className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 px-3 py-1 text-xs text-slate-600 dark:text-gray-300"
              >
                #{t}
              </span>
            ))}
          </motion.div>
        ) : null}
      </header>

      {toc.length > 0 ? (
        <div className="mt-10">
          <Card delay={0.14}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">On this page</h2>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Back to top
              </button>
            </div>

            <nav className="mt-4">
              <ul className="space-y-2 text-sm">
                {toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                    <a
                      href={`#${item.id}`}
                      className="text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Card>
        </div>
      ) : null}

      <div className="mt-10">
        <Card delay={0.16}>
          <section className="prose prose-slate dark:prose-invert max-w-none">
            {blocks.map((b, i) => {
              if (b.type === "h1") {
                const id = headingIdState.nextId(b.text);
                return (
                  <h1 key={i} id={id} className="scroll-mt-28">
                    {b.text}
                  </h1>
                );
              }
              if (b.type === "h2") {
                const id = headingIdState.nextId(b.text);
                return (
                  <h2 key={i} id={id} className="scroll-mt-28">
                    {b.text}
                  </h2>
                );
              }
              if (b.type === "h3") {
                const id = headingIdState.nextId(b.text);
                return (
                  <h3 key={i} id={id} className="scroll-mt-28">
                    {b.text}
                  </h3>
                );
              }

              if (b.type === "ul") {
                return (
                  <ul key={i}>
                    {b.items.map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>
                );
              }

              if (b.type === "ol") {
                return (
                  <ol key={i}>
                    {b.items.map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ol>
                );
              }

              if (b.type === "code") {
                return (
                  <pre
                    key={i}
                    className="not-prose rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.06] p-4 overflow-x-auto"
                  >
                    <code className="text-sm">{b.text}</code>
                  </pre>
                );
              }

              return <p key={i}>{b.text}</p>;
            })}
          </section>
        </Card>
      </div>

      <div className="mt-10">
        <Card delay={0.18}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-sm text-slate-500">Written by</div>
                <div className="text-lg font-semibold">
                  {post.author || "Author"}
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-gray-300">
                  {post.category ? `${post.category} • ` : ""}
                  Published {published}
                  {updated ? ` • Updated ${updated}` : ""}
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  to="/about"
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Contact
                </Link>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
              This post documents practical implementation patterns used in real
              projects. If you spot an issue or want a deeper example, use the
              Contact page.
            </p>
          </div>
        </Card>
      </div>

      {related.length > 0 ? (
        <div className="mt-10">
          <Card delay={0.2}>
            <h2 className="text-base font-semibold">Related posts</h2>
            <div className="mt-4 grid gap-4">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  className="rounded-xl border border-black/10 dark:border-white/10 p-4 hover:shadow-md transition-shadow bg-white/40 dark:bg-white/5"
                >
                  <div className="text-sm text-slate-500">
                    {formatDate(rp.date)}{" "}
                    {rp.category ? `• ${rp.category}` : ""}
                  </div>
                  <div className="mt-1 font-semibold">{rp.title}</div>
                  <div className="mt-2 text-sm text-slate-600 dark:text-gray-300">
                    {rp.excerpt}
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      ) : null}

      <footer className="mt-12 flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/blog"
          className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
        >
          ← Back to Blog
        </Link>

        <div className="flex flex-wrap gap-4 text-sm">
          <Link to="/privacy-policy" className="text-slate-500 hover:underline">
            Privacy Policy
          </Link>
          <Link
            to="/terms-and-conditions"
            className="text-slate-500 hover:underline"
          >
            Terms
          </Link>
        </div>
      </footer>
    </article>
  );
}
