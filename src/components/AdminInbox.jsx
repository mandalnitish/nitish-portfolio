import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import AdminLogoutButton from "./AdminLogoutButton";
import {
  FiSearch,
  FiMail,
  FiClock,
  FiSend,
  FiUser,
} from "react-icons/fi";

import ReplyModal from "./ReplyModal";

export default function AdminInbox() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyOpen, setReplyOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const q = query(collection(db,"contacts"),orderBy("createdAt","desc"));
        const snap = await getDocs(q);
        setMessages(snap.docs.map(d=>({id:d.id,...d.data()})));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(()=>{
    return messages.filter(m=>{
      const t=`${m.name} ${m.email} ${m.message}`.toLowerCase();
      return t.includes(search.toLowerCase());
    });
  },[messages,search]);

  const today = messages.filter(m=>{
    if(!m.createdAt) return false;
    return m.createdAt.toDate().toDateString()===new Date().toDateString();
  }).length;

  const initials=(n="")=>n.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase();

  const fmt=t=>t? t.toDate().toLocaleString(): "";

  const handleReply = (msg) => {
  setSelectedMessage(msg);
  setReplyOpen(true);
};

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">Manage contact messages</p>
          </div>
          <AdminLogoutButton />
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="rounded-2xl p-6 text-white bg-gradient-to-r from-indigo-600 to-purple-600">
            <FiMail size={28}/>
            <div className="mt-3 text-sm">Total Messages</div>
            <div className="text-4xl font-bold">{messages.length}</div>
          </div>
          <div className="rounded-2xl p-6 text-white bg-gradient-to-r from-emerald-500 to-teal-600">
            <FiClock size={28}/>
            <div className="mt-3 text-sm">Today's Messages</div>
            <div className="text-4xl font-bold">{today}</div>
          </div>
        </div>

        <div className="relative mb-8">
          <FiSearch className="absolute left-4 top-4 text-gray-400"/>
          <input
            className="w-full rounded-xl border pl-12 pr-4 py-3 dark:bg-gray-900"
            placeholder="Search..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center py-16">Loading...</div>
        ) : (
          <div className="space-y-5">
            {filtered.map((msg,i)=>(
              <motion.div
                key={msg.id}
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                transition={{delay:i*0.05}}
                className="bg-white dark:bg-gray-900 rounded-2xl border p-6 shadow"
              >
                <div className="flex justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                      {msg.name ? initials(msg.name):<FiUser/>}
                    </div>
                    <div>
                      <h2 className="font-bold">{msg.name}</h2>
                      <p className="text-gray-500">{msg.email}</p>
                      <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
                        <FiClock/>{fmt(msg.createdAt)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={()=>handleReply(msg)}
                    className="px-4 py-2 h-fit rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
                  >
                    <FiSend/> Reply
                  </button>
                </div>

                <div className="mt-5 rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
                  {msg.message}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    <ReplyModal
  open={replyOpen}
  message={selectedMessage}
  onClose={() => {
    setReplyOpen(false);
    setSelectedMessage(null);
  }}
  onSend={() => {
    // Optional: refresh messages or show toast
  }}
/>
    </section>
  );
}
