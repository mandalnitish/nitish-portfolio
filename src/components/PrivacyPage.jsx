import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaLock,
  FaEye,
  FaUserCheck,
  FaDatabase,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa";

export default function PrivacyPage() {
  const sections = [
    {
      icon: <FaDatabase className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Information you provide via contact forms (name, email, message)",
        "Automatically collected technical data (IP address, browser, device)",
        "Usage data such as pages visited and interaction patterns",
        "Cookies for analytics and essential site functionality",
      ],
    },
    {
      icon: <FaLock className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "To respond to messages and inquiries",
        "To improve website performance and user experience",
        "To analyze traffic and detect misuse",
        "To maintain security and site integrity",
      ],
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Data Protection",
      content: [
        "Industry-standard security practices are applied",
        "Personal data is never sold or shared",
        "Access to data is strictly limited",
        "Regular monitoring for vulnerabilities",
      ],
    },
    {
      icon: <FaEye className="w-6 h-6" />,
      title: "Third-Party Services",
      content: [
        "Google Analytics for anonymized traffic insights",
        "Firebase for hosting and database services",
        "Third-party services follow their own privacy policies",
      ],
    },
    {
      icon: <FaUserCheck className="w-6 h-6" />,
      title: "Your Rights",
      content: [
        "Request access to personal data",
        "Request correction or deletion",
        "Withdraw consent at any time",
      ],
    },
    {
      icon: <FaGlobe className="w-6 h-6" />,
      title: "Cookies Policy",
      content: [
        "Essential cookies ensure site functionality",
        "Analytics cookies help improve the website",
        "Cookies can be controlled via browser settings",
      ],
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "url": "https://www.nitishmandal.site/privacy-policy",
    "description": "Privacy Policy for Nitish Mandal portfolio website",
    "publisher": {
      "@type": "Person",
      "name": "Nitish Mandal",
      "url": "https://www.nitishmandal.site",
    },
  };

  return (
    <>
      {/* SEO Schema MUST be first */}
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
              <FaShieldAlt className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Privacy Policy
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
              This website (<strong>https://www.nitishmandal.site</strong>) is owned
              and operated by <strong>Nitish Mandal</strong>. We are committed to
              protecting your privacy and ensuring transparency in how your data
              is handled.
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
              For questions regarding this Privacy Policy:
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
