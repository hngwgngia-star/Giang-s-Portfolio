import React from 'react';
import { Star, Lightbulb, Book, ArrowRight, Settings, Video, Shield, Target, Award } from 'lucide-react';
import contentData from '../data/contentData.json';

const icons = [Star, Lightbulb, Book, ArrowRight, Settings, Video, Shield, Target, Award];

interface HeaderProps {
  activeSlide: number;
  slidesCount: number;
}

export default function Header({ activeSlide, slidesCount }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-scrapbook border-b-4 border-graphite pt-4 pb-4 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
           <div className="w-12 h-12 bg-graphite rounded-lg flex items-center justify-center text-white font-bold text-2xl">
             G
           </div>
           <div className="flex flex-col">
             <h1 className="text-xl md:text-2xl font-heading font-black">GIANG'S PORTFOLIO</h1>
             <p className="text-xs md:text-sm italic opacity-70">Sư phạm Vật lí @ UEd-VNU</p>
           </div>
           <img src="./assets/s1_logo_vnued_02.png" alt="Logo" className="hidden opacity-90 mix-blend-multiply" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>
        
        {/* Scrollspy / Dashboard Links as bento nav-icons */}
        <nav className="flex space-x-2 md:space-x-3">
          {Array.from({ length: slidesCount }).map((_, idx) => {
            const Icon = icons[idx % icons.length];
            const isActive = activeSlide === idx;
            return (
              <a 
                key={idx} 
                href={`#${contentData.slides[idx].id}`}
                className={`group relative w-10 h-10 border-2 border-graphite rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-graphite text-white shadow-[3px_3px_0_var(--color-graphite)]' : 'bg-scrapbook text-graphite hover:bg-graphite/10'}`}
                title={contentData.slides[idx].primaryTitle}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                <span className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-graphite text-white text-xs font-bold whitespace-nowrap rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md z-50">
                  {contentData.slides[idx].primaryTitle}
                </span>
              </a>
             )
          })}
        </nav>
      </div>
    </header>
  );
}
