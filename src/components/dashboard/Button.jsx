import { motion } from "framer-motion";

export default function Button({ children, onClick, className }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`bg-orange-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );
}
