import { motion, AnimatePresence } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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

/* ---------- Pages ---------- */

function MainSite() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Hero />
      <About />
      <Projects />
      <Skills />
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
      exit={{ opacity: 0 }}
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

        {/* Admin login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected admin */}
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

  // Hide navbar + footer on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen transition-colors duration-300">
      {!isAdminRoute && <Navbar />}
      <AnimatedRoutes />
      {!isAdminRoute && <Footer />}
    </div>
  );
}

/* ---------- App ---------- */

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
