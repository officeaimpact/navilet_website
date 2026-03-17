"use client";

import { motion } from "framer-motion";
import { buttonHover } from "@/lib/animations";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
}

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20",
  secondary:
    "bg-blue-ice text-accent hover:bg-blue-subtle",
  outline:
    "border-2 border-accent/30 text-accent hover:border-accent hover:bg-blue-ice",
  white:
    "bg-white text-primary hover:bg-blue-ice shadow-lg shadow-black/10",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-6 py-3.5 text-base sm:px-8 sm:py-4 sm:text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 cursor-pointer";
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const inner = (
    <motion.span
      className={cls}
      variants={buttonHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="inline-block">
      {inner}
    </button>
  );
}
