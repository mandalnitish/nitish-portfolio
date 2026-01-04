import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

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
        <h2 className="text-3xl font-bold mb-6">
          Admin Inbox
        </h2>

        <div className="space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
