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
  FiInbox,
} from "react-icons/fi";

import ReplyModal from "./ReplyModal";

const AVATAR_PALETTES = [
  "from-indigo-500 to-violet-600",
  "from-rose-500 to-orange-500",
  "from-emerald-500 to-teal-600",
  "from-sky-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
  "from-amber-500 to-orange-600",
];

function paletteFor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_PALETTES[Math.abs(hash) % AVATAR_PALETTES.length];
}

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
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 sm:mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Admin
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Inbox
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Manage incoming contact messages
            </p>
          </div>
          <div className="self-end sm:self-auto">
            <AdminLogoutButton />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-8">
          <motion.div
            initial={{opacity:0,y:12}}
            animate={{opacity:1,y:0}}
            className="relative overflow-hidden rounded-2xl p-4 sm:p-6 text-white bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 shadow-lg shadow-indigo-600/20"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
            <div className="relative flex items-center justify-between">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <FiMail size={18} />
              </div>
            </div>
            <div className="relative mt-4 sm:mt-5 text-[11px] sm:text-sm uppercase tracking-wide opacity-80">
              Total Messages
            </div>
            <div className="relative text-2xl sm:text-4xl font-extrabold">{messages.length}</div>
          </motion.div>

          <motion.div
            initial={{opacity:0,y:12}}
            animate={{opacity:1,y:0}}
            transition={{delay:0.05}}
            className="relative overflow-hidden rounded-2xl p-4 sm:p-6 text-white bg-gradient-to-br from-emerald-500 via-emerald-500 to-teal-600 shadow-lg shadow-emerald-600/20"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
            <div className="relative flex items-center justify-between">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <FiClock size={18} />
              </div>
            </div>
            <div className="relative mt-4 sm:mt-5 text-[11px] sm:text-sm uppercase tracking-wide opacity-80">
              Today
            </div>
            <div className="relative text-2xl sm:text-4xl font-extrabold">{today}</div>
          </motion.div>
        </div>

        {/* Search */}
        <div className="relative mb-8 sticky top-3 z-10">
          <div className="relative rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm focus-within:shadow-md focus-within:ring-2 focus-within:ring-indigo-500/40 transition-shadow">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              className="w-full bg-transparent rounded-full pl-11 pr-4 py-3 text-sm sm:text-base focus:outline-none dark:text-white placeholder:text-gray-400"
              placeholder="Search by name, email, or message..."
              value={search}
              onChange={e=>setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Messages */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Loading messages...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
            <FiInbox size={36} className="opacity-50" />
            <span className="text-sm">No messages found</span>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filtered.map((msg,i)=>(
              <motion.div
                key={msg.id}
                initial={{opacity:0,y:16}}
                animate={{opacity:1,y:0}}
                transition={{delay:Math.min(i*0.04,0.4)}}
                whileHover={{y:-2}}
                className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6 shadow-sm hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-900 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex gap-3 sm:gap-4 min-w-0">
                    <div className={`w-11 h-11 sm:w-13 sm:h-13 shrink-0 rounded-full bg-gradient-to-br ${paletteFor(msg.name)} text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white dark:ring-gray-900`}>
                      {msg.name ? initials(msg.name):<FiUser/>}
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-gray-900 dark:text-white truncate">{msg.name}</h2>
                      <p className="text-gray-500 text-sm truncate">{msg.email}</p>
                      <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1.5">
                        <FiClock className="shrink-0" size={12} />
                        <span className="truncate">{fmt(msg.createdAt)}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={()=>handleReply(msg)}
                    className="w-full sm:w-auto shrink-0 px-4 py-2.5 sm:py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white active:scale-95 flex items-center justify-center gap-2 text-sm font-semibold transition-all"
                  >
                    <FiSend size={14}/> Reply
                  </button>
                </div>

                <div className="mt-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 p-4 text-sm sm:text-base text-gray-700 dark:text-gray-200 break-words leading-relaxed">
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