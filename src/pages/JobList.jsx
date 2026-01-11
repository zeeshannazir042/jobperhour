// /* ------------------------------------------------------------------
//    Premium Orange + Slate Color Theme Applied
// ------------------------------------------------------------------ */

// import React, { useState, useEffect } from "react";
// import { getJobs } from "../api/jobApi";
// import { FaHeart } from "react-icons/fa";
// import Footer from "../components/Footer";

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchText, setSearchText] = useState("");
//   const [filters, setFilters] = useState({
//     employmentType: "",
//     location: "",
//     jobCategory: "",
//     dateRange: "",
//   });

//   const [selectedJob, setSelectedJob] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 10;

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     setLoading(true);
//     try {
//       const data = await getJobs();
//       setJobs(data);
//       if (data.length > 0) setSelectedJob(data[0]);
//     } catch {
//       setError("Failed to load jobs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//     setCurrentPage(1);
//   };

//   const handleLike = (jobId) => alert(`Liked job ${jobId}`);

//   const filteredJobs = jobs.filter((job) => {
//     let withinDate = true;

//     if (filters.dateRange) {
//       const now = new Date();
//       const created = new Date(job.createdAt);

//       const ranges = {
//         "24h": 24,
//         "3d": 72,
//         "1w": 24 * 7,
//         "1m": 24 * 30,
//         "1y": 24 * 365,
//       };

//       if (ranges[filters.dateRange]) {
//         withinDate =
//           now - created <= ranges[filters.dateRange] * 60 * 60 * 1000;
//       }
//     }

//     return (
//       (!searchText ||
//         job.jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
//         job.companyName.toLowerCase().includes(searchText.toLowerCase())) &&
//       (!filters.employmentType ||
//         job.employmentType === filters.employmentType) &&
//       (!filters.location ||
//         job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
//       (!filters.jobCategory ||
//         job.jobCategory
//           .toLowerCase()
//           .includes(filters.jobCategory.toLowerCase())) &&
//       withinDate
//     );
//   });

//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   return (
//     <>
    
//     <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">

//       {/* HERO */}
//       <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-3xl p-10 mb-10 shadow-xl text-white">
//         <h1 className="text-4xl font-bold mb-2">Find Your Perfect Job</h1>
//         <p className="text-lg opacity-90">
//           Search thousands of opportunities based on your skills and passion.
//         </p>
//       </div>

//       {/* SEARCH + FILTER BAR */}
//       <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex flex-wrap gap-4 items-center mb-10 border border-gray-200 dark:border-gray-700">

//         <input
//           type="text"
//           placeholder="Search job title or company..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="flex-1 px-4 py-3 rounded-xl border-gray-300 border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-orange-500"
//         />

//         <select
//           name="employmentType"
//           value={filters.employmentType}
//           onChange={handleFilterChange}
//           className="px-4 py-3 rounded-xl border-gray-300 border dark:bg-gray-700 dark:border-gray-600"
//         >
//           <option value="">All</option>
//           <option>Micro Job / Hourly</option>
//           <option>Project Based</option>
//           <option>community exchanges (One Hand to the Other)</option>
//           <option>Jobs for Pensioners</option>
//         </select>

//         <input
//           type="text"
//           name="location"
//           value={filters.location}
//           onChange={handleFilterChange}
//           placeholder="Location"
//           className="px-4 py-3 rounded-xl border-gray-300 border dark:bg-gray-700 dark:border-gray-600"
//         />

//         <select
//           name="jobCategory"
//           value={filters.jobCategory}
//           onChange={handleFilterChange}
//           className="px-4 py-3 rounded-xl border-gray-300 border dark:bg-gray-700 dark:border-gray-600"
//         >
//           <option value="">Category</option>
//           <option>IT</option>
//           <option>Marketing</option>
//           <option>Design</option>
//           <option>Sales</option>
//         </select>

//         <select
//           name="dateRange"
//           value={filters.dateRange}
//           onChange={handleFilterChange}
//           className="px-4 py-3 rounded-xl border-gray-300 border dark:bg-gray-700 dark:border-gray-600"
//         >
//           <option value="">Posted Within</option>
//           <option value="24h">Last 24 Hours</option>
//           <option value="3d">Last 3 Days</option>
//           <option value="1w">Last Week</option>
//           <option value="1m">Last Month</option>
//           <option value="1y">Last Year</option>
//         </select>
//       </div>

//       {/* MAIN LAYOUT */}
//       <div className="flex flex-col lg:flex-row gap-6">

//         {/* LEFT — JOB LIST */}
//         <div className="w-full lg:w-1/3 overflow-y-auto h-[70vh] border border-gray-200 dark:border-gray-700 rounded-3xl p-4 shadow-lg">

//           {loading ? (
//             <p className="text-gray-600">Loading...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : currentJobs.length === 0 ? (
//             <p className="text-gray-600">No jobs found.</p>
//           ) : (
//             currentJobs.map((job) => (
//               <JobCard
//                 key={job._id}
//                 job={job}
//                 selected={selectedJob?._id === job._id}
//                 onView={() => setSelectedJob(job)}
//                 onLike={() => handleLike(job._id)}
//               />
//             ))
//           )}

//           {/* PAGINATION */}
//           <div className="flex justify-center gap-3 mt-4">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-4 py-2 rounded-xl border shadow-sm transition 
//                   ${
//                     currentPage === i + 1
//                       ? "bg-orange-600 text-white border-orange-600"
//                       : "bg-white dark:bg-gray-800 text-gray-700 border-gray-300 dark:border-gray-700 hover:bg-gray-100"
//                   }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT — JOB DETAILS */}
//         <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg p-8 h-[70vh] overflow-y-auto">

//           {!selectedJob ? (
//             <p className="text-gray-600">Select a job to view details.</p>
//           ) : (
//             <>
//               <h2 className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">
//                 {selectedJob.jobTitle}
//               </h2>
//               <p className="text-gray-500 text-lg mb-4">
//                 {selectedJob.companyName} • {selectedJob.location}
//               </p>

//               <div className="flex flex-wrap gap-3 mb-6">
//                 <span className="px-3 py-1 bg-orange-100 text-orange-700 font-semibold rounded-full text-sm">
//                   {selectedJob.employmentType}
//                 </span>

//                 {selectedJob.salary && (
//                   <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
//                     {selectedJob.salary}
//                   </span>
//                 )}

//                 <span className="px-3 py-1 bg-slate-200 dark:bg-gray-700 text-slate-700 dark:text-gray-300 rounded-full text-sm">
//                   {selectedJob.workLocationType}
//                 </span>
//               </div>

//               <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
//                 {selectedJob.jobDescription}
//               </p>

//               <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-orange-700 transition">
//                 Apply Now
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* FOOTER CTA */}
//       <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-10 rounded-3xl text-center shadow-xl">
//         <h3 className="text-3xl font-bold mb-2">Get Job Alerts</h3>
//         <p className="opacity-90 mb-4">Stay updated with new job listings that match your skills.</p>
//         <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-100">
//           Create Free Account
//         </button>
//       </div>
      
//     </div>
//      <div className="h-16 mt-10">
//         <Footer />
//       </div>
//     </>
//   );
// };

// /* ---------------------------------------------------------- */
// /* JOB CARD COMPONENT (with updated orange theme)
// ---------------------------------------------------------- */
// const JobCard = ({ job, selected, onView, onLike }) => {
//   return (
//     <div
//       onClick={onView}
//       className={`cursor-pointer p-4 mb-3 rounded-2xl border shadow-sm transition-all
//       ${
//         selected
//           ? "bg-orange-50 border-orange-300 shadow-md"
//           : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
//       }`}
//     >
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
//             {job.jobTitle}
//           </h3>

//           <p className="text-sm text-gray-500">
//             {job.companyName} • {job.location}
//           </p>

//           <div className="flex gap-2 mt-2 flex-wrap">
//             <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">
//               {job.employmentType}
//             </span>

//             {job.salary && (
//               <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
//                 {job.salary}
//               </span>
//             )}
//           </div>
//         </div>

//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onLike();
//           }}
//           className="text-orange-600 hover:text-orange-700 text-xl"
//         >
//           <FaHeart />
//         </button>
//       </div>
     
//     </div>
    
//   );
// };

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Floating background circles
const FloatingCircle = ({ size, x, y, delay }) => (
  <motion.div
    initial={{ y: 0, x: 0, opacity: 0.4 }}
    animate={{ y: [0, -20, 0], x: [0, 20, 0], opacity: [0.4, 0.8, 0.4] }}
    transition={{ duration: 6, repeat: Infinity, delay }}
    className="absolute rounded-full bg-white/20"
    style={{ width: size, height: size, top: y, left: x }}
  />
);

const ComingSoon = () => {
  const { t } = useTranslation();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const launchDate = new Date("2026-02-15T00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = launchDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const labels = [
    t("comingSoon.days"),
    t("comingSoon.hours"),
    t("comingSoon.minutes"),
    t("comingSoon.seconds"),
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500 overflow-hidden text-white px-6">

      {/* Floating Background */}
      <FloatingCircle size={100} x="10%" y="20%" delay={0} />
      <FloatingCircle size={150} x="70%" y="10%" delay={2} />
      <FloatingCircle size={80} x="50%" y="60%" delay={1} />
      <FloatingCircle size={120} x="20%" y="70%" delay={3} />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold mb-6 text-center drop-shadow-lg"
      >
        {t("comingSoon.title")}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg md:text-xl text-center mb-12 max-w-xl drop-shadow-md"
      >
        {t("comingSoon.subtitle")}
      </motion.p>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="grid grid-cols-4 gap-4 text-center mb-12"
      >
        {labels.map((label, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.2,
            }}
            className="bg-white/20 backdrop-blur-md rounded-xl p-4 min-w-[70px]"
          >
            <p className="text-3xl font-bold">
              {Object.values(timeLeft)[i]}
            </p>
            <span className="text-sm uppercase">{label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="flex flex-col md:flex-row gap-4 w-full max-w-md"
      >
        <input
          type="email"
          placeholder={t("comingSoon.emailPlaceholder")}
          className="w-full p-4 rounded-lg text-gray-900 font-medium focus:outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-orange-500 font-bold px-6 py-4 rounded-lg"
        >
          {t("comingSoon.notify")}
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-12 text-sm text-white/80 text-center"
      >
        {t("comingSoon.copyright")}
      </motion.p>
    </div>
  );
};

export default ComingSoon;