import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const stepVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.35, ease: "easeIn" } },
};

export default function ContactPage() {
  const reduceMotion = useReducedMotion();

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("idle");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });

  // ✅ Consent checkbox (AdSense-friendly)
  const [consent, setConsent] = useState(false);

  const formStartTime = useRef(Date.now());
  const isEmailValid = emailRegex.test(form.email);

  const nextStep = () => setStep((s) => Math.min(s + 1, 2));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetAll = () => {
    setStatus("idle");
    setForm({ name: "", email: "", message: "", company: "" });
    setConsent(false);
    setStep(0);
    formStartTime.current = Date.now();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // spam protection
    if (form.company) return; // bot filled honeypot
    if (Date.now() - formStartTime.current < 3000) return; // too fast
    if (!isEmailValid) return;

    // ✅ must accept consent
    if (!consent) return;

    setStatus("sending");

    try {
      await addDoc(collection(db, "contacts"), {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        message: form.message.trim(),
        createdAt: serverTimestamp(),
        source: "portfolio_contact_form",
      });

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-16"
    >
      <header>
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold tracking-tight"
        >
          Contact
        </motion.h1>

        {/* ✅ Strong, visible disclosure for AdSense reviewers */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-4 text-sm text-slate-600 dark:text-gray-300 max-w-3xl space-y-2"
        >
          <p>
            You can reach me using this form or email me directly at{" "}
            <a
              href="mailto:nitishmandal367@gmail.com"
              className="underline hover:text-indigo-500"
            >
              nitishmandal367@gmail.com
            </a>
            .
          </p>

          <p>
            <span className="font-semibold">Data notice:</span> When you submit this
            form, I store your <span className="font-medium">name</span>,{" "}
            <span className="font-medium">email</span>, and{" "}
            <span className="font-medium">message</span> in Firebase Firestore only to
            respond to you. I do not sell or share this data. You can request deletion
            anytime via email. See{" "}
            <Link to="/privacy-policy" className="underline hover:text-indigo-500">
              Privacy Policy
            </Link>
            .
          </p>

          <p className="text-xs text-slate-500 dark:text-gray-400">
            For security, this form uses basic anti-spam checks (honeypot + minimum
            time-on-form).
          </p>
        </motion.div>
      </header>

      <motion.form
        onSubmit={handleSubmit}
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="
          mt-8 relative overflow-hidden
          rounded-2xl p-8
          bg-white/80 dark:bg-gray-900/70
          backdrop-blur border
          border-gray-200/70 dark:border-gray-700/70
          shadow-sm
        "
      >
        {/* honeypot */}
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] top-[-9999px]"
        />

        {/* Progress */}
        <div className="flex gap-2 mb-6" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full ${
                step >= i ? "bg-indigo-500" : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="name"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-200">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-2 w-full p-3 rounded-xl border border-black/10 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <div className="flex justify-end mt-6">
                <motion.button
                  whileHover={reduceMotion ? {} : { scale: 1.03 }}
                  whileTap={reduceMotion ? {} : { scale: 0.97 }}
                  type="button"
                  onClick={nextStep}
                  disabled={!form.name.trim()}
                  className="rounded-xl px-5 py-2 text-sm font-medium bg-indigo-600 text-white disabled:opacity-50"
                >
                  Next →
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="email"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className={`mt-2 w-full p-3 rounded-xl border bg-transparent outline-none focus:ring-2 ${
                  form.email && !isEmailValid
                    ? "border-red-500 focus:ring-red-400"
                    : "border-black/10 dark:border-white/10 focus:ring-indigo-500"
                }`}
              />
              {!isEmailValid && form.email && (
                <p className="text-xs text-red-500 mt-2">
                  Please enter a valid email address.
                </p>
              )}

              <div className="flex justify-between mt-6">
                <motion.button
                  whileHover={reduceMotion ? {} : { scale: 1.03 }}
                  whileTap={reduceMotion ? {} : { scale: 0.97 }}
                  type="button"
                  onClick={prevStep}
                  className="rounded-xl px-5 py-2 text-sm font-medium border border-black/10 dark:border-white/10"
                >
                  ← Back
                </motion.button>
                <motion.button
                  whileHover={reduceMotion ? {} : { scale: 1.03 }}
                  whileTap={reduceMotion ? {} : { scale: 0.97 }}
                  type="button"
                  onClick={nextStep}
                  disabled={!isEmailValid}
                  className="rounded-xl px-5 py-2 text-sm font-medium bg-indigo-600 text-white disabled:opacity-50"
                >
                  Next →
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="message"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-200">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                placeholder="Tell me what you want to build or improve…"
                value={form.message}
                onChange={handleChange}
                required
                className="mt-2 w-full p-3 rounded-xl border border-black/10 dark:border-white/10 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {/* ✅ explicit consent */}
              <label className="mt-4 flex items-start gap-3 text-xs text-slate-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1"
                  required
                />
                <span>
                  I consent to storing my submitted information to receive a response.
                  See{" "}
                  <Link to="/privacy-policy" className="underline hover:text-indigo-500">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <div className="flex justify-between mt-6">
                <motion.button
                  whileHover={reduceMotion ? {} : { scale: 1.03 }}
                  whileTap={reduceMotion ? {} : { scale: 0.97 }}
                  type="button"
                  onClick={prevStep}
                  className="rounded-xl px-5 py-2 text-sm font-medium border border-black/10 dark:border-white/10"
                >
                  ← Back
                </motion.button>

                <motion.button
                  whileHover={reduceMotion ? {} : { scale: 1.03 }}
                  whileTap={reduceMotion ? {} : { scale: 0.97 }}
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-xl px-5 py-2 text-sm font-medium bg-indigo-600 text-white disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </motion.button>
              </div>

              {status === "error" && (
                <p className="mt-4 text-sm text-red-500">
                  Failed to send message. Please try again.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success overlay */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="
                absolute inset-0 flex flex-col items-center justify-center text-center
                bg-white/90 dark:bg-gray-900/90
                px-6
              "
            >
              <div className="text-4xl mb-4" aria-hidden>
                ✓
              </div>
              <p className="font-semibold text-lg">Message sent successfully</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-gray-300 max-w-md">
                Thanks for reaching out. I will reply to your email as soon as possible.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={resetAll}
                  className="rounded-xl px-5 py-2 text-sm font-medium bg-indigo-600 text-white"
                >
                  Send another message
                </button>
                <Link
                  to="/"
                  className="rounded-xl px-5 py-2 text-sm font-medium border border-black/10 dark:border-white/10"
                >
                  Back to Home
                </Link>
              </div>

              <div className="mt-6 text-xs text-slate-500 dark:text-gray-400">
                Policy links:{" "}
                <Link to="/privacy-policy" className="underline hover:text-indigo-500">
                  Privacy Policy
                </Link>{" "}
                •{" "}
                <Link
                  to="/terms-and-conditions"
                  className="underline hover:text-indigo-500"
                >
                  Terms
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.section>
  );
}
