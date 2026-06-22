import { useEffect, useRef, useState, type FC } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../theme/theme.context";

const COOKIE_CONSENT_KEY = "storysparkai_cookie_consent";

type CookiePreferences = {
  saved: boolean;
  functional: boolean;
  analytics: boolean;
};

const DEFAULT_PREFERENCES: CookiePreferences = {
  saved: false,
  functional: false,
  analytics: false,
};

const loadCookiePreferences = (): CookiePreferences => {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PREFERENCES;
  } catch {
    return DEFAULT_PREFERENCES;
  }
};

const updateAppCookieState = (preferences: CookiePreferences) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("cookieConsentChange", { detail: preferences }));
};

const saveCookiePreferences = (preferences: CookiePreferences) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
  updateAppCookieState(preferences);
};

type CookieConsentBannerProps = {
  onLayoutChange?: (height: number) => void;
};

const CookieConsentBanner: FC<CookieConsentBannerProps> = ({ onLayoutChange }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const storedPreferences = loadCookiePreferences();
    setPreferences(storedPreferences);
    setShowBanner(!storedPreferences.saved);
  }, []);

  useEffect(() => {
    if (!showBanner) {
      onLayoutChange?.(0);
      return;
    }

    const updateLayout = () => {
      const banner = bannerRef.current;
      if (!banner) return;
      onLayoutChange?.(banner.getBoundingClientRect().height);
    };

    updateLayout();
    const observer = new ResizeObserver(updateLayout);
    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }
    window.addEventListener("resize", updateLayout);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, [onLayoutChange, showBanner]);

  if (!preferences || !showBanner) {
    return null;
  }

  const handleSave = () => {
    const updated = { ...preferences, saved: true };
    setPreferences(updated);
    setShowBanner(false);
    saveCookiePreferences(updated);
  };

  const handleAcceptAll = () => {
    const updated = { saved: true, functional: true, analytics: true };
    setPreferences(updated);
    setShowBanner(false);
    saveCookiePreferences(updated);
  };

  const handleRejectNonEssential = () => {
    const updated = { saved: true, functional: false, analytics: false };
    setPreferences(updated);
    setShowBanner(false);
    saveCookiePreferences(updated);
  };

  // Theme-aware class definitions
  const primaryText = isDark ? "text-white" : "text-slate-900";
  const secondaryText = isDark ? "text-slate-300" : "text-slate-600";
  const mutedText = isDark ? "text-slate-400" : "text-slate-500";

  const cardClasses = isDark
    ? "rounded-xl border border-white/5 bg-slate-900 p-3 flex flex-col justify-between gap-3"
    : "rounded-xl border border-slate-200 bg-white p-3 flex flex-col justify-between gap-3";

  const panelClasses = isDark
    ? "rounded-xl border border-white/5 bg-slate-800/40 p-3"
    : "rounded-xl border border-slate-200 bg-slate-50 p-3";

  const subtleLabel = isDark
    ? "font-semibold uppercase tracking-wider text-[10px] bg-slate-700 px-2 py-0.5 rounded-md text-slate-400 group-hover:text-white transition-colors"
    : "font-semibold uppercase tracking-wider text-[10px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-500 group-hover:text-slate-900 transition-colors";

  const checkboxClasses = isDark
    ? "h-4 w-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500/30 cursor-pointer"
    : "h-4 w-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500/30 cursor-pointer";

  const actionButtonClasses = isDark
    ? "w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-xs font-bold text-white transition-all duration-150 hover:bg-slate-700 active:scale-[0.98] cursor-pointer text-center uppercase tracking-wider"
    : "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-900 transition-all duration-150 hover:bg-slate-100 active:scale-[0.98] cursor-pointer text-center uppercase tracking-wider";

  const rejectButtonClasses = isDark
    ? "w-full rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-xs font-bold text-slate-400 transition-all duration-150 hover:text-white hover:bg-slate-800 active:scale-[0.98] cursor-pointer text-center uppercase tracking-wider"
    : "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-500 transition-all duration-150 hover:text-slate-900 hover:bg-slate-100 active:scale-[0.98] cursor-pointer text-center uppercase tracking-wider";

  return (
    // ✅ Single wrapper div — uses isDark to pick the correct theme
    <div
      ref={bannerRef}
      className={`fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-4 sm:pb-4 transition-colors duration-300 ${
        isDark ? "text-white" : "text-slate-900"
      }`}
    >
      <div
        className={`mx-auto max-w-5xl rounded-2xl shadow-2xl backdrop-blur-xl border ${
          isDark
            ? "bg-slate-950/95 border-slate-700"
            : "bg-white/98 border-slate-200"
        } p-4 sm:p-5`}
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between xl:gap-6">
          
          {/* Left: text + cookie options */}
          <div className="min-w-0 flex-1 space-y-3">
            <div className="space-y-0.5">
              <p className={`text-[10px] font-bold uppercase tracking-[0.24em] ${mutedText}`}>
                Cookie Preferences
              </p>
              <h2 className={`text-lg font-bold tracking-tight sm:text-xl ${primaryText}`}>
                Manage your cookie settings
              </h2>
            </div>

            <p className={`text-xs leading-relaxed sm:text-sm ${secondaryText}`}>
              StorySpark AI uses cookies to keep the experience secure and smooth. Select which
              categories you want to allow, or accept all for the best experience.{" "}
              <Link
                to="/cookie-policy"
                className="text-blue-600 dark:text-blue-400 underline font-medium hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              >
                Learn more
              </Link>
              .
            </p>

            <div className={panelClasses}>
              <div className="grid gap-2 sm:grid-cols-2">
                {/* Essential */}
                <div className={cardClasses}>
                  <div className="space-y-0.5">
                    <p className={`font-bold text-xs ${primaryText}`}>Essential Cookies</p>
                    <p className={`text-[11px] leading-normal ${mutedText}`}>
                      Always active for secure login and basic app functionality.
                    </p>
                  </div>
                  <span className="inline-block rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
                    Required
                  </span>
                </div>

                {/* Functional */}
                <div className={cardClasses}>
                  <div className="space-y-0.5">
                    <p className={`font-bold text-xs ${primaryText}`}>Functional Cookies</p>
                    <p className={`text-[11px] leading-normal ${mutedText}`}>
                      Enable saved preferences and smoother navigation features.
                    </p>
                  </div>
                  <label className={`inline-flex items-center gap-2 text-xs cursor-pointer select-none group ${secondaryText}`}>
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                      className={checkboxClasses}
                    />
                    <span className={subtleLabel}>
                      {preferences.functional ? "Active" : "Disabled"}
                    </span>
                  </label>
                </div>

                {/* Analytics — spans full width */}
                <div className={`${cardClasses} sm:col-span-2 sm:flex-row sm:items-center sm:justify-between`}>
                  <div className="space-y-0.5 max-w-xl">
                    <p className={`font-bold text-xs ${primaryText}`}>Analytics Cookies</p>
                    <p className={`text-[11px] leading-normal ${mutedText}`}>
                      Help us understand how people use StorySpark AI so we can improve it.
                    </p>
                  </div>
                  <label className={`inline-flex items-center gap-2 text-xs cursor-pointer select-none group shrink-0 ${secondaryText}`}>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className={checkboxClasses}
                    />
                    <span className={subtleLabel}>
                      {preferences.analytics ? "Active" : "Disabled"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right: action buttons */}
          <div className="flex flex-row gap-2 xl:flex-col xl:w-[220px] xl:shrink-0 xl:pt-9">
            <button
              onClick={handleAcceptAll}
              className="flex-1 xl:flex-none xl:w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/10 transition-all duration-150 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] cursor-pointer text-center uppercase tracking-wider"
            >
              Accept all
            </button>
            <button onClick={handleSave} className={`flex-1 xl:flex-none ${actionButtonClasses}`}>
              Save preferences
            </button>
            <button onClick={handleRejectNonEssential} className={`flex-1 xl:flex-none ${rejectButtonClasses}`}>
              Reject non-essential
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;