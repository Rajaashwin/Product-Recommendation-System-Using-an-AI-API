import React from "react";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";

export function LanguageAccordion({ lang, idx }: { lang: any; idx: number }) {
  const [open, setOpen] = React.useState(false);

  const icon =
    lang.icon === "IN"
      ? (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-[#0891B2]/30 font-bold text-[#06B6D4] text-xs">IN</span>
      )
      : lang.icon === "GB"
        ? (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-[#0891B2]/30 font-bold text-[#06B6D4] text-xs">
            <Globe className="w-5 h-5" />
          </span>
        )
        : null;

  return (
    <div className="w-full max-w-[700px] mx-auto mb-4">
      <button
        className={`flex items-center justify-between w-full px-6 py-4 rounded-lg border-2 border-[#06B6D4] shadow-md focus:outline-none transition-all ${open ? "rounded-b-none" : "rounded-b-lg"} bg-white dark:bg-[#18181B]`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`lang-panel-${idx}`}
        style={{ boxShadow: "0 2px 8px rgba(6,182,212,0.08)" }}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-semibold text-base text-slate-900 dark:text-[#E5E7EB]">{lang.name}</span>
        </div>
        <span className="ml-auto text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-white">{lang.proficiency}</span>
        <span className="ml-4">{open ? <ChevronUp className="w-5 h-5 text-[#06B6D4]" /> : <ChevronDown className="w-5 h-5 text-[#06B6D4]" />}</span>
      </button>
      {open && (
        <div
          id={`lang-panel-${idx}`}
          className="rounded-b-lg border-2 border-[#06B6D4] shadow-md px-6 pt-4 pb-6 text-left bg-white dark:bg-[#18181B]"
          style={{ boxShadow: "0 2px 8px rgba(6,182,212,0.08)", borderTop: "none" }}
        >
          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-[#E5E7EB] dark:bg-[#18181B] mb-4">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#0891B2]"
              style={{ width: '100%' }}
            />
          </div>
          {/* About Section */}
          <div className="mb-2">
            <span className="font-semibold text-base text-[#06B6D4] dark:text-[#06B6D4]">
              {lang.name === "Tamil" ? "About Tamil:" : "About English:"}
            </span>
          </div>
          <div className="mb-2">
            <span className="text-base font-normal text-slate-900 dark:text-[#E5E7EB]">
              {lang.name === "Tamil"
                ? "A southern language spoken in Tamil Nadu, India."
                : "A global language, widely used for international communication."}
            </span>
          </div>
          <div className="mb-2">
            <a
              href={lang.name === "Tamil"
                ? "https://en.wikipedia.org/wiki/Tamil_language"
                : "https://en.wikipedia.org/wiki/English_language"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#06B6D4] underline text-xs font-normal"
            >
              {lang.name === "Tamil"
                ? "Learn more about Tamil history"
                : "Learn more about English history"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}