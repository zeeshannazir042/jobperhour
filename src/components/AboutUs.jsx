import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import aboutImg from "../assets/images/About/community.jpg";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${aboutImg})`,
          filter: "brightness(40%)",
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-orange-500/40"></div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-28 flex flex-col md:flex-row items-center gap-12 animate-fadeIn">
        {/* Text Section */}
        <div className="md:w-1/2 text-white space-y-6">
          <h2 className="text-5xl font-extrabold tracking-wide">
            {t("aboutUs.title")} <span className="text-orange-500">{t("aboutUs.highlight")}</span>
          </h2>

          <p className="text-lg leading-relaxed">{t("aboutUs.description")}</p>

          <h3 className="text-2xl font-bold text-orange-300">{t("aboutUs.whyChooseUs")}</h3>

          <ul className="space-y-2 text-lg">
            <li className="flex items-center gap-2">🔥 {t("aboutUs.features.hyperLocal")}</li>
            <li className="flex items-center gap-2">🤝 {t("aboutUs.features.trustedCommunity")}</li>
            <li className="flex items-center gap-2">💼 {t("aboutUs.features.flexibleWork")}</li>
            <li className="flex items-center gap-2">🌍 {t("aboutUs.features.bilingual")}</li>
          </ul>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-4">
            <Link
              to="/jobs"
              className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:scale-110 hover:bg-orange-600 transition-all"
            >
              {t("aboutUs.cta.findJobs")}
            </Link>
            <Link
              to="/post-job"
              className="px-8 py-3 border-2 border-orange-400 text-orange-300 font-semibold rounded-full hover:bg-orange-500 hover:text-white hover:scale-110 transition-all"
            >
              {t("aboutUs.cta.postJob")}
            </Link>
          </div>
        </div>

        {/* Right Image Box */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={aboutImg}
            alt={t("aboutUs.imageAlt")}
            className="rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 transform hover:scale-105 hover:rotate-1 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
