"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <motion.span
      variants={fadeIn}
      className={`inline-flex items-center gap-1.5 rounded-full bg-blue-ice px-4 py-1.5 text-sm font-medium text-accent ${className}`}
    >
      {children}
    </motion.span>
  );
}
