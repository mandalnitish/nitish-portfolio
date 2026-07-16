import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaFileAlt,
  FaExclamationCircle,
  FaBalanceScale,
  FaBan,
  FaLink,
  FaEnvelope,
  FaGavel,
} from "react-icons/fa";

export default function TermsPage() {
  const reduceMotion = useReducedMotion();

  // AdSense-friendly: render immediately (no whileInView)
  const fadeUp = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut", delay },
  });

  const cardMotion = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: "easeOut", delay },
  });

  const lastUpdated = "2026-01-17";

  const sections = [
    {
      icon: <FaFileAlt className="w-6 h-6" aria-hidden="true" />,
      title: "Acceptance of terms",
      content: [
        "By accessing or using this website, you agree to these Terms and Conditions.",
        "If you do not agree, please stop using the website.",
        "These terms may be updated occasionally; continued use means you accept the updated terms.",
      ],
    },
    {
      icon: <FaBalanceScale className="w-6 h-6" aria-hidden="true" />,
      title: "Website purpose and content",
      content: [
        "This website is a personal portfolio and technical blog intended to showcase projects, skills, and educational articles.",
        "Content is provided for general informational purposes and does not constitute professional advice.",
        "Content may change, be updated, or be removed at any time without notice.",
      ],
    },
    {
      icon: <FaBalanceScale className="w-6 h-6" aria-hidden="true" />,
      title: "Intellectual property",
      content: [
        "Unless otherwise stated, original content (text, design, and project write-ups) is owned by Nitish Mandal.",
        "You may share links publicly. You may not copy, republish, or redistribute substantial portions of content without permission.",
        "Code snippets are shared for learning and demonstration. You are responsible for how you use them, including security and compliance.",
      ],
    },
    {
      icon: <FaBan className="w-6 h-6" aria-hidden="true" />,
      title: "Prohibited activities",
      content: [
        "Attempting unauthorized access to any part of the website, server, or related services.",
        "Uploading/transmitting malware, spam, harmful code, or abusive content.",
        "Scraping or harvesting data (including email addresses) without permission.",
        "Impersonating someone else or misrepresenting affiliation.",
        "Interfering with site functionality or attempting to bypass security measures.",
      ],
    },
    {
      icon: <FaLink className="w-6 h-6" aria-hidden="true" />,
      title: "External links",
      content: [
        "This website may link to third-party websites for reference or convenience.",
        "Third-party websites have their own terms and privacy policies.",
        "Nitish Mandal is not responsible for third-party content, security, or practices.",
      ],
    },
    {
      icon: <FaExclamationCircle className="w-6 h-6" aria-hidden="true" />,
      title: "Disclaimer and limitation of liability",
      content: [
        "This website is provided on an “as-is” and “as-available” basis without warranties of any kind.",
        "No guarantee is made regarding accuracy, completeness, availability, or suitability for a specific purpose.",
        "To the maximum extent permitted by law, Nitish Mandal is not liable for any direct or indirect loss or damages arising from the use of this website.",
      ],
    },
    {
      icon: <FaGavel className="w-6 h-6" aria-hidden="true" />,
      title: "Governing law",
      content: [
        "These terms are intended to be enforceable to the fullest extent permitted by applicable law.",
        "If any provision is found unenforceable, the remaining provisions will continue in effect.",
      ],
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms and Conditions",
    url: "https://nitishmandal.site/terms-and-conditions",
    description:
      "Terms and Conditions for the personal portfolio and blog of Nitish Mandal.",
    dateModified: lastUpdated,
    isPartOf: {
      "@type": "WebSite",
      name: "Nitish Mandal",
      url: "https://nitishmandal.site",
    },
    publisher: {
      "@type": "Person",
      name: "Nitish Mandal",
      url: "https://nitishmandal.site",
    },
  };

  const Card = ({ children, delay = 0, className = "" }) => (
    <motion.div
      {...cardMotion(delay)}
      className={`
        group relative overflow-hidden
        rounded-2xl p-8
        bg-white/80 dark:bg-gray-900/60
        backdrop-blur border
        border-gray-200/70 dark:border-gray-700/70
        shadow-sm
        ${className}
      `}
    >
      <div
        aria-hidden
        className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          bg-gradient-to-br
          from-indigo-500/10 via-purple-500/10 to-pink-500/10
        "
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <motion.section
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div {...fadeUp(0)} className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
              <FaFileAlt
                className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                aria-hidden="true"
              />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Terms & Conditions
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Last updated: {lastUpdated}
            </p>

            {/* Trust navigation */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link
                to="/privacy-policy"
                className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Privacy Policy
              </Link>
              <Link
                to="/contact"
                className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Contact
              </Link>
              <Link
                to="/"
                className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Home
              </Link>
            </div>
          </motion.div>

          {/* Intro */}
          <Card delay={0.06} className="mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By accessing <strong>https://nitishmandal.site</strong>, you agree to
              these Terms and Conditions. If you do not agree, please discontinue
              use of the website.
            </p>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              These terms support a safe experience for visitors and clarify how
              content may be used and shared.
            </p>
          </Card>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card key={section.title} delay={0.1 + index * 0.05}>
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl mr-4">
                    <div className="text-indigo-600 dark:text-indigo-400">
                      {section.icon}
                    </div>
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-3">
                  {section.content.map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Contact */}
          <motion.div {...fadeUp(0.55)} className="mt-10">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <FaEnvelope aria-hidden="true" /> Contact
              </h2>

              <p className="mb-2">
                For questions regarding these Terms & Conditions, contact:
              </p>

              <p className="font-semibold">
                <a
                  href="mailto:nitishmandal367@gmail.com"
                  className="underline underline-offset-2 hover:opacity-90"
                >
                  nitishmandal367@gmail.com
                </a>
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Link to="/privacy-policy" className="underline hover:opacity-90">
                  Privacy Policy
                </Link>
                <Link to="/contact" className="underline hover:opacity-90">
                  Contact page
                </Link>
                <Link to="/" className="underline hover:opacity-90">
                  Home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
