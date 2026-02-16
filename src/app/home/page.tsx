"use client";

import Link from "next/link";
import RunningGreyhound from "@/components/ui/RunningGreyhound";
import GreyhoundTraits from "@/components/ui/GreyhoundTraits";
import RacingGreyhoundInfo from '@/components/ui/RacingGreyhoundInfo';
import FosterAdopt from '@/components/ui/FosterAdopt';
import { StaticFAQ } from '@/components/ui/StaticFAQ';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gray-900">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-light mb-3">
                A New Beginning
              </h1>
              <p className="text-lg text-gray-100 mb-4">
                Give a retired racing greyhound the loving home they deserve. 
                These gentle souls make wonderful companions.
              </p>
              <div className="flex gap-4">
                <a
                  href="/about"
                  className="px-6 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Learn More
                </a>
                <a
                  href="/foster-adopt"
                  className="px-6 py-2 border-2 border-white text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Foster & Adopt
                </a>
              </div>
            </div>
            <div className="hidden md:block h-[300px]">
              <RunningGreyhound />
            </div>
          </div>
        </div>
      </section>

      {/* Greyhound Traits Section */}
      <GreyhoundTraits />

      {/* Racing Greyhound Info Section */}
      <RacingGreyhoundInfo />

      {/* Foster & Adopt Section */}
      <FosterAdopt />
      
      {/* FAQ Component */}
      <StaticFAQ />
    </main>
  );
} 