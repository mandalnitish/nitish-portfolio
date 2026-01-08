import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import AdminLogoutButton from "./AdminLogoutButton";

export default function AdminInbox() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const load = async () => {
      const q = query(
        collection(db, "contacts"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">
            Admin Inbox
          </h2>

          <AdminLogoutButton />
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? 30 : -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              viewport={{ once: true }}
              className="
                border rounded p-4
                bg-white/80 dark:bg-gray-800/80
                border-gray-200 dark:border-gray-700
              "
            >
              <p className="font-semibold">
                {msg.name} ({msg.email})
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {msg.createdAt?.toDate().toLocaleString()}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {msg.message}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
