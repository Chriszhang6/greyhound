"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StaticFAQ } from '@/components/ui/StaticFAQ';

// 手风琴组件
interface AccordionItemProps {
  title: string;
  emoji: string;
  children: React.ReactNode;
  isOpen: boolean;
  toggleAccordion: () => void;
}

const AccordionItem = ({ title, emoji, children, isOpen, toggleAccordion }: AccordionItemProps) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="flex justify-between items-center w-full py-4 px-6 text-left"
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          <span className="text-2xl mr-3">{emoji}</span>
          <span className="text-xl font-light">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pt-4 pb-6 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function About() {
  // 管理手风琴的打开状态
  const [openSection, setOpenSection] = useState<string | null>('history');
  
  // 切换手风琴的函数
  const toggleAccordion = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };
  
  // 标签页状态
  const [activeTab, setActiveTab] = useState<string>('general');
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[30vh] bg-gray-900">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center">
          <h1 className="text-4xl sm:text-5xl font-light text-white">
            Understanding Greyhounds
          </h1>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* 快速导览 */}
        <section className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-3xl font-light text-gray-900 mb-6 flex items-center">
            <span className="text-3xl mr-2">🐾</span> Greyhound Overview
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Greyhounds are gentle, elegant, and adaptable companions with a rich history. 
            Explore the sections below to learn more about these incredible dogs. 
            <span className="text-gray-900 font-medium">Click on each section to expand!</span>
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <span className="text-3xl block mb-2">🏆</span>
              <h3 className="font-medium mb-1">Rich History</h3>
              <p className="text-sm text-gray-600">4,000+ years of heritage</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <span className="text-3xl block mb-2">🛋️</span>
              <h3 className="font-medium mb-1">Couch Potatoes</h3>
              <p className="text-sm text-gray-600">Despite their speed</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <span className="text-3xl block mb-2">❤️</span>
              <h3 className="font-medium mb-1">Loving Companions</h3>
              <p className="text-sm text-gray-600">Great family pets</p>
            </div>
          </div>
        </section>

        {/* 手风琴内容区 */}
        <section className="bg-white shadow-sm rounded-lg overflow-hidden">
          <AccordionItem 
            title="Ancient Heritage, Modern Companion" 
            emoji="🏛️"
            isOpen={openSection === 'history'} 
            toggleAccordion={() => toggleAccordion('history')}
          >
            <p className="text-gray-600 leading-relaxed mb-4">
              Greyhounds have a rich history dating back over 4,000 years, making them one of the oldest dog breeds in existence. Originally bred in ancient Egypt and later cherished by nobility across Europe, these elegant dogs have evolved from hunting companions to beloved family pets.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today's retired racing greyhounds represent a unique opportunity to welcome a piece of living history into your home, transformed from athletic performers to gentle household companions.
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg mx-6 mb-6">
              <p className="text-sm italic text-gray-500">💡 <strong>Fun fact:</strong> Greyhounds are the only dog breed mentioned in the Bible!</p>
            </div>
          </AccordionItem>
          
          <AccordionItem 
            title="Physical Characteristics" 
            emoji="🏃‍♂️"
            isOpen={openSection === 'physical'} 
            toggleAccordion={() => toggleAccordion('physical')}
          >
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-4 flex items-center">
                  <span className="text-xl mr-2">📏</span> Build and Appearance
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Height: 27-30 inches for males, 25-28 inches for females</li>
                  <li>Weight: 65-85 pounds for males, 50-65 pounds for females</li>
                  <li>Sleek, aerodynamic body structure</li>
                  <li>Deep chest and narrow waist</li>
                  <li>Short, smooth coat in various colors</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-4 flex items-center">
                  <span className="text-xl mr-2">⚡</span> Athletic Capabilities
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Can reach speeds up to 45 mph</li>
                  <li>Excellent sight with a 270-degree field of vision</li>
                  <li>Powerful, muscular legs</li>
                  <li>Flexible spine for maximum speed</li>
                  <li>Efficient cardiovascular system</li>
                </ul>
              </div>
            </div>
          </AccordionItem>
          
          <AccordionItem 
            title="Personality & Temperament" 
            emoji="😊"
            isOpen={openSection === 'personality'} 
            toggleAccordion={() => toggleAccordion('personality')}
          >
            {/* 标签页导航 */}
            <div className="mb-6 border-b border-gray-200 px-6">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`py-2 px-4 text-sm focus:outline-none ${
                    activeTab === 'general' ? 'border-b-2 border-gray-900 text-gray-900 font-medium' : 'text-gray-500'
                  }`}
                >
                  General Temperament
                </button>
                <button
                  onClick={() => setActiveTab('social')}
                  className={`py-2 px-4 text-sm focus:outline-none ${
                    activeTab === 'social' ? 'border-b-2 border-gray-900 text-gray-900 font-medium' : 'text-gray-500'
                  }`}
                >
                  Social Behavior
                </button>
              </div>
            </div>
            
            {/* 标签页内容 */}
            <div className="tab-content px-6">
              {activeTab === 'general' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-start mb-4">
                    <span className="text-3xl mr-3 mt-1">🧸</span>
                    <p className="text-gray-600">
                      <strong className="text-gray-900">Gentle and calm:</strong> Greyhounds are known for their sweet, mild temperament. They're typically relaxed and easygoing, making them excellent companions.
                    </p>
                  </div>
                  <div className="flex items-start mb-4">
                    <span className="text-3xl mr-3 mt-1">💤</span>
                    <p className="text-gray-600">
                      <strong className="text-gray-900">Quiet and well-mannered:</strong> Greyhounds rarely bark and are generally very well-behaved indoors, often content to lounge on their bed or couch.
                    </p>
                  </div>
                  <div className="flex items-start mb-4">
                    <span className="text-3xl mr-3 mt-1">🧠</span>
                    <p className="text-gray-600">
                      <strong className="text-gray-900">Sensitive and intelligent:</strong> These dogs are quite smart and pick up on their owners' emotions. They respond best to gentle, positive training methods.
                    </p>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'social' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-start mb-4">
                    <span className="text-3xl mr-3 mt-1">🐕</span>
                    <p className="text-gray-600">
                      <strong className="text-gray-900">Good with other dogs:</strong> Most greyhounds get along well with other dogs, especially when properly introduced. Many have lived with other dogs during their racing careers.
                    </p>
                  </div>
                  <div className="flex items-start mb-4">
                    <span className="text-3xl mr-3 mt-1">🐱</span>
                    <p className="text-gray-600">
                      <strong className="text-gray-900">Small animals:</strong> Due to their hunting background, some greyhounds have a high prey drive. Individual testing is important to determine compatibility with cats and small pets.
                    </p>
                  </div>
                  <div className="flex items-start mb-4">
                    <span className="text-3xl mr-3 mt-1">👨‍👩‍👧‍👦</span>
                    <p className="text-gray-600">
                      <strong className="text-gray-900">Family bonds:</strong> Greyhounds form strong attachments to their humans and often become loving, loyal family members once they settle in.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </AccordionItem>
          
          <AccordionItem 
            title="Living With a Greyhound" 
            emoji="🏠"
            isOpen={openSection === 'living'} 
            toggleAccordion={() => toggleAccordion('living')}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-4 flex items-center">
                  <span className="text-xl mr-2">🏃‍♀️</span> Exercise Needs
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Despite their racing background, greyhounds are often referred to as "40-mph couch potatoes." They typically need:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                  <li>Two 20-minute walks daily</li>
                  <li>Occasional opportunity to run in a secure area</li>
                  <li>Mental stimulation through toys and games</li>
                  <li>Lots of rest time (greyhounds can sleep 16-18 hours a day! 😴)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-4 flex items-center">
                  <span className="text-xl mr-2">🛋️</span> Home Environment
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Adapt well to apartment living</li>
                  <li>Prefer soft bedding due to lean build</li>
                  <li>Need temperature-controlled environments (sensitive to heat and cold)</li>
                  <li>Appreciate quiet, peaceful spaces</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mx-0 md:mx-0">
                <p className="text-sm text-gray-600">
                  <span className="text-lg">💡</span> <strong>Pro tip:</strong> A comfortable dog bed is essential for greyhounds, as their low body fat means they need extra cushioning for their joints.
                </p>
              </div>
            </div>
          </AccordionItem>
          
          <AccordionItem 
            title="Health & Care" 
            emoji="🩺"
            isOpen={openSection === 'health'} 
            toggleAccordion={() => toggleAccordion('health')}
          >
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-4 flex items-center">
                  <span className="text-xl mr-2">🔍</span> Health Profile
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Generally healthy breed with 10-13 year lifespan</li>
                  <li>Sensitive to anesthesia and certain medications</li>
                  <li>Unique blood values normal for sighthounds</li>
                  <li>May have dental issues requiring regular care</li>
                  <li>Thin skin that can be prone to injuries</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-4 flex items-center">
                  <span className="text-xl mr-2">✅</span> Care Checklist
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Regular dental cleaning and checks</li>
                  <li>Coat care: occasional bathing and weekly brushing</li>
                  <li>Protection from extreme temperatures (coats in winter!)</li>
                  <li>Regular nail trimming (every 3-4 weeks)</li>
                  <li>Veterinarian familiar with sighthounds</li>
                </ul>
                <div className="mt-4 bg-gray-50 p-3 rounded-lg mx-0 md:mx-0">
                  <p className="text-sm italic text-gray-600">⚕️ Always inform your vet that your dog is a greyhound, as they have different normal blood values than other dogs.</p>
                </div>
              </div>
            </div>
          </AccordionItem>
          
          <AccordionItem 
            title="Adapting to Family Life" 
            emoji="👪"
            isOpen={openSection === 'family'} 
            toggleAccordion={() => toggleAccordion('family')}
          >
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                Retired racing greyhounds make wonderful family pets, but their transition to home life requires understanding and patience. Many everyday household items may be completely new to them!
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                <div className="text-center">
                  <span className="text-3xl block mb-2">🪞</span>
                  <p className="text-sm text-gray-600">Mirrors</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl block mb-2">📺</span>
                  <p className="text-sm text-gray-600">Television</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl block mb-2">🪜</span>
                  <p className="text-sm text-gray-600">Stairs</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl block mb-2">🚪</span>
                  <p className="text-sm text-gray-600">Glass Doors</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4 mx-0 md:mx-0">
                <h4 className="font-medium mb-2 flex items-center">
                  <span className="text-xl mr-2">⏱️</span> Adjustment Timeline
                </h4>
                <p className="text-gray-600 mb-2">Most greyhounds adjust to home life in stages:</p>
                <ol className="list-decimal list-inside text-gray-600 space-y-1">
                  <li><strong>Days 1-3:</strong> Getting comfortable with basic surroundings</li>
                  <li><strong>Weeks 1-2:</strong> Learning household routines</li>
                  <li><strong>Weeks 3-4:</strong> Beginning to show personality</li>
                  <li><strong>Months 2-3:</strong> Fully settling in as family member</li>
                </ol>
              </div>
              <p className="text-gray-600 italic">
                Remember that each greyhound is unique - some may adjust quickly while others take longer. Patience and consistent routines are key to a successful transition! 💕
              </p>
            </div>
          </AccordionItem>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gray-50 py-8 px-4 rounded-lg">
          <h2 className="text-3xl font-light text-gray-900 mb-6 flex items-center justify-center">
            <span className="text-3xl mr-2">🏡</span> Ready to Welcome a Greyhound?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            If you're inspired by these gentle giants and their remarkable qualities, consider giving a retired racing greyhound their forever home. These dogs have so much love to give and are waiting for families like yours.
          </p>
          <a
            href="/foster-adopt"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Learn About Adoption
          </a>
        </section>
      </div>

      {/* FAQ组件 */}
      <StaticFAQ />
    </div>
  );
} 