import { motion } from "framer-motion";

/* ==================================================
   TOGGLE AVAILABILITY HERE
================================================== */
const IS_AVAILABLE = true; // ← set false to hide badge

const STATUS_TEXT = "Open to Internships / Freelance";

export default function AvailabilityBadge() {
  if (!IS_AVAILABLE) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="inline-flex items-center gap-2"
    >
      {/* Pulsing Dot */}
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
      </span>

      {/* Badge */}
      <motion.span
        whileHover={{ scale: 1.05 }}
        className="
          px-3 py-1 rounded-full text-xs font-medium
          bg-green-100 text-green-700
          dark:bg-green-900/40 dark:text-green-300
          border border-green-300/40 dark:border-green-700/40
          cursor-default
        "
      >
        {STATUS_TEXT}
      </motion.span>
    </motion.div>
  );
}
