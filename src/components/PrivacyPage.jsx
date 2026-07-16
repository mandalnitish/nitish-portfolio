import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaShieldAlt,
  FaLock,
  FaEye,
  FaUserCheck,
  FaDatabase,
  FaCookieBite,
  FaEnvelope,
  FaGavel,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function PrivacyPage() {
  const reduceMotion = useReducedMotion();

  // AdSense-friendly: content renders immediately (no whileInView delays)
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
      icon: <FaDatabase className="w-6 h-6" aria-hidden="true" />,
      title: "Information we collect",
      content: [
        "Information you submit through the contact form (name, email, message).",
        "Basic technical information such as IP address, browser type, device information, and approximate location (from server logs or hosting provider logs).",
        "Usage data such as pages viewed and time on page (only if analytics is enabled).",
        "Cookies/localStorage used for essential site functionality and preference storage; analytics cookies only when analytics is enabled and consent is provided.",
      ],
    },
    {
      icon: <FaLock className="w-6 h-6" aria-hidden="true" />,
      title: "How your information is used",
      content: [
        "To respond to your messages and requests.",
        "To operate and maintain the website (security, debugging, spam prevention).",
        "To measure and improve content and usability (only when analytics is enabled).",
        "To comply with legal obligations where applicable.",
      ],
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" aria-hidden="true" />,
      title: "Data protection and retention",
      content: [
        "Reasonable security practices are used to protect stored information.",
        "Contact form submissions may be retained for record-keeping and to provide support, unless you request deletion.",
        "I do not sell your personal information.",
        "Information may be disclosed if required by law or to protect the security and integrity of this website.",
      ],
    },
    {
      icon: <FaEye className="w-6 h-6" aria-hidden="true" />,
      title: "Advertising and analytics (Google)",
      content: [
        "This website may display ads served by Google (AdSense).",
        "Google and its partners may use cookies or similar technologies to serve and measure ads and to limit fraud. (Where required, consent controls will be provided.)",
        "Google Analytics may be used to understand traffic and improve content (only if enabled and configured).",
        "You can learn more about Google’s policies and controls using the links below.",
      ],
    },
    {
      icon: <FaCookieBite className="w-6 h-6" aria-hidden="true" />,
      title: "Cookies and similar technologies",
      content: [
        "Essential cookies/localStorage may be used for site functionality (for example, theme preference, basic UX features).",
        "Analytics cookies are used only if analytics is enabled and consent is provided (where applicable).",
        "Ad cookies may be used by advertising partners to deliver, measure, and improve ads (subject to your choices).",
        "You can control cookies in your browser settings (block, delete, or limit cookies).",
      ],
    },
    {
      icon: <FaUserCheck className="w-6 h-6" aria-hidden="true" />,
      title: "Your choices and rights",
      content: [
        "You can request access, correction, or deletion of contact form information by emailing me.",
        "You can control personalized advertising in Google’s ad settings (if available in your region).",
        "You can disable cookies in your browser. Note that some site functionality may be affected.",
      ],
    },
    {
      icon: <FaGavel className="w-6 h-6" aria-hidden="true" />,
      title: "Policy scope and updates",
      content: [
        "This policy applies to nitishmandal.site and its pages.",
        "This policy may be updated occasionally. Changes will be reflected by updating the 'Last updated' date on this page.",
      ],
    },
  ];

  // Schema.org JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    url: "https://nitishmandal.site/privacy-policy",
    description:
      "Privacy Policy for the personal portfolio and blog of Nitish Mandal, including information about cookies, analytics, and advertising.",
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
              <FaShieldAlt
                className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                aria-hidden="true"
              />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Privacy Policy
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Last updated: {lastUpdated}
            </p>

            {/* Policy nav */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link
                to="/contact"
                className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Contact
              </Link>
              <Link
                to="/terms-and-conditions"
                className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Terms & Conditions
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
              This website (<strong>https://nitishmandal.site</strong>) is a
              personal portfolio and blog operated by{" "}
              <strong>Nitish Mandal</strong>. This Privacy Policy explains what
              information may be collected, how it is used, and the choices
              available to you.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-start gap-3">
                <FaEnvelope className="mt-0.5" aria-hidden="true" />
                <div>
                  <div className="font-semibold">Contact</div>
                  <a
                    href="mailto:nitishmandal367@gmail.com"
                    className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    nitishmandal367@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-0.5" aria-hidden="true" />
                <div>
                  <div className="font-semibold">Site</div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Public portfolio & technical blog
                  </span>
                </div>
              </div>
            </div>
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

                {/* ✅ AdSense paragraph added here */}
                {section.title === "Advertising and analytics (Google)" ? (
                  <div className="mt-5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p>
                      <strong>AdSense notice:</strong> This site may use Google
                      AdSense to display ads. Google and its partners may use
                      cookies and/or device identifiers to serve{" "}
                      <strong>personalized</strong> or{" "}
                      <strong>non-personalized</strong> ads, measure ad
                      performance, and help prevent fraud and abuse. Third-party
                      vendors, including Google, may show ads based on previous
                      visits to this or other websites.
                    </p>

                    <ul className="mt-3 list-disc pl-5 space-y-1">
                      <li>
                        Control personalized ads via{" "}
                        <a
                          className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
                          href="https://myadcenter.google.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Google Ad Center
                        </a>
                        .
                      </li>
                      <li>
                        You can also manage or disable cookies in your browser
                        settings. Disabling cookies may affect ad relevance and
                        some site functionality.
                      </li>
                    </ul>

                    <div className="mt-4">
                      Helpful links:
                      <ul className="mt-2 list-disc pl-5 space-y-1">
                        <li>
                          <a
                            className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
                            href="https://policies.google.com/technologies/ads"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Google advertising technologies
                          </a>
                        </li>
                        <li>
                          <a
                            className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Google Privacy Policy
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : null}
              </Card>
            ))}
          </div>

          {/* Contact footer */}
          <motion.div {...fadeUp(0.55)} className="mt-10">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <FaEnvelope aria-hidden="true" /> Contact
              </h2>

              <p className="mb-2">
                Questions about this Privacy Policy or your data?
              </p>

              <p className="font-semibold">
                <a
                  href="mailto:nitishmandal367@gmail.com"
                  className="underline underline-offset-2 hover:opacity-90"
                >
                  nitishmandal367@gmail.com
                </a>
              </p>

              <div className="mt-5 text-sm opacity-95">
                You can also use the{" "}
                <Link to="/contact" className="underline hover:opacity-90">
                  contact form
                </Link>{" "}
                and request deletion of any message you previously submitted.
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Link to="/terms-and-conditions" className="underline hover:opacity-90">
                  Terms & Conditions
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
