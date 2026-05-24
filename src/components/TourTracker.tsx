import { useState } from 'react';
import { TOUR_UPDATES, SETLIST_PREDICTION } from '../data';
import { TourEvent } from '../types';
import { synthInstance } from './ToneSynth';
import { Calendar, MapPin, Sparkles, CheckCircle2, AlertCircle, ShoppingCart, Percent } from 'lucide-react';

export default function TourTracker() {
  const [selectedEventId, setSelectedEventId] = useState<string>(TOUR_UPDATES[0].id);

  const selectedEvent = TOUR_UPDATES.find(e => e.id === selectedEventId) || TOUR_UPDATES[0];

  const handleSelectEvent = (event: TourEvent) => {
    setSelectedEventId(event.id);
    // Play a friendly acoustic scale beep to feel analog
    synthInstance.playBeep(261.63 + parseFloat(event.mapX.toString()) * 2, 0.08);
  };

  return (
    <div className="rounded-2xl border border-[#1A1A1A]/10 bg-vintage-paper p-6 sm:p-8 transition-all">
      
      {/* Title Header */}
      <div className="border-b border-[#1A1A1A]/10 pb-4 mb-6">
        <h2 className="text-lg font-serif italic font-light text-[#1A1A1A] flex items-center gap-2">
          “椅子的落日派对”独家巡演动态 (The Tour Tracker)
        </h2>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          2026年度限时城市现场巡演日程与专属曲单预测 (Taipei, Tokyo, Shanghai, and more)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Cities Timeline List */}
        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] mb-3.5 border-l-2 border-[#D97706] pl-2">
            📍 巡演现场计划 / Tour Timeline
          </h3>

          <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
            {TOUR_UPDATES.map((event) => {
              const isSelected = event.id === selectedEventId;
              return (
                <div
                  key={event.id}
                  onClick={() => handleSelectEvent(event)}
                  className={`group flex items-center justify-between p-3.5 rounded-lg border transition-all cursor-pointer select-none ${isSelected ? 'border-[#1A1A1A] bg-[#EFEDE6]/40' : 'border-[#1A1A1A]/10 bg-white hover:bg-stone-50'}`}
                >
                  <div className="flex items-start gap-3 truncate">
                    {/* Date card */}
                    <div className={`h-11 w-11 rounded flex flex-col items-center justify-center shrink-0 font-mono text-center border transition-all ${isSelected ? 'bg-[#1A1A1A] text-white border-transparent' : 'bg-stone-50 text-stone-600 border-stone-200'}`}>
                      <span className="text-[9px] leading-none mb-0.5 select-none opacity-80">2026</span>
                      <span className="text-xs font-bold leading-none select-none">{event.date.substring(5, 10)}</span>
                    </div>

                    <div className="truncate">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-sans font-bold text-stone-900">
                          {event.city}
                        </h4>
                        
                        {/* Status tag */}
                        {event.status === 'upcoming' && (
                          <span className="text-[9px] px-2 py-0.5 rounded-sm bg-[#1A1A1A] text-white font-semibold">
                            预售中
                          </span>
                        )}
                        {event.status === 'sold_out' && (
                          <span className="text-[9px] px-2 py-0.5 rounded-sm bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20 font-semibold italic">
                            精选售罄
                          </span>
                        )}
                        {event.status === 'completed' && (
                          <span className="text-[9px] px-2 py-0.5 rounded-sm bg-stone-200 text-stone-500 font-semibold">
                            已落幕
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-500 mt-1 truncate flex items-center gap-1 font-sans">
                        <MapPin className="h-3.5 w-3.5 text-stone-400" />
                        {event.venue}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-stone-450">
                     <span>详情</span>
                     <span className="text-[#D97706]">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Interactive Detail Seat Finder Card */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          
          {/* Detail viewer panel */}
          <div className="bg-[#EFEDE6]/60 p-5 rounded-xl border border-[#1A1A1A]/10 font-sans space-y-4 relative">
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono bg-[#1A1A1A] text-white px-2 py-0.5 rounded-sm font-bold uppercase select-none">
                现场特辑 / Live Notes
              </span>
              {selectedEvent.status === 'upcoming' ? (
                <span className="flex items-center gap-1 text-xs text-emerald-750 font-bold select-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  席位开放预订中
                </span>
              ) : selectedEvent.status === 'sold_out' ? (
                <span className="text-xs text-[#D97706] font-bold select-none flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  已售罄 (开启二手票抢票)
                </span>
              ) : (
                <span className="text-xs text-stone-550 select-none flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-stone-400" />
                  回忆满载
                </span>
              )}
            </div>

            <div>
              <h3 className="text-base font-serif italic text-[#1A1A1A]">
                {selectedEvent.city} 巡回特展
              </h3>
              <p className="text-xs text-stone-600 font-mono mt-0.5">
                时间：{selectedEvent.date}
              </p>
              <p className="text-xs text-stone-600 font-sans mt-0.5">
                地点：{selectedEvent.venue}
              </p>
            </div>

            {/* Special guests panel */}
            <div className="bg-[#FFFDFC] p-3 rounded border border-[#1A1A1A]/10 text-xs">
              <span className="font-bold text-[#D97706] block mb-1">🎙️ 联合参演 / 独家特别嘉宾：</span>
              <p className="text-[#1A1A1A]/80">
                {selectedEvent.specialGuests || '敬请期待惊喜重磅嘉宾揭晓'}
              </p>
            </div>

            {/* Simulated Live Scene Seat Visualizer */}
            <div className="relative h-24 rounded bg-stone-900 border border-stone-850 p-3 flex items-center justify-center overflow-hidden">
              <div className="absolute top-1.5 left-2 text-[8px] font-mono text-stone-500 tracking-wider">
                STAGE FRONT VIEW (舞台前区声学模拟)
              </div>
              
              <div className="flex flex-col items-center gap-2 mt-2">
                {/* Simulated center stage lights */}
                <div className="text-[10px] text-stone-400 font-mono flex items-center gap-2">
                  <span>🔊 L-Acoustics KSL Line Arrays 主席音箱</span>
                </div>
                
                {/* Color stage representation */}
                <div className="flex gap-1">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <span 
                      key={i} 
                      className={`h-2.5 w-1.5 rounded-xs transition-colors ${i % 3 === 0 ? 'bg-[#1A1A1A]' : i % 3 === 1 ? 'bg-[#D97706]' : 'bg-stone-500'}`}
                      style={{ 
                        opacity: selectedEvent.status === 'completed' ? 0.2 : 0.8 + Math.sin(i) * 0.15,
                        animationDelay: `${i * 0.1}s`
                      }} 
                    />
                  ))}
                </div>
                <div className="text-[9px] text-stone-500 font-mono">
                  夏日沙滩微醺音效覆盖系数：99.5%
                </div>
              </div>
            </div>

            {/* Register Ticket trigger buttons */}
            {selectedEvent.status === 'upcoming' ? (
              <button 
                onClick={() => synthInstance.playBeep(880, 0.15)}
                className="w-full py-2.5 rounded bg-[#1A1A1A] text-white font-sans font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-stone-800 transition-all cursor-pointer"
              >
                <ShoppingCart className="h-4 w-4" />
                立即抢定门票 / Secure Tickets
              </button>
            ) : (
              <div className="w-full py-2.5 rounded bg-stone-200 text-stone-550 font-sans font-semibold text-xs text-center border border-stone-300 pointer-events-none select-none">
                {selectedEvent.status === 'sold_out' ? '遗憾售罄 (前往大麦/纷玩岛预约补票)' : '现场已落幕，感谢支持'}
              </div>
            )}

          </div>

          {/* Bento Panel Under: Setlist Probability predictions */}
          <div className="bg-[#EFEDE6] border border-[#1A1A1A]/10 rounded-xl p-4 font-sans mt-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] mb-2.5 flex items-center gap-1.5">
              <Percent className="h-3.5 w-3.5 text-[#D97706]" />
              现场安可曲目出场概率预测 (Setlist Predictor)
            </h4>
            
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {SETLIST_PREDICTION.slice(0, 4).map((pred, i) => (
                <div key={i} className="bg-[#FFFDFC] p-2 rounded border border-[#1A1A1A]/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-[#1A1A1A] truncate">{pred.song}</span>
                    <span className="font-mono font-bold text-[#D97706] text-[10px] shrink-0">{pred.probability}</span>
                  </div>
                  <p className="text-stone-500 text-[10px] leading-normal mt-0.5 line-clamp-1 italic">
                    {pred.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
