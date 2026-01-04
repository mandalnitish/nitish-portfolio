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
      try {
        const q = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlogs(data);
      } catch (error) {
        console.error(
          "🔥 Blog fetch failed:",
          error.code,
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <AnimatedSection>
      <section id="blog" className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            Blog
          </h2>

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

          <div className="space-y-6">
            {blogs.map(blog => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="
                  border rounded-xl p-6
                  bg-white/80 dark:bg-gray-800/80
                  border-gray-200 dark:border-gray-700
                "
              >
                <h3 className="text-lg font-semibold mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {blog.excerpt}
                </p>
              </motion.article>
            ))}
          </div>

        </div>
      </section>
    </AnimatedSection>
  );
}
