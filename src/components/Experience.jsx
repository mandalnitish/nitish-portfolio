import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export default function Experience() {
  return (
    <AnimatedSection>
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-8"
          >
            Education & Experience
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Education */}
            <motion.div
              variants={itemVariants}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="
                p-5 rounded-lg border
                bg-white/80 dark:bg-gray-800/80
                border-gray-200 dark:border-gray-700
                text-gray-700 dark:text-gray-300
              "
            >
              <strong className="block text-gray-900 dark:text-gray-100 mb-1">
                Bachelor of Engineering (Computer)
              </strong>
              <span className="block">
                Engineering Student (Pre-final Year)
              </span>
              <span className="block text-sm text-gray-500 dark:text-gray-400">
                Government Engineering College Bharuch, Gujarat Technological University
              </span>
            </motion.div>

            {/* Experience */}
            <motion.div
              variants={itemVariants}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="
                p-5 rounded-lg border
                bg-white/80 dark:bg-gray-800/80
                border-gray-200 dark:border-gray-700
                text-gray-700 dark:text-gray-300
              "
            >
              <strong className="block text-gray-900 dark:text-gray-100 mb-1">
                Full-Stack Developer (Project Experience)
              </strong>
              <span className="block">
                Built and deployed production-ready web applications using
                React, Firebase, Vercel, Render, and AI APIs.
              </span>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </AnimatedSection>
  );
}
