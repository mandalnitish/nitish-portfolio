import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

/* ==================================================
   TOGGLE: iframe preview ON / OFF
================================================== */
const ENABLE_IFRAME_PREVIEW = true;

/* ==================================================
   Animations
================================================== */
const card = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { y: -8 },
};

/* ==================================================
   Projects Data
================================================== */
const PROJECTS = [
  {
    key: "odms",
    title: "ODMS",
    description:
      "Organ Donor Management System — secure, role-based platform built with React, Firebase, and cloud deployment.",
    liveUrl: "https://odms.nitishmandal.site",
    githubRepo: "mandalnitish/organ-donor-management-system",
    tech: ["React", "Firebase", "Tailwind"],
  },
  {
    key: "nixbot",
    title: "NixBot",
    description:
      "AI-powered chatbot platform with authentication, APIs, and cloud-hosted services.",
    liveUrl: "https://nixbot.nitishmandal.site",
    githubRepo: "mandalnitish/nixbot",
    tech: ["React", "API", "AI"],
  },
];

/* ==================================================
   MAIN COMPONENT (UNCHANGED STRUCTURE)
================================================== */

export default function Projects() {
  return (
    <AnimatedSection>
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-12"
          >
            Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.key}
                project={project}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

/* ==================================================
   PROJECT CARD (iframe hover preview fixed)
================================================== */

function ProjectCard({ project, delay }) {
  const [stats, setStats] = useState(null);

  /* GitHub stats */
  useEffect(() => {
    fetch(`https://api.github.com/repos/${project.githubRepo}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data?.stargazers_count) return;
        setStats({
          stars: data.stargazers_count,
          forks: data.forks_count,
        });
      })
      .catch(() => null);
  }, [project.githubRepo]);

  return (
    <motion.div
      variants={card}
      initial="initial"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
      className="
        group relative overflow-hidden
        rounded-2xl p-7
        bg-white/70 dark:bg-gray-900/60
        backdrop-blur border
        border-gray-200/70 dark:border-gray-700/70
        shadow-sm
        cursor-pointer
      "
    >
      {/* Click-through */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 z-20"
        aria-label={`Open ${project.title} live`}
      />

      {/* ---------- IFRAME PREVIEW (WORKING) ---------- */}
      {ENABLE_IFRAME_PREVIEW && (
        <div
          className="
            absolute inset-0 z-0
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300
            overflow-hidden
          "
        >
          <iframe
            src={project.liveUrl}
            title={`${project.title} preview`}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin"
            className="
              w-full h-full
              scale-[0.92]
              pointer-events-none
            "
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Gradient fallback */}
      <div
        aria-hidden
        className="
          absolute inset-0 opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
          bg-gradient-to-br
          from-indigo-500/10 via-purple-500/10 to-pink-500/10
        "
      />

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-2">
          {project.title}
        </h3>

        <p className="mb-4 text-gray-700 dark:text-gray-300">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {project.tech.map((t) => (
            <span
              key={t}
              className="
                text-xs px-2 py-1 rounded-full
                bg-indigo-100 dark:bg-indigo-900
                text-indigo-600 dark:text-indigo-300
              "
            >
              {t}
            </span>
          ))}
        </div>

        {stats && (
          <div className="flex gap-4 text-xs text-gray-500 mb-3">
            <span>⭐ {stats.stars}</span>
            <span>🍴 {stats.forks}</span>
          </div>
        )}

        <span className="inline-flex items-center gap-2 font-medium">
          View Live
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </motion.div>
  );
}
