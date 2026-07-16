import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

/**
 * AdSense-friendly Skills page improvements:
 * - Remove whileInView (content renders immediately for crawlers/reviewers)
 * - Add more unique, descriptive copy (avoids “thin content”)
 * - Add trust/navigation links (Projects, Blog, Contact, Policies)
 */
export default function SkillsPage() {
  const reduceMotion = useReducedMotion();

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
      tabIndex={0}
      className="
        group relative overflow-hidden
        rounded-2xl p-6
        bg-white/70 dark:bg-gray-900/60
        backdrop-blur border
        border-gray-200/70 dark:border-gray-700/70
        shadow-sm hover:shadow-lg
        transition-shadow
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50
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

  const groups = [
    {
      title: "Frontend",
      items: [
        "React (components, hooks, composition patterns)",
        "Vite (fast dev + build pipeline)",
        "JavaScript (modern ES features)",
        "Tailwind CSS (layout, spacing, responsive UI)",
        "Framer Motion (micro-interactions and transitions)",
        "Component-driven UI design (reusable sections and cards)",
      ],
    },
    {
      title: "Backend and Database",
      items: [
        "Firebase Auth (signup/login/logout patterns)",
        "Firestore CRUD (collections, documents, query basics)",
        "Firestore Security Rules (deny-by-default, role checks)",
        "Data modeling (query-friendly structures, audit fields)",
        "Basic REST integration (frontend ↔ API calls)",
      ],
    },
    {
      title: "Product Features",
      items: [
        "Role-based dashboards (donor/recipient/doctor/admin)",
        "Protected routing (auth guard + role guard)",
        "Search and filters (role/status/date, list views)",
        "Export design (PDF/Excel-ready tables and reports)",
        "Admin panels (review flows, status tracking)",
        "History and activity views (timestamps, traceability)",
      ],
    },
    {
      title: "Deployment and SEO",
      items: [
        "Firebase Hosting (production deployment)",
        "SPA rewrites (no 404 on refresh for /blog/:slug etc.)",
        "Sitemap.xml + robots.txt (discovery and crawling)",
        "Basic on-page SEO (titles, descriptions, internal links)",
        "Search Console workflow (submission + indexing checks)",
      ],
    },
  ];

  const levels = [
    {
      title: "Comfortable with",
      items: [
        "React state patterns, reusable components, clean route structure",
        "Firebase Auth flows for email/password and session handling",
        "Firestore CRUD + query patterns for dashboard screens",
        "Tailwind responsive UI and consistent typography/spacing",
        "Debugging route issues and hosting rewrites for SPAs",
      ],
    },
    {
      title: "Working knowledge",
      items: [
        "Firestore role-based rules for multi-role applications",
        "Admin dashboards with filters, status workflows, and audit fields",
        "Export-friendly data layouts (stable columns, IDs, timestamps)",
        "Performance basics (reduce unnecessary renders and heavy UI)",
      ],
    },
    {
      title: "Currently exploring",
      items: [
        "Phone OTP login and stronger auth verification patterns",
        "Notifications and real-time updates (listener-based UX)",
        "Structured data and deeper SEO (publisher-style improvements)",
        "More advanced matching/scoring logic for real systems",
      ],
    },
  ];

  const Chip = ({ to, children, delay = 0 }) => (
    <motion.div {...fadeUp(delay)}>
      <Link
        to={to}
        className="
          rounded-xl border border-black/10 dark:border-white/10
          bg-white/70 dark:bg-gray-900/60 backdrop-blur
          px-4 py-2 text-sm font-medium
          hover:shadow-sm transition-shadow
          focus:outline-none focus:ring-2 focus:ring-indigo-500/50
          inline-flex items-center
        "
      >
        {children}
      </Link>
    </motion.div>
  );

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-16"
    >
      <header>
        <motion.h1 {...fadeUp(0)} className="text-4xl font-bold tracking-tight">
          Skills
        </motion.h1>

        <motion.p
          {...fadeUp(0.05)}
          className="mt-3 text-slate-600 dark:text-gray-300 max-w-3xl leading-relaxed"
        >
          My skill set is shaped by building full-stack projects end-to-end. I focus on
          clean UI, secure authentication, Firestore data modeling, and role-based access
          patterns. This page summarizes the tools I use and how they translate into
          real features such as dashboards, admin workflows, and export-ready reports.
        </motion.p>

        <motion.p
          {...fadeUp(0.08)}
          className="mt-3 text-slate-600 dark:text-gray-300 max-w-3xl leading-relaxed"
        >
          For transparency, you can see these skills applied directly in my project
          case studies and blog posts where I explain design choices, rules, routing,
          and deployment details.
        </motion.p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Chip to="/projects" delay={0.1}>
            View Projects
          </Chip>
          <Chip to="/blog" delay={0.12}>
            Read Blog
          </Chip>
          <Chip to="/contact" delay={0.14}>
            Contact
          </Chip>
        </div>
      </header>

      {/* Skill groups */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {groups.map((g, idx) => (
          <Card key={g.title} delay={0.05 + idx * 0.05}>
            <h2 className="text-xl font-semibold">{g.title}</h2>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-gray-300 list-disc pl-5">
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Levels */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {levels.map((l, idx) => (
          <Card key={l.title} delay={0.05 + idx * 0.05}>
            <h2 className="text-xl font-semibold">{l.title}</h2>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-gray-300 list-disc pl-5">
              {l.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* How I apply */}
      <div className="mt-10">
        <Card delay={0.05}>
          <h2 className="text-xl font-semibold">How I apply these skills</h2>
          <p className="mt-3 text-slate-600 dark:text-gray-300 leading-relaxed">
            In projects like ODMS, I use Firebase Auth for identity and store the user
            profile (including role) in Firestore for authorization. After login, the
            role decides routing to the correct dashboard, and Firestore Security Rules
            enforce the same permissions at the database layer. For admin tooling, I
            design list views around real operations: filters, status workflows,
            timestamps, and export-ready tables. On deployment, I ensure SPA refresh
            routes work using hosting rewrites and keep sitemap.xml/robots.txt accessible
            so crawlers can reliably discover important pages like blog posts and case studies.
          </p>
        </Card>
      </div>

      {/* Tools & workflow */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card delay={0.05}>
          <h2 className="text-xl font-semibold">Tools and workflow</h2>
          <ul className="mt-4 space-y-2 text-slate-600 dark:text-gray-300 list-disc pl-5">
            <li>Git and GitHub for version control and clean commit history</li>
            <li>Firebase Hosting for deployments and SPA route rewrites</li>
            <li>Search Console for sitemap submission and indexing verification</li>
            <li>Reusable UI components to keep design consistent and maintainable</li>
          </ul>
        </Card>

        <Card delay={0.1}>
          <h2 className="text-xl font-semibold">Site policies</h2>
          <p className="mt-3 text-slate-600 dark:text-gray-300 leading-relaxed">
            This site includes standard policy pages for transparency and reviewer trust.
            If you enable ads or analytics, ensure these pages remain reachable and updated.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link
              to="/privacy-policy"
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              Terms & Conditions
            </Link>
          </div>
        </Card>
      </div>
    </motion.section>
  );
}
