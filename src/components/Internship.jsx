import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export default function Internship() {
  return (
    <AnimatedSection>
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-6"
          >
            Internship & Career Goals
          </motion.h2>

          <motion.p
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            I am actively seeking internship opportunities in Full-Stack
            Development, Web Engineering, or Software Development roles, where I
            can apply my skills to real-world problems and learn from industry
            professionals.
          </motion.p>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {[
              "Strong foundation in React, JavaScript, and modern UI design",
              "Hands-on experience with Firebase, MongoDB, and REST APIs",
              "Experience deploying applications to production",
              "Comfortable working with real users and real data",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                className="
                  pl-4 border-l-2
                  border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-300
                "
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>

        </div>
      </section>
    </AnimatedSection>
  );
}
