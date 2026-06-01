import React from 'react';

export default function MosaicGallery({ data, index }: { data: any, index: number }) {
  return (
    <div className="bg-graphite text-[#FAF6EE] p-8 border-doodle border-2 border-[#1A1A1A] shadow-solid shadow-[#FAF6EE]/50 relative overflow-hidden group">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-crosshatch opacity-30 transform rotate-45 scale-150 pointer-events-none filter invert"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-10">
            {/* Text Content Column */}
            <div className="w-full md:w-1/2 flex flex-col gap-8">
                <div className="prose prose-invert prose-lg">
                  {data.body.slice(0, 2).map((text: string, i: number) => (
                      <p key={i} className="text-xl font-heading font-medium border-l-4 border-marker pl-6">{text}</p>
                  ))}
                </div>
                
                {/* Embedded Cards */}
                <div className="border-doodle border-white/20 border-2 p-6 bg-white/5 backdrop-blur mt-4 hover:bg-white/10 transition-colors">
                   <p className="font-bold text-marker text-xl mb-4 font-heading">{data.body[2]}</p>
                   <ul className="text-md space-y-4 font-medium">
                       {data.body.slice(3, 6).map((text: string, i: number) => {
                           const [title, ...descArr] = text.split(': ');
                           const desc = descArr.join(': ');
                           return (
                             <li key={i} className="flex gap-3 items-start">
                               <span className="text-marker font-bold shrink-0">▸</span> 
                               <span className="opacity-90">
                                   {desc ? <><strong className="text-white underline decoration-wavy decoration-white/40">{title.replace('- ', '')}:</strong> {desc}</> : title.replace('- ', '')}
                               </span>
                             </li>
                           )
                       })}
                   </ul>
                </div>
                
                <div className="border-doodle border-white/20 border-2 p-6 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors">
                   <p className="font-bold text-marker text-xl mb-4 font-heading">{data.body[6]}</p>
                   <ul className="text-md space-y-4 font-medium">
                       {data.body.slice(7).map((text: string, i: number) => {
                           const [title, ...descArr] = text.split(': ');
                           const desc = descArr.join(': ');
                           return (
                             <li key={i} className="flex gap-3 items-start">
                               <span className="text-marker font-bold shrink-0">▸</span> 
                               <span className="opacity-90">
                                   {desc ? <><strong className="text-white underline decoration-wavy decoration-white/40">{title.replace('- ', '')}:</strong> {desc}</> : title.replace('- ', '')}
                               </span>
                             </li>
                           )
                       })}
                   </ul>
                </div>
            </div>
            
            {/* Gallery Interactive Column */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 justify-center">
                 {data.images && Object.values(data.images).map((src: any, i: number) => (
                     <div key={i} className="w-full relative group/card cursor-pointer border-doodle border-2 border-white/40 overflow-hidden bg-white/10 aspect-video flex items-center justify-center transform transition-transform duration-300 hover:scale-[1.02]">
                         <img src={src} className="object-cover w-full h-full opacity-50 mix-blend-overlay group-hover/card:scale-105 group-hover/card:opacity-90 transition-all duration-500" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                         
                         <div className="absolute inset-0 bg-graphite/40 group-hover/card:bg-transparent transition-colors duration-300 pointer-events-none"></div>
                         
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                            <span className="border-doodle border-white bg-graphite text-white font-heading text-xl px-6 py-2 shadow-solid transform -rotate-2">
                                Khám Phá Thẻ {i+1}
                            </span>
                         </div>
                     </div>
                 ))}
            </div>
        </div>
    </div>
  );
}
