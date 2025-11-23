import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/Homepage/logo.png"; // <-- adjust path to your logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [isJoinOpenMobile, setIsJoinOpenMobile] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Jobs Per Hour Berlin" className="h-10 w-auto" />
          <span className="text-xl font-bold text-orange-500 hidden md:inline">
            Jobs <span className="text-black">Per Hour</span> Berlin
          </span>
        </div>

        {/* Hamburger button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-orange-500 focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex md:items-center md:space-x-6">
          <li>
            <Link to="/" className="px-3 py-2 rounded hover:bg-orange-100 hover:text-orange-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="px-3 py-2 rounded hover:bg-orange-100 hover:text-orange-500 transition">
              Jobs
            </Link>
          </li>
          <li>
            <Link to="/post-job" className="px-3 py-2 rounded hover:bg-orange-100 hover:text-orange-500 transition">
              Post a Job
            </Link>
          </li>
          {/* Join Us Dropdown */}
          <li className="relative group">
            <button className="px-3 py-2 rounded hover:bg-orange-100 hover:text-orange-500 transition font-semibold">
              Join Us
            </button>
            <ul className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50">
              <li>
                <Link to="/login" className="block px-4 py-2 hover:bg-orange-100 hover:text-orange-500 transition rounded-t-lg">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="block px-4 py-2 hover:bg-orange-500 hover:text-white transition rounded-b-lg">
                  Sign Up
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/contact" className="px-3 py-2 rounded hover:bg-orange-100 hover:text-orange-500 transition">
              Contact Us
            </Link>
          </li>
          {/* Language Switcher */}
          <li className="flex border border-gray-300 rounded overflow-hidden ml-4">
            <button className="px-2 py-1 hover:bg-gray-100">EN</button>
            <button className="px-2 py-1 hover:bg-gray-100">DE</button>
          </li>
        </ul>
      </div>

      {/* Mobile Slide Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <img src={logo} alt="Jobs Per Hour Berlin" className="h-10 w-auto" />
          <button onClick={() => setIsOpen(false)} className="text-orange-500 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col mt-4 space-y-3 px-4">
          <li>
            <Link to="/" className="block px-3 py-2 rounded hover:bg-orange-100 hover:text-orange-500 transition" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="block px-3 py-2 rounded hover:bg-orange-100 hover:text-orange-500 transition" onClick={() => setIsOpen(false)}>
              Jobs
            </Link>
          </li>
          <li>
            <Link to="/post-job" className="block px-3 py-2 rounded hover:bg-orange-100 hover:text-orange-500 transition" onClick={() => setIsOpen(false)}>
              Post a Job
            </Link>
          </li>
          {/* Join Us Mobile Dropdown */}
          <li className="flex flex-col">
            <button onClick={() => setIsJoinOpenMobile(!isJoinOpenMobile)} className="w-full text-left px-3 py-2 rounded hover:bg-orange-100 hover:text-orange-500 transition font-semibold">
              Join Us
            </button>
            {isJoinOpenMobile && (
              <ul className="flex flex-col ml-2 mt-2 space-y-2 border-l border-gray-200 pl-2">
                <li>
                  <Link to="/login" className="block px-3 py-2 rounded hover:bg-orange-100 hover:text-orange-500 transition" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="block px-3 py-2 rounded hover:bg-orange-500 hover:text-white transition" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/contact" className="block px-3 py-2 rounded hover:bg-orange-100 hover:text-orange-500 transition" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
          </li>
          {/* Language Switcher */}
          <li className="flex border border-gray-300 rounded overflow-hidden mt-4">
            <button className="px-2 py-1 hover:bg-gray-100">EN</button>
            <button className="px-2 py-1 hover:bg-gray-100">DE</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
