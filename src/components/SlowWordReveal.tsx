"use client";

import { motion } from "motion/react";

interface SlowWordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
  duration?: number;
}

export default function SlowWordReveal({
  text,
  className = "",
  delay = 0.2,
  wordDelay = 0.06,
  duration = 0.4,
}: SlowWordRevealProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: wordDelay,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 8,
      filter: "blur(3px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-block ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={wordVariants}
          className="inline-block mr-[0.25em] whitespace-nowrap"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
