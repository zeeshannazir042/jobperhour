import React from "react";
import { motion } from "framer-motion";
import communityImg from "../../assets/Images/community/herocommunity.jpg";

const HeroCommunity = () => {
  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${communityImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 "></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
        >
          Join Our <span className="text-orange-500">Community</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-200 drop-shadow-md"
        >
          Connect with neighbours, share skills, offer help, and make Berlin a place where everyone belongs.
        </motion.p>

        {/* Call-to-action Button */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/community"
          className="mt-10 inline-block bg-orange-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition"
        >
          Explore the Community
        </motion.a>

        {/* Decorative Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8 mx-auto h-1 w-24 bg-orange-500 rounded-full"
        />
      </div>

      
    </section>
  );
};

export default HeroCommunity;
