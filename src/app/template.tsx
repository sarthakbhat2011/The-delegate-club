"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: [0, 0.85, 0.4, 1], scale: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="w-full h-full flex flex-col min-h-screen"
    >
      {children}
    </motion.div>
  );
}
