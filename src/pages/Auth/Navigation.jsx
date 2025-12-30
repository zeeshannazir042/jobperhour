import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../../assets/Images/Homepage/logo.png";
import { HiMenu, HiX } from "react-icons/hi";
import { MdLogout, MdNotificationsNone } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { dark, setDark } = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Example notifications array, replace with API data
  const [notifications, setNotifications] = useState([]);

  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  const isJobPoster =
    user && ["jobposter-private", "jobposter-company"].includes(user.role);

  const getDashboardRoute = () => {
    if (!user) return "/";
    if (user.role === "admin") return "/admin-dashboard";
    if (["jobposter-private", "jobposter-company"].includes(user.role))
      return "/poster";
    return "/seeker";
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target)
      ) {
        setUserMenuOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target)
      ) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const toggleLanguage = () =>
    i18n.changeLanguage(i18n.language === "en" ? "de" : "en");

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all ${isScrolled
            ? dark
              ? "bg-black/70 border-b border-gray-800"
              : "bg-white/70 border-b border-gray-200"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Jobs Per Hour" className="h-10" />
            <span className="font-bold text-xl">
              <span className="text-gray-900 dark:text-white">Jobs Per Hour</span>
              <span className="ml-1 text-orange-500">Berlin</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center space-x-6 font-medium">
            <NavLink to="/" label={t("home")} />
            <NavLink to="/about" label={t("About Us") || "About"} />
            <NavLink to="/jobs" label={t("jobs")} />
            <NavLink to="/community" label={t("community")} />
            {isJobPoster && <NavLink to="/post-job" label={t("postJob")} />}
            <NavLink to="/contactUs" label={t("contactUs")} />

            {/* NOTIFICATION ICON */}
            {user && (
              <li className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="text-2xl hover:text-orange-500 transition relative"
                >
                  <MdNotificationsNone />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                      {notifications.length}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute right-0 mt-3 w-64 rounded-xl shadow-xl p-4 z-50 ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                        }`}
                    >
                      {notifications.length === 0 ? (
                        <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                          No notifications
                        </li>
                      ) : (
                        notifications.map((notif, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md"
                          >
                            {notif.message}
                          </li>
                        ))
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            )}

            {/* USER MENU */}
            {user ? (
              <li className="relative" ref={userMenuRef}>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <FaUserCircle className="text-2xl hover:text-orange-500 transition" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute right-0 mt-3 w-48 rounded-xl shadow-xl p-4 ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                        }`}
                    >
                      <Link
                        to={getDashboardRoute()}
                        onClick={() => setUserMenuOpen(false)}
                        className="block py-2 hover:text-orange-500"
                      >
                        {t("Dashboard")}
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-red-500 font-semibold py-2 mt-2 border-t"
                      >
                        <MdLogout /> {t("logout")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <>
                <Link to="/login">{t("login")}</Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 bg-orange-500 text-white rounded-full"
                >
                  {t("signup")}
                </Link>
              </>
            )}

            {/* LANGUAGE */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-full border"
            >
              {i18n.language.toUpperCase()}
            </button>

            {/* THEME */}
            <button onClick={() => setDark(!dark)} className="p-2 rounded-full">
              {dark ? <BsSunFill /> : <BsMoonStarsFill />}
            </button>
          </ul>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-3xl text-orange-500"
            onClick={() => setMenuOpen(true)}
          >
            <HiMenu />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 right-0 h-full w-72 z-50 ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
              }`}
          >
            <div className="p-5 flex justify-between border-b">
              <img src={logo} className="h-10" />
              <HiX
                className="text-2xl cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            </div>

            <ul className="p-5 space-y-4 text-lg">
              <MobileLink to="/" label={t("home")} close={setMenuOpen} />
              <MobileLink to="/about" label={t("About Us") || "About"} close={setMenuOpen} />
              <MobileLink to="/jobs" label={t("jobs")} close={setMenuOpen} />
              <MobileLink to="/community" label={t("community")} close={setMenuOpen} />
              {isJobPoster && (
                <MobileLink to="/post-job" label={t("postJob")} close={setMenuOpen} />
              )}
              <MobileLink to="/contactUs" label={t("contactUs")} close={setMenuOpen} />

              {user && (
                <MobileLink
                  to={getDashboardRoute()}
                  label={t("Dashboard")}
                  close={setMenuOpen}
                />
              )}
              {!user && (
                <>
                  <MobileLink to="/login" label={t("login")} close={setMenuOpen} />

                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="block text-center mt-2 px-4 py-2 bg-orange-500 text-white rounded-full"
                  >
                    {t("signup")}
                  </Link>
                </>
              )}
              {user && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 pt-4 border-t"
                >
                  <MdLogout /> {t("logout")}
                </button>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ---------------- Reusable Links ---------------- */
const NavLink = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="relative hover:text-orange-500 transition after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all hover:after:w-full"
    >
      {label}
    </Link>
  </li>
);

const MobileLink = ({ to, label, close }) => (
  <li>
    <Link to={to} onClick={() => close(false)} className="block py-1">
      {label}
    </Link>
  </li>
);

export default Navbar;
