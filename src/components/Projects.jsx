import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const cardVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  hover: {
    y: -6,
    scale: 1.02,
  },
};

export default function Projects() {
  return (
    <AnimatedSection>
      <section id="projects" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">
            Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Project Card 1 */}
            <motion.div
              variants={cardVariants}
              initial="initial"
              whileInView="visible"
              whileHover="hover"
              transition={{ duration: 0.35, ease: "easeOut" }}
              viewport={{ once: true }}
              className="
                border rounded-xl p-6
                bg-white/80 dark:bg-gray-800/80
                border-gray-200 dark:border-gray-700
                shadow-sm hover:shadow-lg
                transition-shadow
              "
            >
              <h3 className="text-xl font-semibold mb-2">
                ODMS
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Organ Donor Management System – a secure, role-based web platform
                built with React, Firebase, and cloud deployment.
              </p>
              <a
                href="https://odms.nitishmandal.site"
                target="_blank"
                rel="noreferrer"
                className="inline-block font-medium
                           text-gray-900 dark:text-gray-100
                           hover:underline"
              >
                Live Project →
              </a>
            </motion.div>

            {/* Project Card 2 */}
            <motion.div
              variants={cardVariants}
              initial="initial"
              whileInView="visible"
              whileHover="hover"
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
              viewport={{ once: true }}
              className="
                border rounded-xl p-6
                bg-white/80 dark:bg-gray-800/80
                border-gray-200 dark:border-gray-700
                shadow-sm hover:shadow-lg
                transition-shadow
              "
            >
              <h3 className="text-xl font-semibold mb-2">
                NixBot
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                AI-powered chatbot platform with authentication, backend APIs,
                and cloud-hosted frontend and services.
              </p>
              <a
                href="https://nixbot.nitishmandal.site"
                target="_blank"
                rel="noreferrer"
                className="inline-block font-medium
                           text-gray-900 dark:text-gray-100
                           hover:underline"
              >
                Live Project →
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
