import { motion } from "framer-motion";

export default function Card({ title, children, className }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors ${className}`}
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );
}
