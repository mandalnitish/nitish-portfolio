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

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? 30 : -30, // ✅ left / right
  }),
  visible: {
    opacity: 1,
    x: 0,
  },
};

export default function Skills() {
  return (
    <AnimatedSection>
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-10"
          >
            Skills
          </motion.h2>

          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.li
                key={index}
                custom={index}
                variants={item}
                transition={{ duration: 0.35, ease: "easeOut" }}
                whileHover={{ y: -6, scale: 1.03 }}
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
                {/* Gradient Hover Layer */}
                <div
                  aria-hidden
                  className="
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    bg-gradient-to-br
                    from-indigo-500/10 via-purple-500/10 to-pink-500/10
                  "
                />

                <span className="relative font-medium text-gray-800 dark:text-gray-200">
                  {skill}
                </span>
              </motion.li>
            ))}
          </motion.ul>

        </div>
      </section>
    </AnimatedSection>
  );
}
