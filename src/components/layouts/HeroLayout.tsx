import React from 'react';

export default function HeroLayout({ data, index }: { data: any, index: number }) {
  return (
    <div className="relative w-full min-h-[70vh] border-doodle border-4 border-graphite shadow-solid overflow-hidden flex flex-col items-center justify-center text-center p-8 bg-graphite group">
        
       {/* Background Image Layer with Heavy Overlay */}
       {data.images && Object.values(data.images)[0] && (
         <div className="absolute inset-0 z-0 overflow-hidden">
             <img src={Object.values(data.images)[0] as string} className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-in-out" alt="Background reflection" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
             {/* Overlay specific to S9 request: rgba(10, 13, 20, 0.85) */}
             <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10, 13, 20, 0.80)' }}></div>
         </div>
       )}

       <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-16 items-center">
            {/* Giant Typography quote */}
            <div className="relative">
                <span className="absolute -top-12 -left-10 text-white/10 font-heading text-9xl">"</span>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#FAF6EE] leading-tight md:leading-tight drop-shadow-md z-10 relative">
                    {data.body[0].replace(/"/g, '')}
                </h1>
                <span className="absolute -bottom-20 -right-10 text-white/10 font-heading text-9xl">"</span>
            </div>
            
            {/* Bento-style Highlight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left mt-8">
                {data.highlights && data.highlights.map((hl: string, i: number) => {
                    const [title, desc] = hl.split(': ');
                    return (
                        <div key={i} className="border-doodle border-white/20 border-2 p-6 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors hover-vibrate relative overflow-hidden group/card">
                            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-marker/20 rounded-full blur-xl group-hover/card:bg-marker/40 transition-colors"></div>
                            <p className="font-bold text-marker font-heading text-2xl mb-3 relative z-10">{title}</p>
                            <p className="text-[#FAF6EE]/90 text-md leading-relaxed font-medium relative z-10">
                                {desc}
                            </p>
                        </div>
                    );
                })}
            </div>
       </div>
    </div>
  );
}
