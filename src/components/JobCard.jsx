import React, { useState } from "react";
import { FiBriefcase, FiHelpCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HelpPopup from "./HelpPopup";
import { jobCategories as helpCategories } from "../data/jobCategories";

const JobCard = ({ job }) => {
  const { t, i18n } = useTranslation();
  const [showHelp, setShowHelp] = useState(false);

  // Find category by key
  const category = helpCategories.find((cat) => cat.key === job.key);

  return (
    <>
      <div className="relative group rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20">
        {/* Image / Emoji */}
        <div className="flex justify-center items-center h-36 bg-gray-100 dark:bg-gray-700 overflow-hidden">
          {job.image ? (
            <img
              src={job.image}
              alt={job.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="text-6xl animate-bounce-slow select-none">{job.emoji}</div>
          )}
        </div>

        {/* Job Info */}
        <div className="p-5 relative z-10">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1 transition-colors group-hover:text-orange-500">
            {job.title}
          </h3>

          {job.subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-2">
              {job.subtitle}
            </p>
          )}

          <p className="text-sm text-gray-700 dark:text-gray-200 mb-5 line-clamp-3 leading-relaxed">
            {job.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            {category && (
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-transform hover:scale-105"
                onClick={() => setShowHelp(true)}
              >
                <FiHelpCircle size={16} /> {t("usefulHelp.button")}
              </button>
            )}

            <Link
              to={`/jobs`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-orange-500 text-white shadow hover:shadow-orange-400/50 transition-transform hover:scale-105"
            >
              <FiBriefcase size={16} /> {t("viewJob.button")}
            </Link>
          </div>
        </div>
      </div>

      {/* Help Popup */}
      {showHelp && category && (
        <HelpPopup
          category={category}
          lang={i18n.language} // pass selected language
          onClose={() => setShowHelp(false)}
        />
      )}

      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2.8s infinite ease-in-out;
        }
      `}</style>
    </>
  );
};

export default JobCard;
