import { useEffect } from "react";

export const CONSENT_KEY = "nm_consent_v1";

export function getConsent() {
  // "accepted" | "rejected" | null
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export default function AnalyticsGate() {
  useEffect(() => {
    const consent = getConsent();

    if (consent === "accepted") {
      loadAnalytics();
      return;
    }

    const onConsent = (e) => {
      if (e?.detail === "accepted") loadAnalytics();
    };

    window.addEventListener("nm-consent", onConsent);
    return () => window.removeEventListener("nm-consent", onConsent);
  }, []);

  return null;
}

/** Load GA only once */
function loadAnalytics() {
  if (document.getElementById("ga-script")) return;

  // IMPORTANT: Replace with your real GA Measurement ID
  const GA_ID = "G-XXXXXXXXXX";
  if (!GA_ID || GA_ID === "G-XXXXXXXXXX") return;

  const s1 = document.createElement("script");
  s1.id = "ga-script";
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s1);

  const s2 = document.createElement("script");
  s2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}', { anonymize_ip: true });
  `;
  document.head.appendChild(s2);
}
