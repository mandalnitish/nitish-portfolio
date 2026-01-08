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
  hidden: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? 30 : -30, // alternating right / left
  }),
  visible: {
    opacity: 1,
    x: 0,
  },
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

          {/* Paragraph */}
          <motion.p
            custom={0}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.4, ease: "easeOut" }}
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
            className="space-y-4"
          >
            {[
              "Strong foundation in React, JavaScript, and modern UI design",
              "Hands-on experience with Firebase, MongoDB, and REST APIs",
              "Experience deploying applications to production",
              "Comfortable working with real users and real data",
            ].map((item, index) => (
              <motion.li
                key={index}
                custom={index}
                variants={itemVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="
                  group relative overflow-hidden
                  pl-5 py-3 rounded-xl
                  border-l-2
                  border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-300
                  hover:shadow-md
                  transition-all
                  cursor-default
                "
              >
                {/* Gradient hover overlay */}
                <span
                  aria-hidden
                  className="
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    bg-gradient-to-r
                    from-indigo-500/10 via-purple-500/10 to-pink-500/10
                  "
                />

                <span className="relative z-10">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>

        </div>
      </section>
    </AnimatedSection>
  );
}
