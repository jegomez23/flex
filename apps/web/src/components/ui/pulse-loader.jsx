"use client";

import { motion } from "framer-motion";

export function PulseLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="flex items-center gap-3">
        {["var(--violet)", "#7b6bff", "var(--cyan)"].map((color, index) => (
          <motion.span
            key={color}
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -8, 0] }}
            transition={{
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.12,
            }}
          />
        ))}
      </div>
    </div>
  );
}
