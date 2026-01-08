import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import AnimatedSection from "./AnimatedSection";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const reduceMotion = useReducedMotion();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await addDoc(collection(db, "contacts"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("Failed to send message.");
    }
  };

  return (
    <AnimatedSection>
      <section id="contact" className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Heading (unchanged) */}
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-8"
          >
            Contact Me
          </motion.h2>

          {/* Form Card → FROM RIGHT */}
          <motion.form
            onSubmit={handleSubmit}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: 40 }   // ✅ changed
            }
            whileInView={{ opacity: 1, x: 0 }} // ✅ changed
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="
              space-y-5 p-8 rounded-xl shadow-lg
              bg-white/80 dark:bg-gray-800/80
              border border-gray-200 dark:border-gray-700
            "
          >
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="
                w-full p-3 rounded border bg-transparent
                text-gray-900 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-400
                border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="
                w-full p-3 rounded border bg-transparent
                text-gray-900 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-400
                border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />

            <textarea
              name="message"
              id="message"
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              autoComplete="off"
              className="
                w-full p-3 rounded border bg-transparent
                text-gray-900 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-400
                border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="
                px-6 py-2 rounded font-medium
                bg-gray-900 text-white
                hover:bg-gray-800
                dark:bg-gray-100 dark:text-gray-900
                dark:hover:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-gray-500 dark:focus:ring-offset-gray-900
              "
            >
              Send Message
            </motion.button>

            {status && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                {status}
              </motion.p>
            )}
          </motion.form>
        </div>
      </section>
    </AnimatedSection>
  );
}
