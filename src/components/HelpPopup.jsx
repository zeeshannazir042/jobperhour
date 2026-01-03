import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const HelpPopup = ({ onClose, category, lang = "en" }) => {
  const [activeTab, setActiveTab] = useState("vocabulary");

  if (!category) return null;

  const tabClasses = (tab) =>
    `px-4 py-2 font-medium cursor-pointer ${
      activeTab === tab
        ? "border-b-2 border-orange-500 text-orange-500"
        : "text-gray-500 dark:text-gray-300"
    }`;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
            {category.title[lang]} - Job Preparation
          </h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            <FiX size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
          <div className={tabClasses("vocabulary")} onClick={() => setActiveTab("vocabulary")}>
            Vocabulary
          </div>
          <div className={tabClasses("phrases")} onClick={() => setActiveTab("phrases")}>
            Useful Phrases
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === "vocabulary" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.vocabulary.map((word, idx) => (
                <div key={idx} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border-l-4 border-orange-500 flex flex-col gap-1 shadow-sm hover:shadow-md transition-shadow">
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

          {activeTab === "phrases" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {category.phrases.map((phrase, idx) => (
                <div key={idx} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border-l-4 border-orange-500 flex flex-col gap-1 shadow-sm hover:shadow-md transition-shadow">
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
