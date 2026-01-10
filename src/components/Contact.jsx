import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import AnimatedSection from "./AnimatedSection";

/* ==================================================
   Helpers
================================================== */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const stepVariants = {
  initial: { opacity: 0, x: 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: { duration: 0.35, ease: "easeIn" },
  },
};

const inputMotion = {
  whileHover: { scale: 1.01 },
  whileFocus: { scale: 1.02 },
};

/* ==================================================
   Component
================================================== */

export default function Contact() {
  const reduceMotion = useReducedMotion();

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("idle");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // 🔒 honeypot
  });

  const formStartTime = useRef(Date.now()); // 🔒 timing guard

  const isEmailValid = emailRegex.test(form.email);

  const nextStep = () => setStep((s) => Math.min(s + 1, 2));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* 🔒 SPAM PROTECTION */
    if (form.company) return; // honeypot filled
    if (Date.now() - formStartTime.current < 3000) return; // too fast
    if (!isEmailValid) return;

    setStatus("sending");

    try {
      await addDoc(collection(db, "contacts"), {
        name: form.name,
        email: form.email,
        message: form.message,
        createdAt: serverTimestamp(),
      });

      setStatus("success");
      setForm({ name: "", email: "", message: "", company: "" });
      setStep(0);
      formStartTime.current = Date.now();
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatedSection>
      <section id="contact" className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Heading */}
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-4"
          >
            Contact Me
          </motion.h2>

          <p className="mb-8 text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
            Have a question, collaboration idea, or feedback? Your information is
            used only to respond to your message and is never shared.
          </p>

          {/* Form Card */}
          <motion.form
            onSubmit={handleSubmit}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="
              relative p-8 rounded-xl shadow-lg
              bg-white/80 dark:bg-gray-800/80
              border border-gray-200 dark:border-gray-700
              overflow-hidden
            "
          >
            {/* 🔒 Invisible honeypot */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] top-[-9999px]"
            />

            {/* Progress */}
            <div className="flex gap-2 mb-6">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  layout
                  className={`h-1 flex-1 rounded-full ${
                    step >= i
                      ? "bg-indigo-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              ))}
            </div>

            {/* Steps */}
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="name"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.input
                    {...inputMotion}
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded border bg-transparent focus:ring-2 focus:ring-indigo-500"
                  />

                  <div className="flex justify-end mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={nextStep}
                      disabled={!form.name}
                      className="btn-primary"
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
                  <motion.input
                    {...inputMotion}
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 rounded border bg-transparent focus:ring-2 ${
                      form.email && !isEmailValid
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-indigo-500"
                    }`}
                  />

                  {!isEmailValid && form.email && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-red-500 mt-2"
                    >
                      Please enter a valid email address.
                    </motion.p>
                  )}

                  <div className="flex justify-between mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary"
                    >
                      ← Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={nextStep}
                      disabled={!isEmailValid}
                      className="btn-primary"
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
                  <motion.textarea
                    {...inputMotion}
                    name="message"
                    rows="5"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded border bg-transparent focus:ring-2 focus:ring-indigo-500"
                  />

                  <div className="flex justify-between mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary"
                    >
                      ← Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-primary"
                    >
                      {status === "sending"
                        ? "Sending..."
                        : "Send Message"}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="
                    absolute inset-0 flex flex-col
                    items-center justify-center
                    bg-white/90 dark:bg-gray-900/90
                  "
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260 }}
                    className="text-5xl mb-4"
                  >
                    ✅
                  </motion.div>
                  <p className="font-medium text-lg">
                    Message sent successfully!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm text-red-500"
              >
                Failed to send message. Please try again.
              </motion.p>
            )}

            {/* Privacy */}
            <p className="pt-6 text-xs text-gray-500">
              Your data is stored securely for communication purposes only. See{" "}
              <a
                href="/privacy-policy"
                className="underline hover:text-indigo-500"
              >
                Privacy Policy
              </a>
              .
            </p>
          </motion.form>
        </div>
      </section>
    </AnimatedSection>
  );
}
