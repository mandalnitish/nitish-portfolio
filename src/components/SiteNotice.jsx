import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const KEY = "nm_consent_v1";

export default function SiteNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (!v) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const setConsent = (value) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}

    window.dispatchEvent(new CustomEvent("nm-consent", { detail: value }));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[60] px-4 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-gray-900/85 backdrop-blur p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              Cookies & Analytics
            </div>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              I use essential cookies to keep the site working and optional analytics to understand
              traffic and improve content. Read more in{" "}
              <Link to="/privacy-policy" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setConsent("rejected")}
              className="rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 text-sm font-medium hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
            >
              Reject
            </button>
            <button
              onClick={() => setConsent("accepted")}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
