import { useState } from 'react';
import { STYLE_FEATURES, PLAYLIST } from '../data';
import { StyleFeature } from '../types';
import { synthInstance } from './ToneSynth';
import { Sparkles, ArrowRight, HelpCircle, Check, Play } from 'lucide-react';

export default function StyleDeconstruction() {
  const [activeTab, setActiveTab] = useState<string>(STYLE_FEATURES[0].id);

  const activeFeature = STYLE_FEATURES.find(f => f.id === activeTab) || STYLE_FEATURES[0];

  // Map each category to dynamic retro tone triggers
  const playStyleTone = (id: string) => {
    switch (id) {
      case 'retro-pop':
        // Warm happy major chord
        synthInstance.playChords([261.63, 329.63, 392.00, 493.88], 1.5);
        break;
      case 'dream-pop':
        // Dreamy major 7th chord with high air
        synthInstance.playChords([293.66, 369.99, 440.00, 554.37], 1.5);
        break;
      case 'cozy-folk':
        // Safe cozy minor 7th chord
        synthInstance.playChords([329.63, 392.00, 493.88, 587.33], 1.5);
        break;
      default:
        synthInstance.playBeep(440, 0.2);
    }
  };

  // Track recommendations matching the active style tab
  const getMatchingSongs = (id: string) => {
    switch (id) {
      case 'retro-pop':
        return PLAYLIST.filter(s => s.id === 'roll-on' || s.id === 'dandy' || s.id === 'rollin-on');
      case 'dream-pop':
        return PLAYLIST.filter(s => s.id === 'loneliest-loner' || s.id === 'entering-the-room');
      case 'cozy-folk':
        return PLAYLIST.filter(s => s.id === 'handwritten-map');
      default:
        return [];
    }
  };

  const matchingSongs = getMatchingSongs(activeTab);

  return (
    <div className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-6 sm:p-8 transition-all">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1A1A1A]/10 pb-4 mb-6">
        <div>
          <h2 className="text-lg font-serif italic font-light text-[#1A1A1A] flex items-center gap-2">
            椅子乐团核心音乐风格解构
          </h2>
          <p className="text-xs text-stone-500 font-sans mt-0.5">
            解密第30届金曲奖得主的浪漫编曲法则
          </p>
        </div>
        
        {/* Atmosphere Audio tester */}
        <button 
          onClick={() => playStyleTone(activeTab)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-[#1A1A1A] text-white hover:bg-stone-800 transition-colors cursor-pointer w-fit"
        >
          <Play className="h-3 w-3 fill-white" />
          播鸣本风格和弦音色
        </button>
      </div>

      {/* Interactive Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-[#EFEDE6] border border-[#1A1A1A]/10 rounded-lg mb-6">
        {STYLE_FEATURES.map((feature) => {
          const isActive = feature.id === activeTab;
          return (
            <button
              key={feature.id}
              onClick={() => {
                synthInstance.playBeep(440 + PLAYLIST.length * 10, 0.05);
                setActiveTab(feature.id);
              }}
              className={`py-2 px-1 rounded text-xs md:text-sm font-sans font-bold transition-all text-center cursor-pointer select-none ${isActive ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'}`}
            >
              <span className="mr-1 hidden sm:inline">{feature.emoji}</span>
              {feature.title}
            </button>
          );
        })}
      </div>

      {/* Tab Showcase Detail Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left column: description and elements */}
        <div className="md:col-span-12 lg:col-span-7 space-y-5">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#D97706] tracking-[0.2em] uppercase mb-1.5 block">
              {activeFeature.englishTitle}
            </span>
            <p className="text-[#1A1A1A]/80 text-sm sm:text-base leading-relaxed">
              {activeFeature.description}
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] mb-2.5">
              🛠️ 核心编曲配器与元素
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeFeature.musicalElements.map((element, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 px-3 py-2 rounded border border-[#1A1A1A]/10 bg-[#F9F7F2]/40 text-stone-800 text-xs sm:text-sm font-medium"
                >
                  <span className="text-[#D97706] font-bold">✓</span>
                  <span>{element}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: matching songs guide & tone triggers */}
        <div className="md:col-span-12 lg:col-span-5 bg-[#EFEDE6] rounded-xl border border-[#1A1A1A]/10 p-5 flex flex-col justify-between">
          
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] mb-3 flex items-center justify-between">
              <span>🎧 代表曲目推荐</span>
              <span className="text-[10px] font-mono text-stone-500 font-semibold tracking-tight">SELECTED SONGS</span>
            </h4>
            
            <div className="space-y-2">
              {matchingSongs.map((song) => (
                <div 
                  key={song.id} 
                  className="flex items-center justify-between p-2.5 bg-[#FFFDFC] rounded border border-[#1A1A1A]/10"
                >
                  <div className="truncate">
                    <p className="text-xs sm:text-sm font-sans font-bold text-stone-850 truncate">
                      {song.title}
                    </p>
                    <p className="text-[10px] text-stone-500 font-mono truncate">
                      《{song.album}》 • {song.year}
                    </p>
                  </div>
                  
                  <span className="text-[9px] px-2 py-0.5 rounded bg-stone-900 text-white font-medium">
                    {song.vibeTags[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Emotional vibe descriptor box */}
          <div className="mt-4 pt-3 border-t border-[#1A1A1A]/10">
            <div className="flex items-start gap-2.5 text-xs text-stone-700 bg-[#FFFDFC] rounded p-3 border border-[#1A1A1A]/10">
              <span className="text-base select-none">🏖️</span>
              <div>
                <p className="font-bold text-[#1A1A1A]">
                  {activeTab === 'retro-pop' ? '日落派对情调' : activeTab === 'dream-pop' ? '微醺海风沙滩' : '午后咖啡暖意'}
                </p>
                <p className="text-[11px] text-stone-500 leading-normal mt-0.5">
                  {activeTab === 'retro-pop' 
                    ? '适合在夏日海滩开瓶冰汽水、或者是随意的下班散步，跟着中板复古节奏左右轻轻摇摆。'
                    : activeTab === 'dream-pop'
                    ? '戴上消噪耳机，任层层叠加的和音与极简回声抚平繁杂思绪，坠入私密的浪漫星河。'
                    : '用质朴诚恳的拨弦，带你回到老台北街巷里的黑胶咖啡屋，重温最初浪漫的手绘地图之旅。'
                  }
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
