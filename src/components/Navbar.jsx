import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // System theme sync
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () =>
      document.documentElement.classList.toggle("dark", mq.matches);

    applyTheme();
    mq.addEventListener("change", applyTheme);
    return () => mq.removeEventListener("change", applyTheme);
  }, []);

  // Active link + hide-on-scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Hide navbar on scroll down
      setHidden(currentY > lastScrollY && currentY > 80);
      setLastScrollY(currentY);

      // Active section detection
      const sections = document.querySelectorAll("section[id]");
      sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;

        if (currentY >= top && currentY < bottom) {
          setActive(`#${section.id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const links = [
    { href: "#projects", label: "Projects" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="
        fixed top-0 w-full z-50
        backdrop-blur-xl
        bg-white/70 dark:bg-gray-900/70
        border-b border-white/20 dark:border-gray-700
      "
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Animated Logo */}
        <motion.a
          href="#"
          onClick={() => setOpen(false)}
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="
            font-bold text-lg
            text-gray-900 dark:text-gray-100
            cursor-pointer
          "
        >
          Nitish Mandal
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 relative">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="
                relative text-sm font-medium
                text-gray-700 dark:text-gray-300
                hover:text-gray-900 dark:hover:text-gray-100
              "
            >
              {link.label}

              {/* Active indicator */}
              {active === link.href && (
                <motion.span
                  layoutId="activeLink"
                  className="
                    absolute -bottom-2 left-0 right-0 h-[2px]
                    bg-gradient-to-r from-indigo-500 to-purple-500
                    rounded-full
                  "
                />
              )}
            </a>
          ))}
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden relative w-8 h-8"
        >
          <span
            className={`absolute left-0 w-full h-[2px] bg-current transition-all
              ${open ? "top-1/2 rotate-45" : "top-2"}
            `}
          />
          <span
            className={`absolute left-0 w-full h-[2px] bg-current transition-all
              ${open ? "opacity-0" : "top-1/2"}
            `}
          />
          <span
            className={`absolute left-0 w-full h-[2px] bg-current transition-all
              ${open ? "top-1/2 -rotate-45" : "top-6"}
            `}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
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
                  className={`
                    text-sm font-medium
                    ${active === link.href
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-700 dark:text-gray-300"}
                  `}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
