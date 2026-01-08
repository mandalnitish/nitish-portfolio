import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AdminLogoutButton() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin-login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="
        px-4 py-2 rounded font-medium text-sm
        bg-red-600 text-white
        hover:bg-red-700
        transition-colors
      "
    >
      Logout
    </button>
  );
}
