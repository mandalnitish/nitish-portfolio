import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AvailabilityBadge from "./AvailabilityBadge";
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-24 border-t border-gray-200/70 dark:border-gray-700/70">
      {/* Gradient divider */}
      <div
        aria-hidden
        className="
          absolute inset-x-0 top-0 h-px
          bg-gradient-to-r
          from-transparent via-indigo-500/40 to-transparent
        "
      />

      <div
        className="
          max-w-6xl mx-auto px-4 sm:px-6 py-10
          flex flex-col sm:flex-row
          items-center justify-between gap-6
        "
      >
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
        >
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              Nitish Mandal
            </span>
            . All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-4">
            <Link
              to="/privacy-policy"
              className="hover:text-indigo-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="opacity-40">|</span>
            <Link
              to="/terms-and-conditions"
              className="hover:text-indigo-500 transition-colors"
            >
              Terms
            </Link>


            
            <AvailabilityBadge />
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
          className="flex items-center gap-6"
        >
          {/* GitHub */}
          <FooterIcon
            href="https://github.com/mandalnitish"
            label="GitHub"
            icon={
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.04c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.47-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.62-5.48 5.92.435.372.81 1.103.81 2.222v3.293c0 .322.21.694.825.576C20.565 21.796 24 17.297 24 12 24 5.37 18.63 0 12 0z" />
            }
          />

          {/* LinkedIn */}
          <FooterIcon
            href="https://www.linkedin.com/in/mandalnitish"
            label="LinkedIn"
            icon={
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.3h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.37h.04c.4-.75 1.38-1.54 2.85-1.54 3.05 0 3.61 2.01 3.61 4.62v5.55z" />
            }
          />

          {/* Resume */}
          <motion.a
            href="/Resume.pdf"
            download
            whileHover={{ y: -3 }}
            className="
              text-sm font-medium
              text-gray-600 dark:text-gray-400
              hover:text-indigo-500 dark:hover:text-indigo-400
              transition-colors
            "
          >
            Resume
          </motion.a>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
            className="
              ml-2 px-3 py-2 rounded-full
              border border-gray-300 dark:border-gray-600
              bg-white/70 dark:bg-gray-900/60
              backdrop-blur
              text-gray-700 dark:text-gray-300
              hover:shadow-lg
              transition-shadow
            "
          >
            ↑
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}

/* ---------- Reusable Icon Component ---------- */
function FooterIcon({ href, icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -3, scale: 1.05 }}
      aria-label={label}
      className="
        group relative
        w-9 h-9 flex items-center justify-center
        rounded-full
        border border-gray-300 dark:border-gray-600
        bg-white/70 dark:bg-gray-900/60
        backdrop-blur
        transition-shadow
      "
    >
      <span
        aria-hidden
        className="
          absolute inset-0 rounded-full opacity-0
          group-hover:opacity-100
          transition-opacity
          bg-gradient-to-br
          from-indigo-500/30 via-purple-500/30 to-pink-500/30
          blur
        "
      />
      <svg
        viewBox="0 0 24 24"
        className="relative w-4 h-4 fill-gray-700 dark:fill-gray-300"
      >
        {icon}
      </svg>
    </motion.a>
  );
}
