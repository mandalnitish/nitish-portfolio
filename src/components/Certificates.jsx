import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const certificates = [
  {
    title: "Cyber Security Quiz – Certificate of Participation",
    description:
      "Demonstrated awareness of cybersecurity fundamentals and best practices.",
  },
  {
    title: "Full-Stack Web Development (Self-Driven Projects)",
    description:
      "Hands-on experience building and deploying real-world applications using React, Firebase, and cloud platforms.",
  },
  {
    title: "AI & Chatbot Development (Project-Based Learning)",
    description:
      "Developed AI-powered chatbot systems using modern APIs and backend services.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Certificates() {
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
            Certificates
          </motion.h2>

          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {certificates.map((cert, index) => (
              <motion.li
                key={index}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? 30 : -30, // 🔁 alternate slide
                }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ y: -6, scale: 1.02 }} // ✨ hover lift
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="
                  group relative overflow-hidden rounded-2xl p-6
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
                  <strong className="block text-lg text-gray-900 dark:text-gray-100 mb-1">
                    {cert.title}
                  </strong>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

        </div>
      </section>
    </AnimatedSection>
  );
}
