"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Jamie的照片数组
const jamiePhotos = [
  {
    id: 1,
    url: '/IMG_0618.jpeg',
    aspectRatio: '1/1.5', // 长方形照片
  },
  {
    id: 2,
    url: '/IMG_0624.jpeg',
    aspectRatio: '3/2', // 横向照片
  },
  {
    id: 3,
    url: '/IMG_1394.jpeg',
    aspectRatio: '1/1.5', // 长方形照片
  },
  {
    id: 4,
    url: '/IMG_1543.jpeg',
    aspectRatio: '1/1.5', // 长方形照片
  },
  {
    id: 5,
    url: '/IMG_0795.JPG',
    aspectRatio: '3/2', // 横向照片
  },
  {
    id: 6,
    url: '/IMG_0819.JPG',
    aspectRatio: '1/1.5', // 长方形照片
  }
];

export default function TributePage() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  return (
    <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* 纯白色背景，移除渐变效果 */}
      
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
        {/* 标题部分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 md:mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-light mb-4 text-gray-900">
            To Jamie
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
            This website is dedicated to Jamie, my first foster daughter, and to all the greyhounds looking for their forever homes. Jamie has now been happily adopted and is enjoying her new life.
          </p>
        </motion.div>

        {/* 照片墙 - 全新适配布局 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-5xl mx-auto mb-6 md:mb-8"
        >
          {/* 桌面端使用Grid布局 */}
          <div className="hidden md:grid md:grid-cols-4 gap-3 md:auto-rows-[150px]">
            {jamiePhotos.map((photo, index) => (
              <motion.div
                key={`desktop-${photo.id}`}
                // 移除layoutId以避免与模态框冲突
                className={`relative overflow-hidden rounded-xl ${
                  index % 3 === 0 ? 'col-span-1 row-span-2' : 
                  index % 3 === 1 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-2'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.02 }}
                onClick={() => !isDragging && setSelectedPhoto(photo.id)}
              >
                <Image
                  src={photo.url}
                  alt={`Jamie the greyhound - photo ${index + 1}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover hover:scale-105"
                  style={{ transition: "transform 0.5s ease" }}
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>

          {/* 移动端使用垂直布局，保持照片比例 */}
          <div className="md:hidden flex flex-col gap-4">
            {jamiePhotos.map((photo, index) => (
              <motion.div
                key={`mobile-${photo.id}`}
                // 移除layoutId以避免与模态框冲突
                className="relative overflow-hidden rounded-xl w-full"
                style={{ aspectRatio: photo.aspectRatio }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.02 }}
                onClick={() => !isDragging && setSelectedPhoto(photo.id)}
              >
                <Image
                  src={photo.url}
                  alt={`Jamie the greyhound - photo ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover hover:scale-105"
                  style={{ transition: "transform 0.5s ease" }}
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 说明文字 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-6"
        >
          <p className="text-gray-600 mb-4">
            By raising awareness about retired racing greyhounds, we can help these gentle souls
            find the loving homes they deserve after their racing careers.
          </p>

          <Link href="/home" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gray-900 text-white rounded-lg font-medium relative overflow-hidden group"
            >
              <span className="relative z-10">Start Exploring</span>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* 照片查看模态框 - 完全独立的动画系统 */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              // 移除layoutId，使用独立动画
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl h-auto max-h-[80vh] rounded-xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={jamiePhotos.find(p => p.id === selectedPhoto)?.url || ''}
                alt="Jamie the greyhound"
                width={1200}
                height={800}
                className="object-contain w-full h-full"
              />
              <motion.button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedPhoto(null)}
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
