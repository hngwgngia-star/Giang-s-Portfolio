import React from 'react';

export default function BentoGrid({ data, index }: { data: any, index: number }) {
  const images = data.images ? Object.values(data.images) : [];

  return (
    <div className="bg-scrapbook p-6 md:p-8 border-doodle shadow-solid relative w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          
          {/* Main big box (usually the first and biggest content block) */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
             <div className="border-doodle border-2 p-6 bg-white hover-vibrate transform rotate-[0.5deg]">
                <div className="prose prose-md">
                   {data.body[0] && <p className="whitespace-pre-wrap leading-relaxed">{data.body[0]}</p>}
                </div>
             </div>
             
             {/* Center Large Image if exists */}
             {images[1] && (
               <div className="border-doodle border-2 p-2 bg-white flex items-center justify-center min-h-[300px] w-full bg-crosshatch overflow-hidden relative group transform -rotate-[0.5deg]">
                  <img src={images[1] as string} alt="" className="object-cover w-full h-full opacity-85 mix-blend-multiply grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" onError={(e) => e.currentTarget.style.display = 'none'} />
                  <div className="absolute top-4 left-4 bg-graphite text-white font-heading text-sm px-3 py-1 border-doodle border-2 border-white transform -rotate-3 group-hover:rotate-0 transition-transform">Asset Viewer</div>
               </div>
             )}
          </div>
          
          {/* Sidebar boxes in Bento */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
             {/* Secondary Content */}
             <div className="border-doodle border-2 p-6 bg-[#FAF6EE] shadow-sm border-dashed">
                {data.body[1] && <div className="prose prose-md"><p className="whitespace-pre-wrap leading-relaxed">{data.body[1]}</p></div>}
             </div>
             
             {/* Secondary Image */}
             {images[0] && (
               <div className="border-doodle border-2 p-2 bg-white flex items-center justify-center h-48 bg-crosshatch overflow-hidden relative group">
                  <div className="absolute top-2 right-2 bg-marker text-white text-xs px-2 py-1 font-heading transform rotate-3 border-doodle border-white border-2">Reference</div>
                  <img src={images[0] as string} alt="" className="object-cover w-full h-full opacity-80 mix-blend-multiply grayscale hover:grayscale-0 transition-all origin-bottom" onError={(e) => e.currentTarget.style.display = 'none'} />
               </div>
             )}
             
             {/* Highlights (acting like sticky notes) */}
             {data.highlights && data.highlights.map((hl: string, i: number) => {
                const [title, desc] = hl.split(': ');
                return (
                  <div key={i} className="border-doodle border-2 p-4 bg-white text-graphite transform hover:-translate-y-2 transition-transform duration-300 relative">
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-marker/20 opacity-50 border border-marker/40"></div>
                     <p className="font-bold font-heading text-marker text-lg">{title}</p>
                     <p className="mt-2 text-sm leading-relaxed">{desc}</p>
                  </div>
                )
             })}

             {/* Tertiary Image (e.g. Drive Link Button or smaller asset) */}
             {images[2] && (
               <div className="mt-auto border-doodle border-2 bg-graphite text-white p-4 flex items-center justify-center hover:bg-marker transition-colors cursor-pointer group">
                  <span className="font-heading font-bold text-lg mr-2 group-hover:rotate-12 transition-transform">▸</span>
                  <span className="font-heading text-lg">View Resource File</span>
               </div>
             )}
          </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-crosshatch opacity-10 pointer-events-none transform translate-x-10 translate-y-10 rounded-full border-4 border-dashed border-graphite"></div>
    </div>
  );
}
