import { BAND_INTRO } from '../data';
import { Sparkles, Calendar, Award } from 'lucide-react';

const bannerImg = "/src/assets/images/chairs_love_dialogue_banner_1779630228329.png";

export default function Header() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#1A1A1A]/10 bg-white transition-all">
      {/* Background Banner */}
      <div className="relative h-60 w-full sm:h-72 lg:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent z-10" />
        <img
          src={bannerImg}
          alt="The Chairs - 椅子乐团音乐海滩"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-102"
          referrerPolicy="no-referrer"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white text-stone-900 text-[10px] uppercase tracking-wider font-semibold shadow-xs">
            <Sparkles className="h-3 w-3 text-amber-600 fill-amber-600" />
            金曲奖最佳演唱组合
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#1A1A1A] text-white text-[10px] uppercase tracking-wider font-semibold">
            Dream Pop & Indie Pop
          </span>
        </div>
        
        {/* Text Over Banner */}
        <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
          <p className="text-[10px] tracking-[0.25em] font-mono uppercase bg-stone-950/50 backdrop-blur-xs px-2.5 py-1 rounded-sm w-fit inline-block mb-2">
            Warm Indie Sound from Taiwan
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic font-light tracking-tight">
            {BAND_INTRO.name}
          </h1>
        </div>
      </div>

      {/* Band Introduction Grid */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-white to-[#F9F7F2]/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Main Description */}
          <div className="lg:col-span-7 space-y-4">
            <div className="w-12 h-[1px] bg-[#1A1A1A] mb-4"></div>
            <h2 className="text-xl font-serif italic font-light text-[#1A1A1A] flex items-center gap-2">
              乐团简介 & 独有气质
            </h2>
            <p className="text-[#1A1A1A] opacity-80 font-sans text-sm sm:text-base leading-relaxed">
              {BAND_INTRO.vibeText}
            </p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 pt-4 text-xs text-[#1A1A1A]/60 border-t border-[#1A1A1A]/10 font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>活跃年份：{BAND_INTRO.activeYears}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5" />
                <span>荣誉：{BAND_INTRO.awards}</span>
              </div>
            </div>
          </div>

          {/* Members Showcase */}
          <div className="lg:col-span-5 bg-[#EFEDE6] rounded-xl border border-[#1A1A1A]/10 p-5 mt-2 lg:mt-0">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] mb-3.5 border-l-2 border-[#D97706] pl-2">
              🎸 乐团成员 / Group Members
            </h3>
            <div className="space-y-4">
              {BAND_INTRO.members.map((member, i) => (
                <div key={i} className="group-member flex gap-3.5 border-b border-[#1A1A1A]/10 last:border-0 pb-3 last:pb-0">
                  <div className="h-8 w-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between mb-0.5">
                      <h4 className="text-sm font-sans font-bold text-[#1A1A1A]">
                        {member.name}
                      </h4>
                      <span className="text-[10px] font-mono text-stone-500 font-medium select-none">
                        {member.role}
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 leading-normal">
                      {member.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
