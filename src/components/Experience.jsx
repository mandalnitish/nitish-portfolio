import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function Experience() {
  return (
    <AnimatedSection>
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-12"
          >
            Experience
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              viewport={{ once: true }}
              className="
                group relative overflow-hidden rounded-2xl p-7
                bg-white/70 dark:bg-gray-900/60
                backdrop-blur border
                border-gray-200/70 dark:border-gray-700/70
                shadow-sm hover:shadow-lg
                transition-shadow
                cursor-default
              "
            >
              {/* Hover Gradient */}
              <div
                aria-hidden
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  bg-gradient-to-br
                  from-indigo-500/15 via-purple-500/15 to-pink-500/15
                "
              />

              <div className="relative z-10">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  Education
                </span>
                <h3 className="text-xl font-semibold mt-2 mb-2">
                  Bachelor of Engineering (Computer)
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Engineering Student (Pre-final Year)
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Government Engineering College Bharuch · GTU
                </p>
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              viewport={{ once: true }}
              className="
                group relative overflow-hidden rounded-2xl p-7
                bg-white/70 dark:bg-gray-900/60
                backdrop-blur border
                border-gray-200/70 dark:border-gray-700/70
                shadow-sm hover:shadow-lg
                transition-shadow
                cursor-default
              "
            >
              {/* Hover Gradient */}
              <div
                aria-hidden
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  bg-gradient-to-br
                  from-indigo-500/15 via-purple-500/15 to-pink-500/15
                "
              />

              <div className="relative z-10">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  Development
                </span>
                <h3 className="text-xl font-semibold mt-2 mb-2">
                  Full-Stack Developer
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Built and deployed production-ready applications using React,
                  Firebase, Vercel, Render, and AI APIs.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>
    </AnimatedSection>
  );
}
