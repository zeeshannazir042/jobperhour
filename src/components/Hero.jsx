import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroVideo from "../../public/videos/video.mp4";

const Hero = () => {
  const { t } = useTranslation();

  const scrollToFeatured = () => {
    const section = document.getElementById("featured-jobs");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden -mt-16">
      
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"></div>

      {/* Soft Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="particle"></div>
        <div className="particle delay1"></div>
        <div className="particle delay2"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl animate-fade-soft backdrop-blur-lg bg-white/5 rounded-2xl shadow-xl p-10 border border-white/10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
          {t("hero.title.before")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-orange-500">
            {t("hero.title.highlight")}
          </span>{" "}
          {t("hero.title.after")}
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mt-4">
          {t("hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap gap-5 justify-center">
          <Link
            to="/jobs"
            className="px-8 py-3 rounded-full text-white text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:shadow-orange-500/50 hover:scale-110 transition-all duration-300"
          >
            🔍 {t("hero.browseJobs")}
          </Link>

          <Link
            to="/post-job"
            className="px-8 py-3 rounded-full border border-orange-400 text-orange-400 text-lg font-semibold hover:bg-orange-500 hover:text-white hover:scale-110 transition-all duration-300 shadow"
          >
            ✨ {t("hero.postJob")}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToFeatured}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white animate-bounce hover:opacity-70 transition cursor-pointer"
      >
        ⬇
      </button>

      {/* Animations */}
      <style>{`
        @keyframes fadeSoft {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-soft {
          animation: fadeSoft 1.4s ease-out forwards;
        }

        .particle {
          position: absolute;
          width: 10px;
          height: 10px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          animation: floatUp 6s infinite ease-in-out;
          left: 20%;
          bottom: -10px;
        }
        .particle.delay1 {
          left: 60%;
          animation-delay: 1s;
        }
        .particle.delay2 {
          left: 40%;
          animation-delay: 2s;
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { opacity: 1; }
          100% { transform: translateY(-500px) scale(0.4); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
