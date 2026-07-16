import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Internship from "./components/Internship";
import Certificates from "./components/Certificates";
import EducationTimeline from "./components/EducationTimeline";

import AdminInbox from "./components/AdminInbox";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

import PrivacyPage from "./components/PrivacyPage";
import TermsPage from "./components/TermsPage";

import ScrollToTop from "./components/ScrollToTop";
import InteractiveSkills from "./components/InteractiveSkills";

// Pages
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPostPage from "./pages/ProjectPostPage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";

// Consent + Analytics
import AnalyticsGate from "./components/AnalyticsGate";
import SiteNotice from "./components/SiteNotice";

/* ---------- Pages ---------- */

function MainSite() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Hero />
      <About />
      <Projects />
      <Skills />
      <InteractiveSkills />
      <Certificates />
      <EducationTimeline />
      <Internship />
      <Experience />
      <Blog />
      <Contact />
    </motion.div>
  );
}

function AdminPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <AdminInbox />
    </motion.div>
  );
}

/* ---------- Animated Routes ---------- */

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/" element={<MainSite />} />

        {/* Full content pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />

        {/* Projects */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectPostPage />} />

        {/* Blog */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />

        {/* Contact */}
        <Route path="/contact" element={<Contact />} />

        {/* Policy */}
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

/* ---------- Layout ---------- */

function Layout() {
  const location = useLocation();
  const isAdminRoute =
    location.pathname === "/admin" || location.pathname.startsWith("/admin/");

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Loads GA only after consent */}
      <AnalyticsGate />

      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        <AnimatedRoutes />
      </main>

      {!isAdminRoute && <Footer />}

      {/* Cookie banner on all pages */}
      <SiteNotice />
    </div>
  );
}

/* ---------- App ---------- */

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout />
    </Router>
  );
}
