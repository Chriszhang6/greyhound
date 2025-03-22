"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const traits = [
  {
    word: "gentle",
    description: "Despite their racing background, greyhounds are known for their gentle and calm nature.",
    icon: "🐕"
  },
  {
    word: "fast",
    description: "They can reach speeds of up to 45 mph, making them the fastest dog breed!",
    icon: "⚡"
  },
  {
    word: "loving",
    description: "Greyhounds form deep bonds with their families and are incredibly affectionate.",
    icon: "❤️"
  },
  {
    word: "quiet companions",
    description: "They rarely bark and are perfect for apartment living.",
    icon: "🤫"
  },
  {
    word: "couch potatoes",
    description: "Despite their speed, they love to lounge and are great at being lazy!",
    icon: "🛋️"
  }
];

export default function GreyhoundTraits() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % traits.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-[160px] md:h-[180px] flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-light flex flex-col gap-2 items-center">
              <span>People often describe greyhounds as</span>
              <span 
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-gray-900 font-medium inline-block min-h-[36px] md:min-h-[40px]"
                  >
                    {traits[index].word}
                  </motion.span>
                </AnimatePresence>
                
                {/* 悬停提示 */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white p-4 rounded-lg shadow-lg z-10 w-64"
                    >
                      <div className="text-2xl mb-2">{traits[index].icon}</div>
                      <p className="text-gray-700 text-sm">{traits[index].description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>
            </h2>
          </div>
          
          {/* 导航按钮 */}
          <div className="flex justify-center gap-4 mt-4">
            {traits.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === index ? "bg-gray-900 w-4" : "bg-gray-300"
                }`}
                aria-label={`Go to trait ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 