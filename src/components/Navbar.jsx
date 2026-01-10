import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  /* -------------------- State -------------------- */
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  /* -------------------- System theme sync -------------------- */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () =>
      document.documentElement.classList.toggle("dark", mq.matches);

    applyTheme();
    mq.addEventListener("change", applyTheme);

    return () => mq.removeEventListener("change", applyTheme);
  }, []);

  /* -------------------- Scroll logic -------------------- */
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Hide navbar on scroll down
      setHidden(currentY > lastScrollY.current && currentY > 80);
      lastScrollY.current = currentY;

      // Active section detection
      document.querySelectorAll("section[id]").forEach((section) => {
        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;

        if (currentY >= top && currentY < bottom) {
          setActive(`#${section.id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* -------------------- Navigation helpers -------------------- */
  const goToSection = (id) => {
    setOpen(false);
    navigate("/");

    setTimeout(() => {
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActive(id);
      }
    }, 80);
  };

  const scrollHome = () => {
    setOpen(false);
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* -------------------- Nav links -------------------- */
  const links = [
    { id: "#projects", label: "Projects" },
    { id: "#blog", label: "Blog" },
    { id: "#contact", label: "Contact" },
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
      {/* -------------------- Navbar Container -------------------- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* -------------------- Logo -------------------- */}
        <motion.button
          onClick={scrollHome}
          aria-label="Go to homepage"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          className="
            relative flex items-center
            bg-transparent focus:outline-none
            group
          "
        >
          {/* Glow */}
          <span
            aria-hidden
            className="
              absolute inset-0 rounded-xl
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              bg-gradient-to-br
              from-indigo-500/30 via-purple-500/30 to-pink-500/30
              blur-lg
            "
          />

          {/* Logo image */}
          <img
            src="/logo.png"
            alt="Nitish Mandal logo"
            className="
              relative z-10
              h-8 sm:h-9 md:h-10
              w-auto
              dark:invert
              select-none
              pointer-events-none
            "
          />
        </motion.button>

        {/* -------------------- Desktop Menu -------------------- */}
        <div className="hidden md:flex items-center gap-8 relative">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => goToSection(link.id)}
              className="
                relative text-sm font-medium
                text-gray-700 dark:text-gray-300
                hover:text-gray-900 dark:hover:text-gray-100
              "
            >
              {link.label}

              {active === link.id && (
                <motion.span
                  layoutId="activeLink"
                  className="
                    absolute -bottom-2 left-0 right-0 h-[2px]
                    bg-gradient-to-r from-indigo-500 to-purple-500
                    rounded-full
                  "
                />
              )}
            </button>
          ))}
        </div>

        {/* -------------------- Hamburger -------------------- */}
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

      {/* -------------------- Mobile Menu -------------------- */}
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
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => goToSection(link.id)}
                  className={`
                    text-sm font-medium text-left
                    ${
                      active === link.id
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-700 dark:text-gray-300"
                    }
                  `}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
