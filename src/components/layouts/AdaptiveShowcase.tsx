import React from 'react';

export default function AdaptiveShowcase({ data, index }: { data: any, index: number }) {
  return (
    <div className="flex flex-col gap-10">
      {/* Top Details Box */}
      <div className="bg-scrapbook border-doodle shadow-solid p-6 md:p-10 flex flex-col md:flex-row gap-10 relative">
          <div className="w-full md:w-1/3 border-b-2 md:border-b-0 md:border-r-2 border-graphite/20 pb-6 md:pb-0 md:pr-8 flex flex-col justify-start">
             <div className="border-doodle border-2 bg-marker text-white px-4 py-2 font-heading font-bold transform -rotate-1 self-start mb-4">
                Mục tiêu
             </div>
             <p className="text-md leading-relaxed font-medium">{data.body[0]}</p>
             
             {data.highlights && data.highlights.map((hl: string, i: number) => {
               const [title, desc] = hl.split(': ');
               return (
                 <div key={i} className="mt-8 border-doodle border-2 p-5 bg-[#FAF6EE] relative hover-vibrate">
                    <div className="absolute -top-4 right-2 bg-white border-2 border-doodle text-marker text-xs px-3 py-1 font-heading transform rotate-3">Lưu ý</div>
                    {desc ? (
                      <>
                        <p className="font-heading font-bold text-lg mb-1">{title}</p>
                        <p className="text-sm">{desc}</p>
                      </>
                    ) : (
                      <p className="font-medium">{hl}</p>
                    )}
                 </div>
               )
             })}
          </div>
          <div className="w-full md:w-2/3 flex flex-col gap-6">
              <div>
                <p className="font-heading font-bold text-xl marker-highlight leading-relaxed">{data.body[1]}</p>
              </div>
              
              <div className="flex flex-col gap-6 w-full">
                 {data.body.slice(2).map((b: string, i: number) => {
                    const lines = b.split('\n');
                    const taskTitle = lines[0];
                    const promptItems = lines.slice(1);
                    return (
                      <div key={i} className="p-5 border-doodle border-2 bg-white relative">
                          <h4 className="font-bold underline mb-3 text-lg">{taskTitle}</h4>
                          <ul className="space-y-3 font-medium text-sm">
                              {promptItems.map((item, idx) => {
                                 const isAdvanced = item.includes('Nâng cao');
                                 return (
                                     <li key={idx} className={`p-3 rounded-lg border-2 border-dashed ${isAdvanced ? 'border-marker bg-marker/5' : 'border-graphite/20 bg-graphite/5'}`}>
                                        {item}
                                     </li>
                                 )
                              })}
                          </ul>
                      </div>
                    )
                 })}
              </div>
          </div>
      </div>

      {/* Matrix Images Row */}
      <div className="w-full bg-[#FAF6EE] p-6 border-doodle border-4 border-dashed relative">
          <div className="absolute top-0 left-4 -translate-y-1/2 bg-graphite text-white px-4 py-1 text-sm font-heading border-doodle border-white border-2">Assets Gallery</div>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
             {data.images && Object.values(data.images).map((src: any, i: number) => (
               <div key={i} className="shrink-0 w-80 lg:w-[45%] h-64 bg-white border-doodle border-2 flex items-center justify-center overflow-hidden grayscale-[30%] hover:grayscale-0 transition-all mix-blend-multiply bg-crosshatch cursor-pointer snap-center group">
                  <img src={src} alt="Matrix Asset" className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="px-4 font-heading text-sm">Missing Image</span>'; }} />
               </div>
             ))}
          </div>
      </div>
    </div>
  );
}
