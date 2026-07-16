import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { projectPosts } from "../data/projectPosts";

/**
 * Simple Markdown Renderer:
 * - Headings: #, ##, ###
 * - Bullets: - item
 * - Numbered: 1. item
 * - Numbered: 1) item
 * - Code blocks: 4-space indent OR ``` fences (optional)
 * - Paragraphs
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

    // Optional fenced code blocks
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

    const t = line.trim();

    if (!t) {
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
    if (t.startsWith("### ")) {
      flushParagraph();
      flushCode();
      blocks.push({ type: "h3", text: t.slice(4) });
      continue;
    }
    if (t.startsWith("## ")) {
      flushParagraph();
      flushCode();
      blocks.push({ type: "h2", text: t.slice(3) });
      continue;
    }
    if (t.startsWith("# ")) {
      flushParagraph();
      flushCode();
      blocks.push({ type: "h1", text: t.slice(2) });
      continue;
    }

    // Bullets
    if (t.startsWith("- ")) {
      pushListItem("ul", t.slice(2));
      continue;
    }

    // Numbered list: "1. item"
    const olDot = t.match(/^(\d+)\.\s+(.*)$/);
    if (olDot) {
      pushListItem("ol", olDot[2]);
      continue;
    }

    // Numbered list: "1) item"
    const olParen = t.match(/^(\d+)\)\s+(.*)$/);
    if (olParen) {
      pushListItem("ol", olParen[2]);
      continue;
    }

    paragraph.push(t);
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

function buildToc(blocks) {
  const toc = [];
  const seen = new Map();

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

function estimateReadingTime(content) {
  const words = (content || "")
    .replace(/[#>*`]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

function getRelatedProjects(current, limit = 3) {
  const sameCategory = projectPosts
    .filter((p) => p.slug !== current.slug && p.category === current.category)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  const byTech = projectPosts
    .filter((p) => p.slug !== current.slug)
    .map((p) => {
      const a = new Set(current.tech || []);
      const b = new Set(p.tech || []);
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
  byTech.forEach(pushUnique);

  return merged.slice(0, limit);
}

export default function ProjectPostPage() {
  const reduceMotion = useReducedMotion();
  const { slug } = useParams();

  const post = useMemo(() => projectPosts.find((p) => p.slug === slug), [slug]);

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

  const Card = ({ children, delay = 0, className = "" }) => (
    <motion.div
      {...cardMotion(delay)}
      className={`
        group relative overflow-hidden
        rounded-2xl p-6
        bg-white/70 dark:bg-gray-900/60
        backdrop-blur border
        border-gray-200/70 dark:border-gray-700/70
        shadow-sm hover:shadow-lg
        transition-shadow
        ${className}
      `}
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
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link
          to="/projects"
          className="mt-6 inline-block text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          ← Back to Projects
        </Link>
      </section>
    );
  }

  const blocks = renderSimpleMarkdown(post.content || "");
  const toc = buildToc(blocks);
  const related = getRelatedProjects(post, 3);

  const readingTime = post.readingTime || estimateReadingTime(post.content || "");
  const published = formatDate(post.date);
  const updated = post.updatedAt ? formatDate(post.updatedAt) : null;

  // Ensure heading ids in content match TOC ids even with duplicates
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
    <article className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <header>
        <motion.nav {...fadeUp(0)} className="text-sm text-slate-500">
          <Link to="/projects" className="hover:underline">
            Projects
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
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="mt-2 text-4xl font-bold tracking-tight"
        >
          {post.title}
        </motion.h1>

        <motion.p
          {...fadeUp(0.1)}
          className="mt-4 text-slate-600 dark:text-gray-300 leading-relaxed max-w-4xl"
        >
          {post.excerpt}
        </motion.p>

        {!!post.tech?.length && (
          <motion.div {...fadeUp(0.12)} className="mt-6 flex flex-wrap gap-2">
            {post.tech.map((t) => (
              <span
                key={t}
                className="text-xs rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-slate-600 dark:text-gray-300"
              >
                {t}
              </span>
            ))}
          </motion.div>
        )}

        {!!post.images?.length && (
          <motion.div {...fadeUp(0.14)} className="mt-8 grid gap-4 sm:grid-cols-2">
            {post.images.map((img) => (
              <a
                key={img.src}
                href={img.src}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-gray-900/40"
              >
                <img
                  src={img.src}
                  alt={img.alt || post.title}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                {img.alt && (
                  <div className="px-4 py-3 text-sm text-slate-600 dark:text-gray-300">
                    {img.alt}
                  </div>
                )}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      {toc.length > 0 ? (
        <div className="mt-10">
          <Card delay={0.15}>
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

      <motion.div {...fadeUp(0.18)} className="mt-10">
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
      </motion.div>

      {/* Related projects (publisher feel + internal linking) */}
      {related.length > 0 ? (
        <div className="mt-10">
          <Card delay={0.2}>
            <h2 className="text-base font-semibold">Related projects</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  to={`/projects/${rp.slug}`}
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
          to="/projects"
          className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
        >
          ← Back to Projects
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
