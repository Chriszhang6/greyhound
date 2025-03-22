"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { AIChat } from '@/components/ui/AIChat';

// 互动问答组件
const FaqAccordion = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200">
      <button 
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-light">{question}</span>
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
            <p className="pb-4 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FosterAdopt() {
  // 激活的标签页状态
  const [activeTab, setActiveTab] = useState('adopt');
  
  return (
    <div className="bg-white">
      {/* Hero Section - 降低高度 */}
      <div className="relative h-[30vh] bg-gray-900">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center">
          <h1 className="text-4xl sm:text-5xl font-light text-white">
            Foster & Adopt
          </h1>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* 简短介绍 */}
        <section className="text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 leading-relaxed">
            Help a retired racing greyhound find their forever home. These gentle souls make wonderful 
            companions and are waiting for a loving family to welcome them.
          </p>
        </section>

        {/* 互动标签页 */}
        <section className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('adopt')}
                className={`py-4 px-6 text-lg font-light focus:outline-none ${
                  activeTab === 'adopt' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Adoption
              </button>
              <button
                onClick={() => setActiveTab('foster')}
                className={`py-4 px-6 text-lg font-light focus:outline-none ${
                  activeTab === 'foster' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Fostering
              </button>
              <button
                onClick={() => setActiveTab('organizations')}
                className={`py-4 px-6 text-lg font-light focus:outline-none ${
                  activeTab === 'organizations' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Organizations
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {/* 收养标签内容 */}
            {activeTab === 'adopt' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-4xl font-light text-gray-900 mb-2">1000+</div>
                    <div className="text-gray-600">Greyhounds Adopted Annually</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-4xl font-light text-gray-900 mb-2">50+</div>
                    <div className="text-gray-600">Adoption Organizations</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-4xl font-light text-gray-900 mb-2">95%</div>
                    <div className="text-gray-600">Success Rate in Homes</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-light text-gray-900 mb-4">Adoption Process</h3>
                
                {/* 使用手风琴组件替代大段文字 */}
                <div className="space-y-2">
                  <FaqAccordion 
                    question="What are the general requirements?" 
                    answer="To adopt a greyhound, you must be 18 years or older, have a secure fenced yard, time for daily exercise, financial ability to care for a dog, and commitment to long-term care." 
                  />
                  <FaqAccordion 
                    question="What are the application steps?" 
                    answer="The adoption process typically involves submitting an online application, a home check visit, meeting potential greyhounds, final approval, signing the adoption agreement, and bringing your greyhound home." 
                  />
                  <FaqAccordion 
                    question="What support is available after adoption?" 
                    answer="Most organizations offer ongoing support including training resources, behavioral guidance, and community events to help you and your greyhound adjust to your new life together." 
                  />
                </div>
              </motion.div>
            )}
            
            {/* 寄养标签内容 */}
            {activeTab === 'foster' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <p className="text-gray-600 leading-relaxed mb-6">
                  Fostering a greyhound is a rewarding experience that helps prepare these gentle dogs for their forever homes. As a foster carer, you'll provide temporary care and help them transition from racing life to family life.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-xl font-light text-gray-900 mb-4">Foster Carer Benefits</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>All expenses covered by organization</li>
                      <li>Veterinary care provided</li>
                      <li>Training support available</li>
                      <li>24/7 support from organization</li>
                      <li>Flexible commitment periods</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-xl font-light text-gray-900 mb-4">Foster Requirements</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Experience with dogs preferred</li>
                      <li>Time for daily care</li>
                      <li>Transportation for vet visits</li>
                      <li>Ability to attend training sessions</li>
                      <li>Patience and understanding</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* 组织标签内容 */}
            {activeTab === 'organizations' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-xl font-light text-gray-900 mb-4">Victoria</h3>
                    <ul className="space-y-4">
                      <li>
                        <a
                          href="https://gap.grv.org.au/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors font-medium underline"
                        >
                          Greyhound Adoption Program (GAP)
                        </a>
                        <p className="text-sm text-gray-500 mt-1">Victoria's largest greyhound adoption program</p>
                      </li>
                      <li>
                        <a
                          href="https://www.greyhoundrescue.com.au"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors font-medium underline"
                        >
                          Greyhound Rescue
                        </a>
                        <p className="text-sm text-gray-500 mt-1">Independent rescue organization</p>
                      </li>
                      <li>
                        <a
                          href="https://www.amazinggreys.com.au/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors font-medium underline"
                        >
                          Amazing Greys
                        </a>
                        <p className="text-sm text-gray-500 mt-1">Specializing in greyhound rescue and adoption in Australia</p>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-xl font-light text-gray-900 mb-4">Other States</h3>
                    <ul className="space-y-4">
                      <li>
                        <a
                          href="https://www.greyhoundadoption.com.au"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors font-medium underline"
                        >
                          Greyhound Adoption NSW
                        </a>
                        <p className="text-sm text-gray-500 mt-1">New South Wales adoption program</p>
                      </li>
                      <li>
                        <a
                          href="https://www.greyhoundadoptionqld.com.au"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors font-medium underline"
                        >
                          Greyhound Adoption Queensland
                        </a>
                        <p className="text-sm text-gray-500 mt-1">Queensland adoption program</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Ready to Make a Difference?</h2>
          <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            Whether you're interested in fostering or adopting, there's a greyhound waiting for you. Contact one of our partner organizations to start your journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://gap.grv.org.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Contact GAP
            </a>
            <a
              href="https://www.greyhoundrescue.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Contact Greyhound Rescue
            </a>
            <a
              href="https://www.amazinggreys.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Contact Amazing Greys
            </a>
          </div>
        </section>
      </div>

      {/* AI聊天组件 */}
      <AIChat />
    </div>
  );
} 