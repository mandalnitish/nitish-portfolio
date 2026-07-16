import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

/**
 * AdSense-friendly About page:
 * - Content renders immediately (no whileInView)
 * - Strong trust signals: identity, purpose, contact, policy links
 * - Unique, detailed copy (avoids thin/duplicate content)
 * - Optional JSON-LD for About page (publisher signal)
 */
export default function AboutPage() {
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

  const Card = ({ children, delay = 0, className = "" }) => (
    <motion.div
      {...cardMotion(delay)}
      tabIndex={0}
      className={`
        group relative overflow-hidden
        rounded-2xl p-6
        bg-white/70 dark:bg-gray-900/60
        backdrop-blur border
        border-gray-200/70 dark:border-gray-700/70
        shadow-sm hover:shadow-lg
        transition-shadow
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50
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

  const ChipLink = ({ to, children, delay = 0 }) => (
    <motion.div {...fadeUp(delay)}>
      <Link
        to={to}
        className="
          inline-flex items-center
          rounded-xl
          border border-black/10 dark:border-white/10
          bg-white/70 dark:bg-gray-900/60
          backdrop-blur
          px-4 py-2 text-sm font-medium
          hover:shadow-sm
          transition-shadow
          focus:outline-none focus:ring-2 focus:ring-indigo-500/50
        "
      >
        {children}
      </Link>
    </motion.div>
  );

  // Optional JSON-LD for stronger “publisher” signal
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About — Nitish Mandal",
    url: "https://nitishmandal.site/about",
    description:
      "About Nitish Mandal — Computer Engineering student and full-stack developer focused on secure, role-based web applications using React and Firebase.",
    isPartOf: {
      "@type": "WebSite",
      name: "Nitish Mandal",
      url: "https://nitishmandal.site",
    },
    mainEntity: {
      "@type": "Person",
      name: "Nitish Mandal",
      url: "https://nitishmandal.site",
      sameAs: [
        // Add your real profiles if you have them
        // "https://github.com/yourusername",
        // "https://www.linkedin.com/in/yourusername/",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <motion.section
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-5xl mx-auto px-4 sm:px-6 py-16"
      >
        <header>
          <motion.h1 {...fadeUp(0)} className="text-4xl font-bold tracking-tight">
            About
          </motion.h1>

          {/* Strong identity + trust signal */}
          <motion.p
            {...fadeUp(0.05)}
            className="mt-3 text-slate-600 dark:text-gray-300 max-w-3xl leading-relaxed"
          >
            I’m <span className="font-semibold">Nitish Mandal</span>, a Computer
            Engineering student and full-stack developer. I build practical web
            applications with a focus on{" "}
            <span className="font-medium">security</span>,{" "}
            <span className="font-medium">role-based access</span>, and{" "}
            <span className="font-medium">clean user experience</span>. This
            website documents my projects and the engineering decisions behind
            them.
          </motion.p>

          <motion.p
            {...fadeUp(0.08)}
            className="mt-3 text-slate-600 dark:text-gray-300 max-w-3xl leading-relaxed"
          >
            My work is centered around product patterns: authentication,
            authorization, structured Firestore data models, audit-friendly admin
            tooling, and deployments that remain stable on refresh (SPA rewrites,
            correct routing, and verified SEO files). I also write technical posts
            to show what I implemented, what broke, and how I validated fixes.
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ChipLink to="/projects" delay={0.1}>
              View Projects
            </ChipLink>
            <ChipLink to="/blog" delay={0.12}>
              Read Blog
            </ChipLink>
            <ChipLink to="/contact" delay={0.14}>
              Contact
            </ChipLink>
          </div>

          {/* Trust navigation for reviewers */}
          <motion.div
            {...fadeUp(0.16)}
            className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500"
          >
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:underline">
              Terms
            </Link>
          </motion.div>
        </header>

        {/* Highlights */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card delay={0.05}>
            <h2 className="text-lg font-semibold">Focus</h2>
            <p className="mt-2 text-slate-600 dark:text-gray-300 leading-relaxed">
              Multi-role systems, admin dashboards, secure workflows, and clear
              engineering documentation.
            </p>
          </Card>

          <Card delay={0.1}>
            <h2 className="text-lg font-semibold">Primary stack</h2>
            <p className="mt-2 text-slate-600 dark:text-gray-300 leading-relaxed">
              React, Vite, Tailwind, Firebase Auth, Firestore, and deployment/SEO
              fundamentals (sitemap, robots, SPA rewrites).
            </p>
          </Card>

          <Card delay={0.15}>
            <h2 className="text-lg font-semibold">Strength</h2>
            <p className="mt-2 text-slate-600 dark:text-gray-300 leading-relaxed">
              Converting project ideas into product-style builds with proper
              authorization rules, maintainable code, and validation checklists.
            </p>
          </Card>
        </div>

        {/* What I build / How I work */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card delay={0.05}>
            <h2 className="text-xl font-semibold">What I build</h2>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-gray-300 list-disc pl-5">
              <li>Role-based web apps with protected routing and admin panels</li>
              <li>Firebase Auth + Firestore systems with strict security rules</li>
              <li>Dashboards: filters, status workflows, timestamps, audit trails</li>
              <li>Export-ready reports (PDF/Excel) with stable columns and metadata</li>
              <li>Fast frontends with consistent typography and responsive layout</li>
            </ul>
          </Card>

          <Card delay={0.1}>
            <h2 className="text-xl font-semibold">How I work</h2>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-gray-300 list-disc pl-5">
              <li>Start with roles and requirements, then design data + permissions</li>
              <li>Use reusable UI components to keep pages consistent</li>
              <li>Enforce authorization in Firestore rules, not only the UI</li>
              <li>Deploy early, verify refresh routing and SEO file accessibility</li>
              <li>Document decisions and common mistakes to reduce future bugs</li>
            </ul>
          </Card>
        </div>

        {/* Education / Experience / Certificates */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card delay={0.05}>
            <h2 className="text-xl font-semibold">Education</h2>
            <p className="mt-3 text-slate-600 dark:text-gray-300 leading-relaxed">
              Computer Engineering with a practical interest in full-stack systems,
              authentication/authorization, and stable deployments.
            </p>
          </Card>

          <Card delay={0.1}>
            <h2 className="text-xl font-semibold">Experience</h2>
            <p className="mt-3 text-slate-600 dark:text-gray-300 leading-relaxed">
              Hands-on implementation across signup/login flows, role dashboards,
              admin workflows, exports, and reporting-style interfaces.
            </p>
          </Card>

          <Card delay={0.15}>
            <h2 className="text-xl font-semibold">Certificates</h2>
            <p className="mt-3 text-slate-600 dark:text-gray-300 leading-relaxed">
              I track certifications and achievements and improve continuously
              through project-based learning and iteration.
            </p>
          </Card>
        </div>

        {/* Project focus */}
        <div className="mt-10">
          <Card delay={0.05}>
            <h2 className="text-xl font-semibold">Project focus</h2>
            <p className="mt-3 text-slate-600 dark:text-gray-300 leading-relaxed">
              My recent work includes{" "}
              <span className="font-medium">
                ODMS (Organ Donor Management System)
              </span>
              , where I implemented multi-role authentication, Firestore data
              modeling, secure access control using Firebase rules, and
              export-ready admin reporting. I also build tooling projects that
              improve productivity and site UX.
            </p>

            <div className="mt-4 text-slate-600 dark:text-gray-300">
              Explore detailed case studies here:{" "}
              <Link
                to="/projects"
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Projects
              </Link>
            </div>
          </Card>
        </div>

        {/* Contact + Policies */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card delay={0.05}>
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="mt-3 text-slate-600 dark:text-gray-300 leading-relaxed">
              For collaboration, project discussions, or help with React/Firebase
              setups, reach out via the contact page. I respond with practical,
              implementation-focused guidance.
            </p>

            <Link
              to="/contact"
              className="mt-4 inline-flex text-indigo-600 dark:text-indigo-400 font-medium hover:underline
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              Go to Contact →
            </Link>
          </Card>

          <Card delay={0.1}>
            <h2 className="text-xl font-semibold">Site policies</h2>
            <p className="mt-3 text-slate-600 dark:text-gray-300 leading-relaxed">
              This site includes policy pages for transparency. If you enable ads
              or analytics, keep these pages reachable and clear for users and
              reviewers.
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
    </>
  );
}
