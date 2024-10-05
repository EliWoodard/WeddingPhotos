'use client'

import React from 'react';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

export default function WeddingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use relative paths based on the `public` folder
  const images = [
    "/Images/ExampleImage.jpg",
    "/Images/ExampleImage.jpg",
    "/Images/ExampleImage.jpg",
    "/Images/ExampleImage.jpg",
  ];

  useEffect(() => {
    if (videoRef.current) {
      const updateDuration = () => setDuration(videoRef.current?.duration || 0);
      videoRef.current.addEventListener('loadedmetadata', updateDuration);

      return () => {
        videoRef.current?.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-serif">
      {/* Header Section */}
      <header
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
      >
        <div className="text-center text-white z-10">
          <h1 className="text-4xl md:text-6xl mb-4 font-light animate-fade-in-down">Wedding Photos</h1>
          <h2 className="text-5xl md:text-7xl font-semibold mb-2 animate-fade-in-up">Elizabeth & Justin</h2>
          <p className="text-2xl md:text-3xl animate-fade-in-up">10.19.24</p>
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </header>

      {/* Video Section */}
      <section className="py-16 bg-gradient-to-b from-pink-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative aspect-w-16 aspect-h-9 mb-4">
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                onTimeUpdate={handleTimeUpdate}
              >
                <source src="/placeholder-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={48} /> : <Play size={48} />}
              </button>
            </div>
            <input
              type="range"
              min="0"
              max={duration.toFixed(2)}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16">
        <h2 className="text-4xl md:text-5xl text-center mb-12 font-light">Photos</h2>
        <div className="relative max-w-4xl mx-auto">
          <button
            onClick={prevImage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md z-10 transition-opacity hover:bg-opacity-75"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {images.map((src, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Image
                    src={src}
                    alt={`Wedding photo ${index + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={nextImage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md z-10 transition-opacity hover:bg-opacity-75"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
}
