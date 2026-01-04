import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const skills = [
  "React & Tailwind CSS",
  "Node.js & Express",
  "Firebase (Auth, Firestore, Hosting)",
  "MongoDB",
  "Vercel & Render Deployment",
  "AI APIs & Chatbot Systems",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function Skills() {
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
            Skills
          </motion.h2>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {skills.map((skill, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                className="
                  px-4 py-3 rounded-lg border
                  bg-white/80 dark:bg-gray-800/80
                  border-gray-200 dark:border-gray-700
                  text-gray-700 dark:text-gray-300
                  cursor-default
                "
              >
                {skill}
              </motion.li>
            ))}
          </motion.ul>

        </div>
      </section>
    </AnimatedSection>
  );
}
