import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);
  const location = useLocation();
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

  /* -------------------- Scroll hide navbar -------------------- */
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastScrollY.current && currentY > 80);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const goHome = () => {
    setOpen(false);
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/skills", label: "Skills" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  const linkClass = ({ isActive }) =>
    `
      relative text-sm font-medium
      text-gray-700 dark:text-gray-300
      hover:text-gray-900 dark:hover:text-gray-100
    `;

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
        {/* Logo */}
        <motion.button
          onClick={goHome}
          aria-label="Go to homepage"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.06 }}
          className="relative flex items-center bg-transparent focus:outline-none group"
        >
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
          <img
            src="/logo.png"
            alt="Nitish Mandal logo"
            className="relative z-10 h-8 sm:h-9 md:h-10 w-auto dark:invert select-none pointer-events-none"
          />
        </motion.button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 relative">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeLink"
                      className="
                        absolute -bottom-2 left-0 right-0 h-[2px]
                        bg-gradient-to-r from-indigo-500 to-purple-500
                        rounded-full
                      "
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Hamburger */}
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
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `text-sm font-medium text-left ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
