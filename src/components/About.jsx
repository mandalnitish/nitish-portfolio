import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatedSection>
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Heading */}
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-6"
          >
            About Me
          </motion.h2>

          {/* About Card */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={reduceMotion ? {} : { y: -6, scale: 1.02 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="
              group relative overflow-hidden
              rounded-2xl p-6
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

            <motion.p
              className="
                relative z-10
                text-gray-700 dark:text-gray-300
                leading-relaxed text-base sm:text-lg
              "
            >
              I am a Computer Engineering student and Full-Stack Developer with
              hands-on experience in building real-world web applications. I
              enjoy working on clean UI design, secure data handling, and
              scalable deployments using modern frontend frameworks, cloud
              platforms, and AI-powered systems.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </AnimatedSection>
  );
}
