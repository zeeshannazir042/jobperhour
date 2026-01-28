import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const HelpPopup = ({ onClose, data, lang = "en", type = "job" }) => {
  const [activeTab, setActiveTab] = useState("vocabulary");

  if (!data) return null;

  const tabClasses = (tab) =>
    `px-4 py-2 font-medium cursor-pointer ${
      activeTab === tab
        ? "border-b-2 border-orange-500 text-orange-500"
        : "text-gray-500 dark:text-gray-300"
    }`;

  // Community items (emoji + text)
  const communityItems =
    type === "community" || type === "freeStuff"
      ? Object.keys(data.items || {}).map((key) => ({
          text: key,
          icon: data.items[key],
          sdg: data.sdgs?.[key] || null, // optional SDG for each item
        }))
      : [];

  // Impact items (emoji + SDG + count)
  const impactItems =
    type === "impact"
      ? Object.keys(data.items || {}).map((key) => ({
          text: key,
          emoji: data.items[key].emoji,
          sdg: data.items[key].sdg,
          count: data.items[key].count,
        }))
      : [];

  return (
    <div className="fixed inset-0 flex justify-center items-start bg-black/40 backdrop-blur-sm z-50 p-4 overflow-y-auto">
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
            {type === "job"
              ? `${data.title[lang]} - Job Preparation`
              : type === "impact"
              ? "Impact & SDGs"
              : "Join the Community"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Tabs for Job mode */}
        {type === "job" && (
          <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
            <div
              className={tabClasses("vocabulary")}
              onClick={() => setActiveTab("vocabulary")}
            >
              Vocabulary
            </div>
            <div
              className={tabClasses("phrases")}
              onClick={() => setActiveTab("phrases")}
            >
              Useful Phrases
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Job Mode */}
          {type === "job" && activeTab === "vocabulary" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.vocabulary?.map((word, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border-l-4 border-orange-500 flex flex-col gap-1 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    {lang === "de" ? word.german : word.english}
                  </span>
                  <span className="text-gray-500 dark:text-gray-300 text-sm">
                    {lang === "de" ? word.english : word.german}
                  </span>
                </div>
              ))}
            </div>
          )}

          {type === "job" && activeTab === "phrases" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.phrases?.map((phrase, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border-l-4 border-orange-500 flex flex-col gap-1 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    {lang === "de" ? phrase.german : phrase.english}
                  </span>
                  <span className="text-gray-500 dark:text-gray-300 text-sm">
                    {lang === "de" ? phrase.english : phrase.german}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Community & Free Stuff / Donations / Help & Tasks */}
          {(type === "community" || type === "freeStuff") && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {communityItems.map((item, idx) => (
                <a
                  key={idx}
                  href="https://www.undp.org/sustainable-development-goals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-orange-100 dark:bg-orange-900 rounded-xl flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                      {item.text}
                    </span>
                  </div>
                  {item.sdg && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                      {item.sdg}
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}

          {/* Impact Mode */}
          {type === "impact" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {impactItems.map((item, idx) => (
                <a
                  key={idx}
                  href="https://www.undp.org/sustainable-development-goals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-orange-100 dark:bg-orange-900 rounded-xl flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      {item.text}
                    </span>
                  </div>
                  {item.sdg && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                      {item.sdg} {item.count ? `– ${item.count}` : ""}
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HelpPopup;
