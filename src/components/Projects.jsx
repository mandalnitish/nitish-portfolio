import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const card = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { y: -8 },
};

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
            {/* ODMS */}
            <motion.div
              variants={card}
              initial="initial"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: "easeOut" }}
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
              <a
                href="https://odms.nitishmandal.site"
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 z-10"
                aria-label="Open ODMS Live Project"
              />

              {/* Gradient Hover */}
              <div
                aria-hidden
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  transition-opacity
                  bg-gradient-to-br
                  from-indigo-500/10 via-purple-500/10 to-pink-500/10
                "
              />

              <div className="relative z-20">
                <h3 className="text-xl font-semibold mb-2">ODMS</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Organ Donor Management System — secure, role-based platform
                  built with React, Firebase, and cloud deployment.
                </p>
                <span className="inline-flex items-center gap-2 font-medium">
                  View Live
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </motion.div>

            {/* NixBot */}
            <motion.div
              variants={card}
              initial="initial"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
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
              <a
                href="https://nixbot.nitishmandal.site"
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 z-10"
                aria-label="Open NixBot Live Project"
              />

              <div
                aria-hidden
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  transition-opacity
                  bg-gradient-to-br
                  from-indigo-500/10 via-purple-500/10 to-pink-500/10
                "
              />

              <div className="relative z-20">
                <h3 className="text-xl font-semibold mb-2">NixBot</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  AI-powered chatbot platform with authentication, APIs,
                  and cloud-hosted services.
                </p>
                <span className="inline-flex items-center gap-2 font-medium">
                  View Live
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
