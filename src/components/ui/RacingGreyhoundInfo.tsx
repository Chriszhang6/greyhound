'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timelineStages = [
  {
    id: "puppy",
    label: "Puppy Stage",
    content: "Between 8 to 12 weeks old, racing greyhound puppies begin basic socialization training. They learn how to interact with humans and other dogs, gaining early life experiences and adapting to various environments. This stage focuses on developing their curiosity and adaptability.",
    icon: "🐶"
  },
  {
    id: "training",
    label: "Training Period",
    content: "At around 12 to 18 months old, greyhounds begin race training. They learn to chase artificial lures, develop endurance and speed, and get accustomed to track environments. Training sessions gradually increase in difficulty, helping them develop focus and reaction skills.",
    icon: "🏃"
  },
  {
    id: "racing",
    label: "Racing Career",
    content: "From 18 months to about 5 years of age, greyhounds participate in formal racing. They live in kennels, follow strict schedules including regular training, rest, and racing. This stage is structured and disciplined, with their lives revolving around racing calendars.",
    icon: "🏆"
  },
  {
    id: "retirement",
    label: "Retirement",
    content: "Most greyhounds retire between 2 and 5 years of age. After retirement, they need to transition to an entirely new lifestyle. This is a crucial stage where they need to learn how to live in an environment without strict schedules and find new purpose and fulfillment.",
    icon: "🕰️"
  },
  {
    id: "new-life",
    label: "New Life",
    content: "In adoptive homes, retired racing greyhounds begin a whole new chapter of life. They learn the rules of home living, such as climbing stairs, adapting to household noises, and forming emotional connections with family members. Support and patience at this stage are crucial for their successful transition to pet life.",
    icon: "🏠"
  }
];

export default function RacingGreyhoundInfo() {
  const [activeStage, setActiveStage] = useState("puppy");
  const [prevStage, setPrevStage] = useState("puppy");
  const [autoAdvance, setAutoAdvance] = useState(true);

  // Get the index of the active stage
  const activeIndex = timelineStages.findIndex(stage => stage.id === activeStage);
  
  // Handle auto-advancing through the timeline
  useEffect(() => {
    if (!autoAdvance) return;
    
    const interval = setInterval(() => {
      setPrevStage(activeStage);
      setActiveStage(current => {
        const currentIndex = timelineStages.findIndex(stage => stage.id === current);
        const nextIndex = (currentIndex + 1) % timelineStages.length;
        return timelineStages[nextIndex].id;
      });
    }, 8000); // Change stage every 8 seconds
    
    return () => clearInterval(interval);
  }, [activeStage, autoAdvance]);
  
  // Disable auto-advance when user interacts
  const handleStageClick = (stageId: string) => {
    setPrevStage(activeStage);
    setActiveStage(stageId);
    setAutoAdvance(false);
    
    // Resume auto-advance after 30 seconds of inactivity
    const timer = setTimeout(() => {
      setAutoAdvance(true);
    }, 30000);
    
    return () => clearTimeout(timer);
  };

  // Determine the animation direction
  const direction = (() => {
    const prevIndex = timelineStages.findIndex(stage => stage.id === prevStage);
    if (prevIndex === activeIndex) return 0;
    return prevIndex < activeIndex ? 1 : -1;
  })();

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-light text-center mb-6">
          Understanding Racing Greyhounds
        </h2>
        
        {/* Desktop Timeline Navigation */}
        <div className="hidden md:flex justify-between items-center mb-12 max-w-4xl mx-auto">
          {timelineStages.map((stage, index) => {
            const isActive = activeStage === stage.id;
            const isPast = timelineStages.findIndex(s => s.id === activeStage) > index;
            
            return (
              <div key={stage.id} className="relative flex flex-col items-center" style={{ width: `${100 / timelineStages.length}%` }}>
                {/* Connector Line */}
                {index < timelineStages.length - 1 && (
                  <div className="absolute h-[2px] w-full top-5 left-1/2 z-0 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gray-300" 
                      animate={{ 
                        background: isPast ? "rgb(31, 41, 55)" : "rgb(209, 213, 219)"
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
                
                {/* Stage Button */}
                <motion.button
                  onClick={() => handleStageClick(stage.id)}
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 transition-all duration-300 ${
                    isActive 
                      ? "bg-gray-900 text-white border-gray-900" 
                      : isPast 
                        ? "bg-gray-800 text-white border-gray-800" 
                        : "bg-white text-gray-600 border-gray-300"
                  }`}
                  aria-label={`View ${stage.label} information`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <span>{stage.icon}</span>
                </motion.button>
                
                {/* Stage Label */}
                <motion.span 
                  className={`text-sm font-medium text-center transition-colors ${
                    isActive 
                      ? "text-gray-900" 
                      : isPast 
                        ? "text-gray-700" 
                        : "text-gray-500"
                  }`}
                  animate={{ 
                    fontWeight: isActive ? 600 : 400,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {stage.label}
                </motion.span>
              </div>
            );
          })}
        </div>
        
        {/* Mobile Timeline Navigation */}
        <div className="md:hidden flex flex-wrap justify-center mb-8 gap-4">
          {timelineStages.map((stage) => {
            const isActive = activeStage === stage.id;
            
            return (
              <motion.button
                key={stage.id}
                onClick={() => handleStageClick(stage.id)}
                className={`px-3 py-2 rounded-full flex items-center gap-2 transition-all ${
                  isActive 
                    ? "bg-gray-900 text-white" 
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
                aria-label={`View ${stage.label} information`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <span>{stage.icon}</span>
                <span className="text-sm font-medium">{stage.label}</span>
              </motion.button>
            );
          })}
        </div>
        
        {/* Content Display Area */}
        <motion.div 
          className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md"
          initial={{ opacity: 0.9, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {timelineStages.map((stage) => (
              activeStage === stage.id && (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: direction * 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <motion.h3 
                    className="text-xl md:text-2xl font-light mb-4 md:mb-6 flex items-center justify-center"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <span className="text-2xl md:text-3xl mr-2">{stage.icon}</span> 
                    <span>{stage.label}</span>
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 leading-relaxed text-sm md:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {stage.content}
                  </motion.p>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Navigation Dots (Mobile and Desktop) */}
        <div className="flex justify-center mt-6 gap-2">
          {timelineStages.map((stage, index) => (
            <button
              key={stage.id}
              onClick={() => handleStageClick(stage.id)}
              className="p-1"
              aria-label={`Go to ${stage.label}`}
            >
              <motion.div 
                className="w-2 h-2 rounded-full"
                animate={{ 
                  backgroundColor: activeStage === stage.id 
                    ? "rgb(17, 24, 39)" 
                    : "rgb(209, 213, 219)" 
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          ))}
        </div>
        
        {/* Explanation Text */}
        <motion.div 
          className="max-w-3xl mx-auto mt-8 md:mt-12 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Retired racing greyhounds need our help to 
            <span className="inline-flex items-center mx-1 group">
              <span className="text-blue-600 font-medium group-hover:underline transition-all">adapt</span>
              <span className="ml-0.5 text-base transform group-hover:scale-110 transition-transform" aria-hidden="true">🔄</span>
            </span> 
            to their new lives as family pets. By understanding their background, we can better support their 
            <span className="inline-flex items-center mx-1 group">
              <span className="text-green-600 font-medium group-hover:underline transition-all">transition</span>
              <span className="ml-0.5 text-base transform group-hover:scale-110 transition-transform" aria-hidden="true">🚶‍♂️</span>
            </span> 
            from the track to the home, helping them become happy companions.
          </p>
          <p className="text-gray-600 mt-4 text-sm md:text-base leading-relaxed">
            Each greyhound has its own unique story and personality, but they all share a desire for 
            <span className="inline-flex items-center mx-1 group">
              <span className="text-amber-600 font-medium group-hover:underline transition-all">stability</span>
              <span className="ml-0.5 text-base transform group-hover:scale-110 transition-transform" aria-hidden="true">🏠</span>
            </span>, 
            <span className="inline-flex items-center mx-1 group">
              <span className="text-indigo-600 font-medium group-hover:underline transition-all">safety</span>
              <span className="ml-0.5 text-base transform group-hover:scale-110 transition-transform" aria-hidden="true">🛡️</span>
            </span>, 
            and 
            <span className="inline-flex items-center mx-1 group">
              <span className="text-red-600 font-medium group-hover:underline transition-all">love</span>
              <span className="ml-0.5 text-base transform group-hover:scale-110 transition-transform" aria-hidden="true">❤️</span>
            </span>.
          </p>
          
          {/* Visual separator */}
          <div className="flex justify-center items-center mt-5 space-x-1">
            <div className="h-0.5 w-4 bg-gray-300 rounded-full"></div>
            <div className="h-0.5 w-6 bg-gray-400 rounded-full"></div>
            <div className="h-0.5 w-8 bg-gray-500 rounded-full"></div>
            <div className="h-0.5 w-6 bg-gray-400 rounded-full"></div>
            <div className="h-0.5 w-4 bg-gray-300 rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 