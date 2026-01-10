import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaExclamationCircle,
  FaBalanceScale,
  FaBan,
  FaLink,
  FaEnvelope,
} from "react-icons/fa";

export default function TermsPage() {
  const sections = [
    {
      icon: <FaFileAlt className="w-6 h-6" />,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using this website, you agree to these Terms and Conditions",
        "If you do not agree with any part, you must discontinue use of the site",
        "We reserve the right to update these terms at any time",
      ],
    },
    {
      icon: <FaBalanceScale className="w-6 h-6" />,
      title: "Intellectual Property",
      content: [
        "All content and projects belong to Nitish Mandal unless stated otherwise",
        "You may not copy or redistribute content without permission",
        "Code samples are for demonstration and educational purposes only",
      ],
    },
    {
      icon: <FaExclamationCircle className="w-6 h-6" />,
      title: "Use License",
      content: [
        "Permission is granted for personal, non-commercial viewing only",
        "You may not modify or use materials for commercial purposes",
        "Violation of these terms may result in access termination",
      ],
    },
    {
      icon: <FaBan className="w-6 h-6" />,
      title: "Prohibited Activities",
      content: [
        "Unauthorized access or misuse of the website",
        "Introducing malware, spam, or harmful code",
        "Harvesting data or impersonating others",
      ],
    },
    {
      icon: <FaLink className="w-6 h-6" />,
      title: "External Links",
      content: [
        "Links to third-party websites are provided for convenience",
        "We are not responsible for third-party content or policies",
      ],
    },
    {
      icon: <FaBalanceScale className="w-6 h-6" />,
      title: "Limitation of Liability",
      content: [
        "This website is provided on an ‘as-is’ basis",
        "We are not liable for any direct or indirect damages",
      ],
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms and Conditions",
    "url": "https://www.nitishmandal.site/terms-and-conditions",
    "description": "Terms and Conditions for Nitish Mandal portfolio website",
    "publisher": {
      "@type": "Person",
      "name": "Nitish Mandal",
      "url": "https://www.nitishmandal.site",
    },
  };

  return (
    <>
      {/* SEO Schema – must be first */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
              <FaFileAlt className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Terms & Conditions
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Last updated: January 2026
            </p>
          </motion.div>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-10"
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By accessing <strong>https://www.nitishmandal.site</strong>, you agree to
              be bound by these Terms and Conditions. If you do not agree, please
              discontinue use of the website.
            </p>
          </motion.div>

          {/* Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-6 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg mr-4">
                  <div className="text-indigo-600 dark:text-indigo-400">
                    {section.icon}
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
              </div>

              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 text-white mt-10"
          >
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <FaEnvelope /> Contact
            </h2>

            <p className="mb-2">
              For questions regarding these Terms & Conditions:
            </p>

            <p className="font-semibold">
              📧 nitishmandal367@gmail.com
            </p>
          </motion.div>

        </div>
      </div>
    </>
  );
}
