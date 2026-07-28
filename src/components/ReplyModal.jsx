import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSend, FiLoader } from "react-icons/fi";

export default function ReplyModal({
  open,
  message,
  onClose,
  onSend,
}) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open && message) {
      setSubject("Re: Thank you for contacting me");

      setBody(`Hello ${message.name || ""},

Thank you for contacting me.

I appreciate your message and will get back to you shortly.

Best regards,
Nitish Mandal

https://www.nitishmandal.site`);
    }
  }, [open, message]);

  if (!open || !message) return null;

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) {
      alert("Please enter both subject and message.");
      return;
    }

    try {
      setSending(true);

      // Use Vercel API while developing locally
      const API = import.meta.env.DEV
        ? "https://nitish-portfolio-xi-ten.vercel.app/api/sendReply"
        : "/api/sendReply";

      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: message.email,
          subject,
          message: body,
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message || `Server Error (${response.status})`
        );
      }

      if (!data.success) {
        throw new Error(
          data.message || "Unable to send email."
        );
      }

      // Optional callback
      if (onSend) {
        onSend({
          to: message.email,
          subject,
          body,
        });
      }

      // Clear form
      setSubject("");
      setBody("");

      // Close modal
      onClose();

      // Success
      alert("✅ Email sent successfully.");

    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to send email.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-6">
            <div>
              <h2 className="text-2xl font-bold">
                Reply to Message
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                <strong>To:</strong> {message.email}
              </p>
            </div>

            <button
              onClick={onClose}
              disabled={sending}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              <FiX size={22} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">

            <div>
              <label className="block mb-2 font-medium">
                Subject
              </label>

              <input
                type="text"
                value={subject}
                disabled={sending}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Message
              </label>

              <textarea
                rows={10}
                value={body}
                disabled={sending}
                onChange={(e) => setBody(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 p-3 resize-none bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-3">

              <button
                onClick={onClose}
                disabled={sending}
                className="px-6 py-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSend}
                disabled={sending}
                className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white flex items-center gap-2"
              >
                {sending ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send Reply
                  </>
                )}
              </button>

            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}