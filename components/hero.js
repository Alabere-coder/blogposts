"use client";

import { useState, useEffect } from "react";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed navigation */}

      <main>
        <div className="relative pt-24 lg:pt-28 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16 md:pb-24">
              {/* Left column - Content - Now spanning 5 columns on lg screens */}
              <div className="flex flex-col justify-center lg:col-span-5">
                <div className="flex items-center mb-6 sm:mb-8">
                  <span className="text-base sm:text-lg font-semibold text-blue-500 tracking-wide">
                    AL-HIKMAH UNIVERSITY ILORIN.
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6">
                  We're changing
                  <br className="hidden lg:block" /> the way people
                  <br className="hidden lg:block" /> connect
                </h1>

                <p className="text-base sm:text-lg text-gray-600"></p>

                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-x-6">
                  <Link
                    href="/login"
                    className="rounded-md bg-blue-500 px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus-visible:outline-offset-2 focus-visible:outline-blue-500 text-center sm:text-left"
                  >
                    Get started
                  </Link>
                  <Link
                    href="/login"
                    className="flex items-center justify-center sm:justify-start text-base font-medium text-gray-700 hover:text-blue-500 transition-colors"
                  >
                    View Posts
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Right column - Images grid - Now spanning 7 columns on lg screens */}
              <div className="relative lg:col-span-7">
                <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px]">
                  {/* Top right image */}
                  <div className="absolute right-0 top-0 w-[45%] h-[40%] overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfYsOToh8lLu9zkwAF6dOo2sqBEVRh37ycjQPD"
                      alt="Person working on laptop"
                      className="h-full w-full object-cover"
                      width={600}
                      height={450}
                      loading="eager"
                    />
                  </div>

                  {/* Middle left image */}
                  <div className="absolute left-0 top-[20%] w-[50%] h-[45%] overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfNGk4bfKo95eEv0YxGDVLlTSWdkAyb8aFmhJO"
                      alt="Modern office space"
                      className="h-full w-full object-cover"
                      width={600}
                      height={450}
                    />
                  </div>

                  {/* Bottom right image */}
                  <div className="absolute right-[5%] top-[45%] w-[40%] h-[50%] overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfZOZTC2U9C3gHFdyzTE0q7PpDnjchu6XsKk1l"
                      alt="Analytics dashboard"
                      className="h-full w-full object-cover"
                      width={600}
                      height={400}
                    />
                  </div>

                  {/* Bottom left image */}
                  <div className="absolute left-[10%] bottom-0 w-[35%] h-[30%] overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfhBVEU4u4JxgI1Ei3wHj6FV5GmcsPADLybTra"
                      alt="Team collaboration"
                      className="h-full w-full object-cover"
                      width={600}
                      height={400}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mini course section (as seen in reference image) - Improved responsiveness */}
        <div className="bg-gray-900 py-10 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="max-w-lg">
                <p className="text-blue-400 text-sm font-semibold tracking-widest mb-2">
                  5-DAY MINI-COURSE
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Build UIs that don't suck.
                </h2>
                <p className="text-gray-400 mb-6">
                  Short, tactical video lessons from the creator of Tailwind
                  CSS, delivered directly to your inbox every day for a week.
                </p>
                <a
                  href="#"
                  className="inline-block rounded-md bg-white px-4 py-2.5 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-100"
                >
                  Get the free course
                </a>
              </div>
              <div className="hidden md:block relative">
                {/* Course image with improved styling */}
                <div className="overflow-hidden rounded-xl bg-gray-800 shadow-xl">
                  <img
                    src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwf10z48CJOFX93mQuNfqBGyc5gpTKUoxs1kDRb"
                    alt="Course preview"
                    className="h-full w-full object-cover opacity-90"
                    width={600}
                    height={338}
                  />

                  {/* Play button overlay with improved styling */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white/30 backdrop-blur-sm p-4 hover:bg-white/40 transition-all duration-300 cursor-pointer">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
