import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { projectPosts } from "../data/projectPosts";

export default function ProjectsPage() {
  const reduceMotion = useReducedMotion();

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

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <header>
        <motion.h1 {...fadeUp(0)} className="text-4xl font-bold tracking-tight">
          Projects
        </motion.h1>
        <motion.p
          {...fadeUp(0.05)}
          className="mt-3 text-slate-600 dark:text-gray-300 max-w-3xl leading-relaxed"
        >
          Case studies with architecture, data modeling, features, challenges, and improvements.
        </motion.p>
      </header>

      <div className="mt-10 grid gap-6">
        {projectPosts.map((p, idx) => (
          <Card key={p.slug} delay={0.05 + idx * 0.05}>
            <div className="text-sm text-slate-500">{p.date}</div>

            <h2 className="mt-2 text-2xl font-semibold">
              <Link to={`/projects/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </h2>

            <p className="mt-3 text-slate-600 dark:text-gray-300">
              {p.excerpt}
            </p>

            {!!p.tech?.length && (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-slate-600 dark:text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4">
              <Link
                to={`/projects/${p.slug}`}
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                View case study →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
