import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
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
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <span className="absolute -left-[25px] top-2 w-4 h-4 rounded-full
                               bg-gray-900 dark:bg-gray-100"></span>

              <h3 className="text-lg sm:text-xl font-semibold">
                Bachelor of Engineering (Computer)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Government Engineering College Bharuch, GTU
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                2023 – 2027
              </p>
            </motion.div>

            {/* Item 2 */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.4, delay: 0.05 }}
              viewport={{ once: true }}
              className="relative"
            >
              <span className="absolute -left-[25px] top-2 w-4 h-4 rounded-full
                               bg-gray-900 dark:bg-gray-100"></span>

              <h3 className="text-lg sm:text-xl font-semibold">
                Higher Secondary Education (Class XII)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                GSEB – Science Stream (PCM)
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                2022 – 2023
              </p>
            </motion.div>

            {/* Item 3 */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <span className="absolute -left-[25px] top-2 w-4 h-4 rounded-full
                               bg-gray-900 dark:bg-gray-100"></span>

              <h3 className="text-lg sm:text-xl font-semibold">
                Secondary Education (Class X)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                GSEB
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Completed 2021
              </p>
            </motion.div>

          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
