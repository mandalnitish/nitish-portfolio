import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { blogPosts } from "../data/blogPosts";

function estimateReadTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

export default function BlogPage() {
  const reduceMotion = useReducedMotion();
  const [q, setQ] = useState("");

  const fadeUp = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut", delay },
    viewport: { once: true, amount: 0.2 },
  });

  const cardMotion = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    whileHover: reduceMotion ? {} : { y: -6, scale: 1.01 },
    transition: { duration: 0.45, ease: "easeOut", delay },
    viewport: { once: true, amount: 0.2 },
  });

  const Card = ({ children, delay = 0 }) => (
    <motion.article
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
    </motion.article>
  );

  const postsSorted = useMemo(() => {
    return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  const featured = useMemo(() => postsSorted.slice(0, 2), [postsSorted]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return postsSorted;

    return postsSorted.filter((p) => {
      const hay = `${p.title} ${p.excerpt} ${p.content}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q, postsSorted]);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <header>
        <motion.h1 {...fadeUp(0)} className="text-4xl font-bold tracking-tight">
          Blog
        </motion.h1>

        <motion.p
          {...fadeUp(0.05)}
          className="mt-3 text-slate-600 dark:text-gray-300 max-w-2xl leading-relaxed"
        >
          Articles on React, Firebase, deployment, security rules, and building real-world
          projects like ODMS. Each post is written from practical implementation experience.
        </motion.p>

        {/* Search */}
        <motion.div {...fadeUp(0.1)} className="mt-8">
          <label className="block text-sm font-medium text-slate-700 dark:text-gray-200">
            Search posts
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, topic, or keyword..."
            className="
              mt-2 w-full rounded-xl
              border border-black/10 dark:border-white/10
              bg-white/70 dark:bg-gray-900/60
              backdrop-blur px-4 py-3
              outline-none
              focus:ring-2 focus:ring-indigo-500
            "
          />
          <div className="mt-2 text-sm text-slate-500">
            Showing {filtered.length} of {postsSorted.length} posts
          </div>
        </motion.div>
      </header>

      {/* Featured */}
      {featured.length > 0 && !q.trim() && (
        <div className="mt-10">
          <motion.h2 {...fadeUp(0)} className="text-xl font-semibold">
            Featured
          </motion.h2>

          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {featured.map((p, idx) => (
              <Card key={p.slug} delay={0.05 + idx * 0.05}>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{p.date}</span>
                  <span>{estimateReadTime(p.content || "")}</span>
                </div>

                <h3 className="mt-2 text-2xl font-semibold">
                  <Link to={`/blog/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                </h3>

                <p className="mt-3 text-slate-600 dark:text-gray-300">{p.excerpt}</p>

                <div className="mt-4">
                  <Link
                    to={`/blog/${p.slug}`}
                    className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Posts */}
      <div className="mt-12">
        <motion.h2 {...fadeUp(0)} className="text-xl font-semibold">
          All posts
        </motion.h2>

        <div className="mt-4 grid gap-6">
          {filtered.map((p, idx) => (
            <Card key={p.slug} delay={0.05 + idx * 0.03}>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{p.date}</span>
                <span>{estimateReadTime(p.content || "")}</span>
              </div>

              <h3 className="mt-2 text-2xl font-semibold">
                <Link to={`/blog/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </h3>

              <p className="mt-3 text-slate-600 dark:text-gray-300">{p.excerpt}</p>

              <div className="mt-4">
                <Link
                  to={`/blog/${p.slug}`}
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </Card>
          ))}

          {filtered.length === 0 && (
            <Card delay={0.05}>
              <h3 className="text-lg font-semibold">No results</h3>
              <p className="mt-2 text-slate-600 dark:text-gray-300">
                Try a different keyword (example: "Firebase", "routing", "hosting", "ODMS").
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Trust/Policy footer links */}
      <div className="mt-14 text-sm text-slate-500">
        <p>
          Legal:{" "}
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>{" "}
          ·{" "}
          <Link to="/terms-and-conditions" className="hover:underline">
            Terms & Conditions
          </Link>
        </p>
      </div>
    </section>
  );
}
