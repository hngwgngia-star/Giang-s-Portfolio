import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smile, Crown, Star, Sun, Zap, Heart, Palette, Sparkles, Music } from 'lucide-react';
import Header from './components/Header';
import contentData from './data/contentData.json';

import SplitDashboard from './components/layouts/SplitDashboard';
import BentoGrid from './components/layouts/BentoGrid';
import AdaptiveShowcase from './components/layouts/AdaptiveShowcase';
import MosaicGallery from './components/layouts/MosaicGallery';
import HeroLayout from './components/layouts/HeroLayout';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slides = gsap.utils.toArray('.slide-section');
    
    slides.forEach((slide: any, index) => {
      ScrollTrigger.create({
        trigger: slide,
        start: 'top 40%',
        end: 'bottom 40%',
        onToggle: self => {
          if (self.isActive) setActiveSlide(index);
        }
      });
      
      // Add GSAP entry animation for each slide
      gsap.fromTo(slide, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: slide,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const renderLayout = (slide: any, index: number) => {
    switch (slide.layout) {
      case 'Split Dashboard': return <SplitDashboard data={slide} index={index} />;
      case 'Bento Grid': return <BentoGrid data={slide} index={index} />;
      case 'Adaptive Showcase': return <AdaptiveShowcase data={slide} index={index} />;
      case 'Mosaic Gallery': return <MosaicGallery data={slide} index={index} />;
      case 'Hero Layout': return <HeroLayout data={slide} index={index} />;
      default: return <div className="p-8 border-doodle border-2">{slide.primaryTitle}</div>;
    }
  };

  const getCuteIcon = (index: number) => {
    switch(index) {
      case 0: return <Smile className="inline-block relative -top-1 ml-3 text-pink-500 w-8 h-8 md:w-10 md:h-10 transform -rotate-6 transition-transform duration-300 hover:rotate-12 hover:scale-110" />;
      case 1: return <Crown className="inline-block relative -top-1 ml-3 text-yellow-500 w-8 h-8 md:w-10 md:h-10 transform rotate-6 transition-transform duration-300 hover:-rotate-12 hover:scale-110" />;
      case 2: return <Star className="inline-block relative -top-1 ml-3 text-amber-500 w-8 h-8 md:w-10 md:h-10 transform -rotate-3 transition-transform duration-300 hover:rotate-12 hover:scale-110" />;
      case 3: return <Sun className="inline-block relative -top-1 ml-3 text-orange-500 w-8 h-8 md:w-10 md:h-10 animate-spin-slow hover:text-orange-400" />;
      case 4: return <Zap className="inline-block relative -top-1 ml-3 text-blue-500 w-8 h-8 md:w-10 md:h-10 transform rotate-12 transition-transform duration-300 hover:-rotate-6 hover:scale-110" />;
      case 5: return <Heart className="inline-block relative -top-1 ml-3 text-red-500 w-8 h-8 md:w-10 md:h-10 transform -rotate-6 animate-pulse hover:text-red-400" />;
      case 6: return <Palette className="inline-block relative -top-1 ml-3 text-purple-500 w-8 h-8 md:w-10 md:h-10 transform rotate-6 transition-transform duration-300 hover:-rotate-12 hover:scale-110" />;
      case 7: return <Sparkles className="inline-block relative -top-1 ml-3 text-emerald-500 w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 hover:rotate-12 hover:scale-110" />;
      case 8: return <Music className="inline-block relative -top-1 ml-3 text-indigo-500 w-8 h-8 md:w-10 md:h-10 transform -rotate-12 transition-transform duration-300 hover:rotate-6 hover:scale-110" />;
      default: return <Smile className="inline-block relative -top-1 ml-3 text-pink-500 w-8 h-8 md:w-10 md:h-10" />;
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen pt-28 pb-20 overflow-x-hidden selection:bg-marker selection:text-white relative">
      <div className="scribble-bg"></div>
      <div className="relative z-10 w-full flex flex-col items-center">
        <Header activeSlide={activeSlide} slidesCount={contentData.slides.length} />
        
        <main className="max-w-7xl w-full px-6 flex flex-col gap-32">
          {contentData.slides.map((slide, index) => (
            <section key={slide.id} id={slide.id} className="slide-section w-full relative">
              <div className="mb-10 text-center md:text-left">
                 <h2 className="font-bold text-3xl md:text-5xl mb-4 marker-highlight lining-nums flex items-center justify-center md:justify-start" style={{ fontFamily: 'Verdana, Arial, sans-serif' }}>
                   {slide.primaryTitle}
                   {getCuteIcon(index)}
                 </h2>
                 <h3 className="text-xl md:text-2xl text-graphite/80 font-medium block w-full leading-relaxed mt-3 double-line lining-nums" style={{ fontFamily: 'Verdana, Arial, sans-serif' }}>
                   {slide.secondaryTitle}
                 </h3>
              </div>
              {renderLayout(slide, index)}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
