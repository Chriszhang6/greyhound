"use client";

import Image from 'next/image';

export default function RunningGreyhound() {
  return (
    <div className="relative w-full h-full">
      <Image
        src="greyhound.jpg"
        alt="Greyhound"
        fill
        className="object-cover rounded-2xl shadow-2xl"
        priority
      />
    </div>
  );
} 