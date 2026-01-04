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

export default function Certificates() {
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
            Certificates
          </motion.h2>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {certificates.map((cert, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                className="
                  p-5 rounded-lg border
                  bg-white/80 dark:bg-gray-800/80
                  border-gray-200 dark:border-gray-700
                  text-gray-700 dark:text-gray-300
                "
              >
                <strong className="block text-gray-900 dark:text-gray-100 mb-1">
                  {cert.title}
                </strong>
                <span className="text-sm leading-relaxed">
                  {cert.description}
                </span>
              </motion.li>
            ))}
          </motion.ul>

        </div>
      </section>
    </AnimatedSection>
  );
}
