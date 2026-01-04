import Navbar from "./components/Navbar";
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

export default function App() {
  const isAdmin = window.location.hash === "#admin";

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar />

      {isAdmin ? (
        <AdminInbox />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
