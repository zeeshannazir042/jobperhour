import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import logo from "../../assets/Images/Homepage/logo.png";
import { HiMenu, HiX } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { dark, setDark } = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isJobPoster = user && ["jobposter-private", "jobposter-company"].includes(user.role);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "de" : "en");
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? dark
              ? "bg-black/70 shadow-lg border-b border-gray-800"
              : "bg-white/70 shadow-lg border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <img src={logo} alt="Jobs Per Hour" className="h-10" />
            <span className="font-bold text-xl tracking-wide group-hover:opacity-80 transition">
              <span className=" text-gray-900">Jobs Per Hour</span>
              <span className={`${dark ? "text-white" : "text-orange-500"} ml-1`}> Berlin</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 items-center font-medium">
            <AnimatedLink to="/" label={t("home")} />
            <AnimatedLink to="/jobs" label={t("jobs")} />
            <AnimatedLink to="/community" label={t("community")} />
            {isJobPoster && <AnimatedLink to="/post-job" label={t("postJob")} />}
            <AnimatedLink to="/contactUs" label={t("contactUs")} />

            {/* User Menu */}
            {user ? (
              <li className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <FaUserCircle className="text-2xl hover:text-orange-500 transition" />
                </button>

                {userMenuOpen && (
                  <div
                    className={`absolute right-0 mt-3 w-48 rounded-xl shadow-xl p-4 transition-all animate-fadeIn ${
                      dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                    }`}
                  >
                    <Link className="menu-item" to="/profile">{t("profile")}</Link>
                    <Link className="menu-item" to="/settings">{t("settings")}</Link>
                    
                    <button
  onClick={handleLogout}
  className="py-3 text-red-500 font-semibold flex items-center gap-2 border-t pt-4"
>
  <MdLogout />
  {t("logout")}
</button>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-orange-500 transition">{t("login")}</Link></li>

                <li>
                  <Link
                    to="/signup"
                    className="px-5 py-2 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 hover:scale-105 transition-all"
                  >
                    {t("signup")}
                  </Link>
                </li>
              </>
            )}

            {/* Language + Theme */}
            <li>
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {i18n.language.toUpperCase()}
              </button>
            </li>

            <li>
              <button onClick={() => setDark(!dark)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition">
                {dark ? <BsSunFill className="text-yellow-400" /> : <BsMoonStarsFill />}
              </button>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-3xl text-orange-500">
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 shadow-xl transition-all duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} z-50`}
      >
        <div className="px-5 py-5 border-b flex justify-between items-center">
          <img src={logo} className="h-10" />
          <HiX className="text-2xl text-orange-500 cursor-pointer" onClick={() => setMenuOpen(false)} />
        </div>

        <ul className="px-5 mt-4 space-y-4 text-lg">
          <MobileLink to="/" label={t("home")} close={setMenuOpen} />
          <MobileLink to="/jobs" label={t("jobs")} close={setMenuOpen} />
          <MobileLink to="/community" label={t("community")} close={setMenuOpen} />
          {isJobPoster && <MobileLink to="/post-job" label={t("postJob")} close={setMenuOpen} />}
          <MobileLink to="/contactUs" label={t("contactUs")} close={setMenuOpen} />

          <div className="pt-5 border-t">
            <button onClick={() => setDark(!dark)} className="flex items-center gap-3 text-lg">
              {dark ? <BsSunFill /> : <BsMoonStarsFill />} Theme
            </button>
          </div>

          {user && (
           <button
  onClick={handleLogout}
  className="py-3 text-red-500 font-semibold flex items-center gap-2 border-t pt-4"
>
  <MdLogout />
  {t("logout")}
</button>
          )}
        </ul>
      </div>
    </>
  );
};

const AnimatedLink = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="relative group hover:text-orange-500 transition"
    >
      {label}
      <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-orange-500 transition-all"></span>
    </Link>
  </li>
);

const MobileLink = ({ to, label, close }) => (
  <li>
    <Link to={to} onClick={() => close(false)} className="block py-2 hover:text-orange-500 transition">
      {label}
    </Link>
  </li>
);

export default Navbar;
