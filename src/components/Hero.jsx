import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-28 md:pb-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6
                      grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Nitish Mandal
          </h1>

          <h2 className="text-lg sm:text-xl mb-4
                         text-gray-600 dark:text-gray-300">
            Full-Stack Developer | Firebase | AI Systems
          </h2>

          <p className="mb-6 max-w-xl
                        text-gray-700 dark:text-gray-300">
            I design and deploy secure, scalable web applications using modern
            frontend frameworks, cloud platforms, and AI-powered backends.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="
                px-5 py-2 rounded font-medium
                bg-gray-900 text-white
                hover:bg-gray-800
                dark:bg-gray-100 dark:text-gray-900
                dark:hover:bg-gray-200
              "
            >
              View Projects
            </motion.a>

            <motion.a
              href="/Resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="
                px-5 py-2 rounded border
                border-gray-300 dark:border-gray-600
                text-gray-700 dark:text-gray-300
                hover:bg-gray-100 dark:hover:bg-gray-800
              "
            >
              Download Resume
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="
                px-5 py-2 rounded border
                border-gray-300 dark:border-gray-600
                text-gray-700 dark:text-gray-300
                hover:bg-gray-100 dark:hover:bg-gray-800
              "
            >
              Contact
            </motion.a>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="flex justify-center"
        >
          <img
            src="/profile.jpg"
            alt="Profile photo of Nitish Mandal"
            className="
              w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56
              rounded-full shadow-lg
            "
          />
        </motion.div>
      </div>
    </section>
  );
}
