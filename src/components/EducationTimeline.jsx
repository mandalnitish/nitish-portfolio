import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const itemVariants = {
  hidden: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? 30 : -30, // alternating right / left
  }),
  visible: {
    opacity: 1,
    x: 0,
  },
};

export default function EducationTimeline() {
  return (
    <AnimatedSection>
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-12"
          >
            Education
          </motion.h2>

          {/* Timeline */}
          <div className="relative pl-10 border-l-2 border-gray-400/40 dark:border-gray-600/60 space-y-12">

            {/* Item 1 */}
            <motion.div
              custom={0}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="
                group relative
                rounded-xl p-4
                transition-shadow
                hover:shadow-md
                cursor-default
              "
            >
              {/* Timeline dot */}
              <span
                className="
                  absolute -left-[25px] top-6
                  w-4 h-4 rounded-full
                  bg-gray-900 dark:bg-gray-100
                  transition-transform
                  group-hover:scale-125
                "
              />

              {/* Hover glow */}
              <div
                aria-hidden
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  bg-gradient-to-br
                  from-indigo-500/10 via-purple-500/10 to-pink-500/10
                  rounded-xl
                "
              />

              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-semibold">
                  Bachelor of Engineering (Computer)
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Government Engineering College Bharuch, GTU
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  2023 – 2027
                </p>
              </div>
            </motion.div>

            {/* Item 2 */}
            <motion.div
              custom={1}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
              viewport={{ once: true }}
              className="
                group relative
                rounded-xl p-4
                transition-shadow
                hover:shadow-md
                cursor-default
              "
            >
              <span
                className="
                  absolute -left-[25px] top-6
                  w-4 h-4 rounded-full
                  bg-gray-900 dark:bg-gray-100
                  transition-transform
                  group-hover:scale-125
                "
              />

              <div
                aria-hidden
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  bg-gradient-to-br
                  from-indigo-500/10 via-purple-500/10 to-pink-500/10
                  rounded-xl
                "
              />

              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-semibold">
                  Higher Secondary Education (Class XII)
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  GSEB – Science Stream (PCM)
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  2022 – 2023
                </p>
              </div>
            </motion.div>

            {/* Item 3 */}
            <motion.div
              custom={2}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
              className="
                group relative
                rounded-xl p-4
                transition-shadow
                hover:shadow-md
                cursor-default
              "
            >
              <span
                className="
                  absolute -left-[25px] top-6
                  w-4 h-4 rounded-full
                  bg-gray-900 dark:bg-gray-100
                  transition-transform
                  group-hover:scale-125
                "
              />

              <div
                aria-hidden
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  bg-gradient-to-br
                  from-indigo-500/10 via-purple-500/10 to-pink-500/10
                  rounded-xl
                "
              />

              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-semibold">
                  Secondary Education (Class X)
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  GSEB
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completed 2021
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
