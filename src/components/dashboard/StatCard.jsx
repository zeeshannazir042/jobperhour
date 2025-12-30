import { motion } from "framer-motion";

export default function StatCard({ label, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-r from-orange-100 to-orange-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg p-5 text-center cursor-pointer transition-colors"
    >
      {/* Optional Icon */}
      {icon && <div className="text-3xl mb-2 text-orange-500 dark:text-orange-400">{icon}</div>}
      <p className="text-sm text-gray-600 dark:text-gray-300">{label}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
    </motion.div>
  );
}
