import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import AnimatedSection from "./AnimatedSection";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <AnimatedSection>
      <section id="blog" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-12"
          >
            Blog
          </motion.h2>

          {loading && (
            <p className="text-gray-600 dark:text-gray-400">
              Loading articles…
            </p>
          )}

          {!loading && blogs.length === 0 && (
            <p className="text-gray-600 dark:text-gray-400">
              No articles yet.
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? 30 : -30, // slide alternate
                }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="
                  group relative overflow-hidden
                  rounded-2xl p-7
                  bg-white/70 dark:bg-gray-900/60
                  backdrop-blur border
                  border-gray-200/70 dark:border-gray-700/70
                  shadow-sm hover:shadow-lg
                  transition-shadow
                  cursor-pointer
                "
              >
                {/* Hover Gradient */}
                <div
                  aria-hidden
                  className="
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    bg-gradient-to-br
                    from-indigo-500/15 via-purple-500/15 to-pink-500/15
                  "
                />

                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {blog.excerpt}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>
    </AnimatedSection>
  );
}
