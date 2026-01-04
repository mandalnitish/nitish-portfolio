import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Apply system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applySystemTheme = () => {
      document.documentElement.classList.toggle(
        "dark",
        mediaQuery.matches
      );
    };

    // Apply on load
    applySystemTheme();

    // Listen to system theme changes
    mediaQuery.addEventListener("change", applySystemTheme);
    return () => mediaQuery.removeEventListener("change", applySystemTheme);
  }, []);

  const links = [
    { href: "#projects", label: "Projects" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className="
        fixed top-0 w-full z-50
        bg-white dark:bg-gray-900
        border-b border-gray-200 dark:border-gray-700
        transition-colors duration-300
      "
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
          Nitish Mandal
        </span>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-700 dark:text-gray-300
                         hover:text-gray-900 dark:hover:text-gray-100"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden text-gray-800 dark:text-gray-100"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
              md:hidden overflow-hidden
              bg-white dark:bg-gray-900
              border-t border-gray-200 dark:border-gray-700
            "
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-gray-700 dark:text-gray-300
                             hover:text-gray-900 dark:hover:text-gray-100"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
