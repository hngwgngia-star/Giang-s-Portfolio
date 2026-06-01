import React from 'react';

const renderTextWithLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = linkRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(
            <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold cursor-pointer">
                {match[1]}
            </a>
        );
        lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
};

export default function SplitDashboard({ data, index }: { data: any, index: number }) {
  // Enforce specific logic for image placement based on Slide number (index)
  // S1 (index 0) = Image Right
  // S3 (index 2) = Image Left (Browser View)
  // S7 (index 6) = Image Right
  const isImageRight = index === 0 || index === 6;
  const imageValues = data.images ? Object.values(data.images).filter(img => typeof img === 'string' && !img.includes('logo')) : [];
  const hasImages = imageValues.length > 0;
  
  const hasInlineImagesInBody = Array.isArray(data.body) && data.body.some((txt: string) => txt.includes("Quy tắc đặt tên tệp áp dụng"));

  return (
    <div className={`flex flex-col ${isImageRight && !hasInlineImagesInBody ? 'md:flex-row' : !hasInlineImagesInBody ? 'md:flex-row-reverse' : ''} gap-10 items-stretch`}>
      <div className={`w-full ${hasImages && !hasInlineImagesInBody ? 'md:w-[60%]' : ''} flex flex-col gap-6`}>
        
        {/* S1: Personal Info at the top */}
        {index === 0 && data.highlights && data.highlights.length > 0 && (
          <div className="bg-white p-6 border-doodle border-dashed border-2 relative mt-4 shadow-sm hover:shadow-solid transition-shadow">
             <div className="absolute -top-4 left-6 bg-marker text-white px-4 py-1 text-sm font-heading transform -rotate-3 border-2 border-graphite box-shadow-solid">
               Thông tin cá nhân
             </div>
              <ul className="list-disc pl-5 mt-4 space-y-3">
              {data.highlights.map((hl: string, i: number) => {
                 const [boldPart, rest] = hl.split(': ');
                 return (
                  <li key={i} className="text-md leading-relaxed my-2">
                    {rest ? <><strong className="font-bold marker-highlight mr-1">{boldPart}:</strong> {renderTextWithLinks(rest)}</> : renderTextWithLinks(hl)}
                  </li>
                 )
              })}
             </ul>
          </div>
        )}

        {index === 0 ? (
          <>
            {data.body[0] && (
              <div className="bg-scrapbook p-6 md:p-10 border-doodle shadow-solid group relative">
                <h3 className="font-heading font-bold text-2xl mb-4 text-graphite">Định hướng phát triển</h3>
                <div className="prose prose-lg text-graphite font-body">
                   <p className="mb-4 leading-relaxed whitespace-pre-wrap">{renderTextWithLinks(data.body[0])}</p>
                </div>
              </div>
            )}

            {data.body.length > 1 && (
              <div className="bg-scrapbook p-6 md:p-10 border-doodle shadow-solid group relative">
                <h3 className="font-heading font-bold text-2xl mb-4 text-graphite">Mục tiêu của Portfolio Kỹ thuật số</h3>
                <div className="prose prose-lg text-graphite font-body">
                  {data.body.slice(1).map((text: string, i: number) => {
                      if (text.includes(" | ")) {
                         const parts = text.split(" | ");
                         return (
                             <div key={i} className="my-4 border-doodle border-2 border-dashed p-4 bg-[#f2ede4] font-medium text-sm rounded-lg hover-vibrate block">
                                <p className="text-marker font-bold font-heading mb-1">{renderTextWithLinks(parts[0])}</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                   {parts.slice(1).map((p, j) => <li key={j}>{renderTextWithLinks(p)}</li>)}
                                </ul>
                             </div>
                         );
                      }
                      if (text.includes("Mục tiêu của Portfolio")) return null;
                      return <p key={i} className="mb-4 leading-relaxed whitespace-pre-wrap">{renderTextWithLinks(text)}</p>
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          data.body.map((text: string, i: number) => {
            const isTargetSection = text.includes("Quy tắc đặt tên tệp áp dụng") || text.includes("Minh chứng đính kèm: [Hệ thống 4 ảnh");
            return (
              <div key={i} className="bg-scrapbook p-6 md:p-10 border-doodle shadow-solid group relative">
                  <div className="prose prose-lg text-graphite font-body max-w-full">
                    {(() => {
                        if (text.includes(" | ")) {
                           const parts = text.split(" | ");
                           return (
                               <div className="my-4 border-doodle border-2 border-dashed p-4 bg-[#f2ede4] font-medium text-sm rounded-lg hover-vibrate block">
                                  <p className="text-marker font-bold font-heading mb-1">{renderTextWithLinks(parts[0])}</p>
                                  <ul className="list-disc pl-5 mt-2 space-y-1">
                                     {parts.slice(1).map((p, j) => <li key={j}>{renderTextWithLinks(p)}</li>)}
                                  </ul>
                               </div>
                           );
                        }
                        
                        const lines = text.split('\n');
                        const isListWithTitle = lines.length > 1 && /^\d+\.\s/.test(lines[0]);
                        
                        return (
                            <div className={isListWithTitle ? "mb-4" : ""}>
                                {isListWithTitle && (
                                    <h4 className="font-heading font-bold text-xl text-graphite mb-3 pb-1 border-b-2 border-graphite/20 inline-block lining-nums" style={{ fontFamily: 'Verdana, Arial, sans-serif' }}>{lines[0]}</h4>
                                )}
                                <div className="leading-relaxed space-y-2">
                                    {(isListWithTitle ? lines.slice(1) : lines).map((line, lIdx) => {
                                        const trimmed = line.trim();
                                        if (!trimmed) return null;
                                        
                                        const bulletMatch = trimmed.match(/^([•o\-])\s+(.*)/);
                                        const numberedMatch = trimmed.match(/^(\d+\.)\s+(.*)/);
                                        
                                        if (bulletMatch || numberedMatch) {
                                            const match = bulletMatch || numberedMatch;
                                            const bullet = match![1];
                                            const content = match![2];
                                            const spaceMatch = line.match(/^(\s+)/);
                                            const spaceLen = spaceMatch ? spaceMatch[1].length : 0;
                                            
                                            let ml = 'ml-0';
                                            if (spaceLen >= 10 || bullet === 'o') ml = 'ml-12';
                                            else if (spaceLen >= 6) ml = 'ml-8';
                                            else if (spaceLen >= 1 || bullet === '•' || numberedMatch) ml = 'ml-4';
                                            
                                            return (
                                                <div key={lIdx} className={`flex ${ml}`}>
                                                    <span className="mr-2 flex-shrink-0 w-5 text-center">{bullet === 'o' ? '○' : bullet}</span>
                                                    <span>{renderTextWithLinks(content)}</span>
                                                </div>
                                            );
                                        }

                                        const folderMatch = trimmed.match(/^(📁.*)/);
                                        if (folderMatch) {
                                            const spaceMatch = line.match(/^(\s+)/);
                                            const spaceLen = spaceMatch ? spaceMatch[1].length : 0;
                                            let ml = 'ml-12';
                                            if (spaceLen >= 20) ml = 'ml-24';
                                            else if (spaceLen >= 15) ml = 'ml-20';
                                            else if (spaceLen >= 10) ml = 'ml-16';

                                            return (
                                                <div key={lIdx} className={`flex ${ml} my-1`}>
                                                    <span>{renderTextWithLinks(trimmed)}</span>
                                                </div>
                                            );
                                        }

                                        if (trimmed.startsWith('[IMAGE:')) {
                                            const imgSrc = trimmed.match(/\[IMAGE:\s*(.+?)\]/)?.[1];
                                            if (imgSrc) {
                                                return (
                                                    <div key={lIdx} className="mt-2 mb-4 flex justify-center">
                                                        <img src={imgSrc} alt="Minh hoạ" className="max-w-full h-auto object-contain border border-graphite/20 rounded shadow-sm" />
                                                    </div>
                                                );
                                            }
                                        }

                                        if (trimmed.startsWith('[VIDEO:')) {
                                            const videoSrc = trimmed.match(/\[VIDEO:\s*(.+?)\]/)?.[1];
                                            if (videoSrc) {
                                                return (
                                                    <div key={lIdx} className="mt-2 mb-4 relative rounded overflow-hidden border border-graphite/20 shadow-sm bg-black/5">
                                                        <video 
                                                            controls 
                                                            preload="auto" 
                                                            playsInline 
                                                            className="w-full h-auto object-contain"
                                                        >
                                                            <source src={videoSrc} type={videoSrc.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                                                            Trình duyệt của bạn không hỗ trợ thẻ video.
                                                        </video>
                                                    </div>
                                                );
                                            }
                                        }

                                        if (trimmed.startsWith('[YOUTUBE:')) {
                                            const ytSrc = trimmed.match(/\[YOUTUBE:\s*(.+?)\]/)?.[1];
                                            if (ytSrc) {
                                                const embedUrl = ytSrc.includes('youtube.com') || ytSrc.includes('youtu.be') ? 
                                                    ytSrc.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/') : ytSrc;
                                                return (
                                                    <div key={lIdx} className="mt-2 mb-4 aspect-video w-full rounded overflow-hidden border border-graphite/20 shadow-sm">
                                                        <iframe 
                                                            src={embedUrl} 
                                                            title="YouTube video player" 
                                                            frameBorder="0" 
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                            allowFullScreen
                                                            className="w-full h-full"
                                                        ></iframe>
                                                    </div>
                                                );
                                            }
                                        }

                                        if (index === 8 && lIdx === 0) {
                                            return (
                                                <h4 key={lIdx} className="font-heading font-bold text-xl text-graphite mb-3 pb-1 border-b-2 border-graphite/20 inline-block lining-nums" style={{ fontFamily: 'Verdana, Arial, sans-serif' }}>
                                                    {renderTextWithLinks(trimmed)}
                                                </h4>
                                            );
                                        }
                                        if (isListWithTitle && lIdx === 0 && !bulletMatch && !numberedMatch) {
                                            return <p key={lIdx} className="ml-0 mb-2">{renderTextWithLinks(trimmed)}</p>;
                                        }
                                        return <p key={lIdx} className="ml-0">{renderTextWithLinks(trimmed)}</p>;
                                    })}
                                </div>
                            </div>
                        );
                    })()}

                    {/* Inline Images for Specific Section */}
                    {isTargetSection && hasImages && (
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
                            {imageValues.map((imgSrc: any, idx: number) => (
                                <div key={idx} className="border-doodle bg-white p-3 shadow-solid transform transition duration-300 hover:scale-[1.02]">
                                    <div className="bg-crosshatch w-full overflow-hidden relative border-doodle border-1 flex items-center justify-center text-center">
                                        <img 
                                            src={imgSrc} 
                                            alt={`Minh họa ${idx + 1}`} 
                                            className="object-contain w-full h-auto" 
                                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%239ca3af'%3EKhu v%E1%BB%B1c hi%E1%BB%83n th%E1%BB%8B %E1%BA%A3nh%3C/text%3E%3C/svg%3E"; }} 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                  </div>
              </div>
            )
          })
        )}
        
        {index !== 0 && data.highlights && data.highlights.length > 0 && (
          <div className="bg-white p-6 border-doodle border-dashed border-2 relative mt-4 shadow-sm hover:shadow-solid transition-shadow">
             <div className="absolute -top-4 left-6 bg-marker text-white px-4 py-1 text-sm font-heading transform -rotate-3 border-2 border-graphite box-shadow-solid">
               Highlights
             </div>
             <ul className="list-disc pl-5 mt-4 space-y-3">
              {data.highlights.map((hl: string, i: number) => {
                 const [boldPart, rest] = hl.split(': ');
                 return (
                  <li key={i} className="text-md leading-relaxed my-2">
                    {rest ? <><strong className="font-bold marker-highlight mr-1">{boldPart}:</strong> {renderTextWithLinks(rest)}</> : renderTextWithLinks(hl)}
                  </li>
                 )
              })}
             </ul>
          </div>
        )}
      </div>

      {hasImages && !hasInlineImagesInBody && (
        <div className={`w-full md:w-[40%] ${imageValues.length > 3 ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 h-fit' : 'flex flex-col items-center justify-start gap-6 sticky top-32 self-start'}`}>
          {imageValues.map((imgSrc: any, i: number) => {
            return (
              <div key={i} className={`border-doodle bg-scrapbook shadow-solid w-full transition-transform duration-300 ${i % 2 === 0 ? 'rotate-1 hover:rotate-0' : '-rotate-1 hover:rotate-0'} p-2`}>
                {/* Polar style wrapper */}
                <div className="bg-crosshatch w-full overflow-hidden relative border-doodle border-1 flex items-center justify-center text-center group cursor-pointer bg-white">
                   <img 
                      src={imgSrc} 
                      alt="Visual Asset" 
                      className="object-contain w-full h-auto" 
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%239ca3af'%3E%E1%BA%A2nh%3C/text%3E%3C/svg%3E"; e.currentTarget.className = "w-full h-full object-contain"; }} 
                   />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
