import { useState } from 'react';
import { User, Music, Award, Star, Quote } from 'lucide-react';

interface Member {
  name: string;
  role: string;
  avatarInitials: string;
  quote: string;
  contribution: string;
  experience: string;
  instrument: string;
}

const MEMBERS_DATA: Member[] = [
  {
    name: '詠靖 (Yung-Ching)',
    role: '主唱 / 电吉他 / 核心词曲创作者',
    avatarInitials: 'YJ',
    quote: '“音乐是我们对这世界最温柔、最直接的叙事。”',
    instrument: 'Fender Jazzmaster / Epiphone Casino',
    contribution: '词曲主创与情绪奠基者。以充满文学质感、诗意和浪漫浪漫幻想的歌词，配搭变幻自如的半音阶、复古滑音吉他，构建起椅子乐团独特的中板幻境。',
    experience: '高中时期与仲颖结识并开启了最初的音乐创作。曾主导《Lovely Loner》专辑中多首梦幻神曲的谱曲和滑奏编配。在温暖中带有一丝沙哑、治愈的独特吟唱声线是乐团最引人入胜的音乐名片。'
  },
  {
    name: '仲穎 (Chung-Ying)',
    role: '主唱 / 木吉他 / 词曲作者',
    avatarInitials: 'CY',
    quote: '“希望我们的歌声，能像温热的椰子汁一样让人喝到夏天的咸风。”',
    instrument: 'Martin Acoustic Guitar',
    contribution: '明亮声线与阳光旋律催化师。詠靖声线完美而柔顺的双声部男声高音和声主要出自他手，为歌曲注入了像海风穿过棕榈叶般和煦悠扬的能量。',
    experience: '作为乐团的双主音吉他手与另一位创作核心，仲颖精通复古指弹与浪漫流行曲风的木吉他伴奏。他在《手绘地图》等经典民谣向曲目中展现的温暖声色和流畅乐句，是椅子乐团温润、厚实质感的有力支撑。'
  },
  {
    name: 'Benson',
    role: '贝斯手 / 节奏中枢',
    avatarInitials: 'B',
    quote: '“在鼓点与吉他弦之间的缝隙里，找到最惬意的低音律动。”',
    instrument: 'Fender Jazz Bass',
    contribution: '律动骨架支点。在《Dandy》、《Entering The Room》等融合City Pop和Neo-Soul编配的曲子中提供跃动跳踢的滑行贝斯线，是乐团复古浪漫舞动感不可或缺的后盾。',
    experience: '在乐团成立之初即担任低音线条支柱，擅长把握摇摆乐、灵魂乐与迷幻曲风的低音时值。他以精准控制的暖心断音与滑音，将主唱们轻飘飘的柔美声线与实体鼓点完美契合。'
  },
  {
    name: '陆大维 (David Lu)',
    role: 'Live Session 联合巡演鼓手',
    avatarInitials: 'DW',
    quote: '“稳健的鼓槌，是梦幻轻盈海浪里那一抹靠得住的锚。”',
    instrument: 'Yamaha Vintage Custom Drums',
    contribution: '巡演现场的节奏核芯。他以极具颗粒感的复古小军鼓揉音以及丰沛的叠音镲片编配，重塑了60、70年代唱片里特有的质朴空气感。',
    experience: '椅子乐团多年巡回演出、大型音乐节的专属御用鼓手。在现场他完美承托起《Rollin\' On》前奏那标志性的沙哑打点，用扎实而富有写意感情色彩的顿挫感，牢牢锁定现场的摇摆频率。'
  },
  {
    name: '詹咏翔 (Sean Chan)',
    role: 'Live Session 联合巡演键盘/合成器手',
    avatarInitials: 'SC',
    quote: '“用电钢琴和罗德斯琴，编织出日落云海里的水波纹理。”',
    instrument: 'Nord Stage / Roland Rhodes Synth',
    contribution: '氛围感织体画板。利用温暖迷离的罗德斯电钢琴(Rhodes)及空间混响合成器(Space Pad)垫音，为现场营造微醺、起雾的梦境包裹感。',
    experience: '深度参与椅子乐团巡演现场的声音美学重构。不管是《Entering The Room》闷声的浪漫霓虹和弦，还是现场版《Loneliest Loner》那一抹悠长闪烁的星空音效，都由他细腻的指尖在琴键上悄然铺陈。'
  }
];

export default function BandMembers() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const currentMember = MEMBERS_DATA[selectedIdx];

  return (
    <div className="rounded-2xl border border-[#1A1A1A]/10 bg-vintage-paper p-6 sm:p-8 transition-all">
      {/* Editorial Header */}
      <div className="border-b border-[#1A1A1A]/10 pb-4 mb-6">
        <h2 className="text-lg font-serif italic font-light text-[#1A1A1A] flex items-center gap-2">
          ☕ 乐团原生成员与现场编外美学 (Band Members & Live Session Cohort)
        </h2>
        <p className="text-xs text-stone-550 font-sans mt-0.5 animate-fade-in">
          探索第30届金曲奖最佳演唱组合得主，与现场极具空气感声学奇迹背后的音乐画匠
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Member Selector Vertical Column */}
        <div className="lg:col-span-4 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-3 ml-1 block">
            SELECT MUSICIAN / 选择乐手
          </p>
          <div className="space-y-1.5">
            {MEMBERS_DATA.map((member, idx) => {
              const isActive = idx === selectedIdx;
              return (
                <button
                  key={member.name}
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded text-left transition-all group cursor-pointer ${
                    isActive 
                      ? 'bg-[#1A1A1A] text-white border-transparent shadow-xs' 
                      : 'bg-[#EFEDE6]/40 border border-[#1A1A1A]/10 text-stone-700 hover:bg-[#EFEDE6]/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center font-serif text-xs font-bold ${
                      isActive ? 'bg-white text-stone-900' : 'bg-[#1A1A1A] text-white'
                    }`}>
                      {member.avatarInitials}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-sans font-bold leading-tight">
                        {member.name}
                      </h4>
                      <p className={`text-[10px] font-mono mt-0.5 ${
                        isActive ? 'text-stone-300' : 'text-stone-500'
                      }`}>
                        {member.role.split(' ')[0]}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs transition-transform ${
                    isActive ? 'text-[#D97706] translate-x-1' : 'text-stone-400 group-hover:translate-x-1'
                  }`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Panel: Editorial Aesthetics with heavy columns and details */}
        <div className="lg:col-span-8 bg-[#EFEDE6]/45 border border-[#1A1A1A]/10 rounded-xl p-5 sm:p-7 flex flex-col justify-between h-full min-h-[360px] relative overflow-hidden">
          
          {/* Subtle logo vector mark in background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-serif font-light text-[#1A1A1A]/[0.015] pointer-events-none uppercase tracking-tighter select-none">
            {currentMember.avatarInitials}
          </div>

          <div className="space-y-6 relative z-10">
            {/* Header Title with Subtext */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#1A1A1A]/10 pb-4 gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-[#D97706] block mb-1">
                  CORE PROFILE / 艺术家画像
                </span>
                <h3 className="text-xl sm:text-2xl font-serif italic text-stone-900 font-light">
                  {currentMember.name}
                </h3>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#1A1A1A] text-white tracking-wide shrink-0">
                {currentMember.role}
              </span>
            </div>

            {/* Poetic quote */}
            <div className="flex gap-2.5 items-start pl-3 border-l-4 border-[#D97706] italic text-[#1A1A1A] my-4 leading-relaxed font-serif text-sm sm:text-base">
              <Quote className="h-4 w-4 text-[#D97706] shrink-0 fill-[#D97706]/20 mt-1" />
              <p>{currentMember.quote}</p>
            </div>

            {/* Grid distribution of skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2 flex items-center gap-1">
                  <Star className="h-3 w-3 text-[#D97706] fill-[#D97706]/40" />
                  乐手特质与现场贡献
                </h4>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
                  {currentMember.contribution}
                </p>
              </div>

              <div>
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2 flex items-center gap-1">
                  <Music className="h-3 w-3 text-stone-800" />
                  演艺资历与音乐背景
                </h4>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
                  {currentMember.experience}
                </p>
              </div>
            </div>
          </div>

          {/* Footer instrument info box */}
          <div className="mt-8 pt-4 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2 relative z-10">
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
              PRIMARY WEAPON / 常用演奏乐器:
            </span>
            <span className="bg-[#FFFDFC] text-[#1A1A1A] font-semibold font-mono text-[10px] px-3 py-1 rounded border border-[#1A1A1A]/10 shadow-3xs uppercase">
              🎸 {currentMember.instrument}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
