import { useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  // Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Check admin role
      const userRef = doc(db, "users", cred.user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists() || snap.data().role !== "admin") {
        throw new Error("Not authorized as admin");
      }

      navigate("/admin", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or not an admin account.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError("Please enter your admin email first.");
      return;
    }

    setError("");

    try {
      await sendPasswordResetEmail(auth, email);

      alert(
        "Password reset email sent successfully. Please check your inbox."
      );
    } catch (err) {
      console.error(err);

      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/too-many-requests":
          setError("Too many requests. Please try again later.");
          break;

        default:
          setError(err.message);
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          w-full max-w-md
          space-y-5
          p-8
          rounded-xl
          shadow-lg
          bg-white/90 dark:bg-gray-900/90
          border border-gray-200 dark:border-gray-700
        "
      >
        <h1 className="text-2xl font-bold text-center">
          Admin Login
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="
            w-full
            p-3
            rounded
            border
            bg-transparent
            border-gray-300 dark:border-gray-600
            text-gray-900 dark:text-gray-100
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="
            w-full
            p-3
            rounded
            border
            bg-transparent
            border-gray-300 dark:border-gray-600
            text-gray-900 dark:text-gray-100
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />

        {/* Login */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            py-3
            rounded
            font-medium
            bg-gray-900
            text-white
            hover:bg-gray-800
            disabled:opacity-60
            dark:bg-gray-100
            dark:text-gray-900
          "
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* Forgot Password */}
        <button
          type="button"
          onClick={handleForgotPassword}
          className="
            w-full
            text-sm
            text-indigo-600
            hover:text-indigo-700
            hover:underline
            dark:text-indigo-400
            dark:hover:text-indigo-300
            transition-colors
          "
        >
          Forgot Password?
        </button>

        {/* Error */}
        {error && (
          <p className="text-center text-sm text-red-600">
            {error}
          </p>
        )}
      </motion.form>
    </section>
  );
}