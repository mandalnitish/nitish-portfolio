import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatedSection>
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-6"
          >
            About Me
          </motion.h2>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-700 dark:text-gray-300
                       leading-relaxed text-base sm:text-lg"
          >
            I am a Full-Stack Developer with hands-on experience in building
            production-ready web systems. I focus on clean architecture,
            secure data handling, and scalable deployments using modern
            frontend frameworks, cloud platforms, and AI-powered backends.
          </motion.p>

        </div>
      </section>
    </AnimatedSection>
  );
}
