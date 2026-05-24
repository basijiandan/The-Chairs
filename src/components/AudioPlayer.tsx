import { useState, useEffect, useRef } from 'react';
import { PLAYLIST, LYRICS_DATABASE } from '../data';
import { Song } from '../types';
import { synthInstance } from './ToneSynth';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, 
  Disc, Music, Heart, Sparkles, ChevronRight, CheckCircle2 
} from 'lucide-react';

const albumImg = "/src/assets/images/chairs_album_loner_1779628584848.png";

export default function AudioPlayer() {
  const [currentSong, setCurrentSong] = useState<Song>(PLAYLIST[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(60);
  const [progress, setProgress] = useState<number>(32); // initial mock time
  const [activeLyricIndex, setActiveLyricIndex] = useState<number>(0);
  const [likedSongs, setLikedSongs] = useState<string[]>(['rollin-on']);

  const lyrics = LYRICS_DATABASE[currentSong.id] || [];
  const timerRef = useRef<any>(null);

  // When song changes, stop previous synthesizer sound, play new one, reset lyrics and reset timeline
  const handleSelectSong = (song: Song) => {
    synthInstance.stop();
    setCurrentSong(song);
    setActiveLyricIndex(0);
    setProgress(0);
    
    if (isPlaying) {
      // Trigger lush synth chord of the selected song
      synthInstance.playChords(song.chordNotes, 2.0);
    } else {
      // soft single prompt beep on select when paused
      synthInstance.playBeep(440, 0.08);
    }
  };

  // Play/Pause toggler
  const handleTogglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      // Play chord directly on start
      synthInstance.playChords(currentSong.chordNotes, 2.5);
    } else {
      setIsPlaying(false);
      synthInstance.stop();
    }
  };

  // Next / Previous selectors
  const handleNext = () => {
    const idx = PLAYLIST.findIndex(s => s.id === currentSong.id);
    const nextIdx = (idx + 1) % PLAYLIST.length;
    handleSelectSong(PLAYLIST[nextIdx]);
  };

  const handlePrev = () => {
    const idx = PLAYLIST.findIndex(s => s.id === currentSong.id);
    const prevIdx = (idx - 1 + PLAYLIST.length) % PLAYLIST.length;
    handleSelectSong(PLAYLIST[prevIdx]);
  };

  // Simulated player tick behavior (scrolling lyric lines and updating time)
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          // Lyric line scrolling bound to percentage
          const totalLyricsCount = lyrics.length;
          const targetIndex = Math.min(
            Math.floor((prev / 100) * totalLyricsCount),
            totalLyricsCount - 1
          );
          if (targetIndex !== activeLyricIndex && targetIndex >= 0) {
            setActiveLyricIndex(targetIndex);
            
            // Periodically, synthesise soft note to accompany playing
            if (targetIndex % 2 === 0) {
              const rootNote = currentSong.chordNotes[targetIndex % currentSong.chordNotes.length];
              synthInstance.playChords([rootNote, rootNote * 1.5], 1.2);
            }
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentSong, lyrics, activeLyricIndex]);

  const toggleLike = (id: string) => {
    synthInstance.playBeep(659.25, 0.05); // light higher beep
    setLikedSongs(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Formatting simulated time
  const formatMockTime = (percent: number, totalDuration: string) => {
    const [totMin, totSec] = totalDuration.split(':').map(Number);
    const totalSeconds = totMin * 60 + totSec;
    const currentSeconds = Math.floor((percent / 100) * totalSeconds);
    
    const min = Math.floor(currentSeconds / 60);
    const sec = currentSeconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-2xl border border-[#1A1A1A]/10 bg-vintage-paper p-6 sm:p-8 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Interactive Turntable Retro Component */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-[#EFEDE6] border border-[#1A1A1A]/10 rounded-xl relative">
          
          {/* Vinyl Player Top Detail */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none select-none">
            <div className="flex items-center gap-1.5 text-stone-650 font-mono text-[9px] tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              COZY VINYL DECK
            </div>
            <div className="px-2 py-0.5 rounded bg-white text-stone-800 border border-[#1A1A1A]/10 font-mono text-[9px] font-bold">
              33 1/3 RPM
            </div>
          </div>

          <div className="mt-8 mb-4 relative flex items-center justify-center">
            {/* Vinyl Record Frame */}
            <div className={`relative h-44 w-44 sm:h-48 sm:w-48 rounded-full bg-stone-900 border-[8px] border-stone-850 shadow-lg flex items-center justify-center transition-transform ${isPlaying ? 'animate-spin-slow' : 'animate-spin-paused'}`}>
              
              {/* Inner Vinyl Groove Lines */}
              <div className="absolute inset-4 rounded-full border border-stone-800 border-dashed opacity-30" />
              <div className="absolute inset-8 rounded-full border border-stone-800 opacity-50" />
              <div className="absolute inset-12 rounded-full border border-stone-850 border-dashed opacity-30" />

              {/* Album Centerpiece */}
              <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-[#FAF6EE] border-4 border-stone-850 overflow-hidden relative shadow-inner">
                <img
                  src={albumImg}
                  alt="Lovely Loner Album"
                  className="h-full w-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
                
                {/* Center Spindle Hole */}
                <div className="absolute inset-0 m-auto h-3 w-3 bg-vintage-cream border border-stone-900 rounded-full" />
              </div>
            </div>

            {/* Simulated Tone Arm Stylus Needle */}
            <div className={`absolute top-[-15px] right-2 h-20 w-16 pointer-events-none origin-top-right transition-transform duration-[1200ms] ${isPlaying ? 'rotate-[14deg]' : 'rotate-0'}`}>
              <svg viewBox="0 0 100 120" className="w-full h-full text-stone-700">
                {/* Pivot Mount */}
                <circle cx="85" cy="15" r="7" fill="#8C8A85" />
                <circle cx="85" cy="15" r="3.5" fill="#4B4A45" />
                {/* Arm Bar */}
                <path d="M 85 15 L 45 95 L 35 105" fill="none" stroke="#B8B6B0" strokeWidth="3.5" strokeLinecap="round" />
                {/* Head Cardridge */}
                <rect x="25" y="98" width="13" height="17" rx="1.5" fill="#5C5A55" transform="rotate(-30, 32, 107)" />
                <rect x="23" y="102" width="5" height="4" fill="#D97706" transform="rotate(-30, 32, 107)" />
              </svg>
            </div>
          </div>

          {/* Active Track Title */}
          <div className="text-center w-full px-2 mt-1">
            <h3 className="text-md font-serif italic text-[#1A1A1A] truncate">
              {currentSong.title}
            </h3>
            <p className="text-[11px] text-stone-500 font-sans truncate tracking-tight">
              《{currentSong.album}》 • {currentSong.year}
            </p>
          </div>

          {/* Core Interactive Synth Bar Trigger Indicator */}
          <div className="w-full mt-4 p-2.5 rounded bg-white border border-[#1A1A1A]/10 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-stone-700 font-sans font-medium">
              <Sparkles className="h-3.5 w-3.5 text-[#D97706]" />
              <span>暖风和弦发生器：</span>
              <span className="font-mono text-[9px] bg-stone-100 text-stone-600 px-1 py-0.5 rounded font-bold">Web Audio Synth</span>
            </div>
            {isPlaying && (
              <div className="flex gap-1 items-end h-3 select-none">
                <span className="h-2 w-0.5 bg-stone-800 rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="h-3 w-0.5 bg-[#D97706] rounded-full animate-bounce [animation-delay:0.3s]" />
                <span className="h-2.5 w-0.5 bg-stone-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            )}
          </div>
        </div>

        {/* Right: Selected Playlist & Lyric Screen */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          
          {/* Section Heading */}
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-[#1A1A1A]/10 pb-3">
              <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#1A1A1A] flex items-center gap-2">
                <Music className="h-4 w-4 text-[#D97706]" />
                精选黑胶唱片集 (The Curation)
              </h2>
              <span className="text-[10px] font-mono text-[#1A1A1A]/50 font-medium">
                {PLAYLIST.length} Tracks Loaded
              </span>
            </div>

            {/* Audio Playlist List */}
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 mb-5">
              {PLAYLIST.map((song) => {
                const isActive = song.id === currentSong.id;
                const isLiked = likedSongs.includes(song.id);
                return (
                  <div 
                    key={song.id} 
                    onClick={() => handleSelectSong(song)}
                    className={`group flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer select-none ${isActive ? 'border-[#1A1A1A] bg-[#EFEDE6]/40' : 'border-stone-100 bg-transparent hover:bg-stone-50'}`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      {/* Interactive icon */}
                      <div className={`h-8 w-8 rounded flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-[#1A1A1A] text-white' : 'bg-[#EFEDE6] text-stone-600 group-hover:bg-[#1A1A1A] group-hover:text-white'}`}>
                        {isActive && isPlaying ? (
                          <span className="text-[10px] text-center font-serif font-bold italic">Play</span>
                        ) : (
                          <Disc className={`h-3.5 w-3.5 ${isActive ? 'animate-spin-slow' : ''}`} />
                        )}
                      </div>

                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-sans font-bold text-[#1A1A1A] truncate">
                            {song.title}
                          </h4>
                          {song.englishTitle && (
                            <span className="text-[10px] text-stone-450 font-normal hidden sm:inline">
                              ({song.englishTitle})
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 truncate font-mono mt-0.5">
                          {song.album} • {song.year}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Vibe tag pill */}
                      <span className="text-[9px] px-2 py-0.5 rounded bg-white text-stone-600 font-sans border border-[#1A1A1A]/10 hidden md:block">
                        {song.vibeTags[0]}
                      </span>
                      
                      {/* Like button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(song.id);
                        }}
                        className={`p-1.5 rounded-full hover:bg-[#EFEDE6] transition-colors ${isLiked ? 'text-[#D97706]' : 'text-stone-300'}`}
                      >
                        <Heart className="h-3.5 w-3.5" fill={isLiked ? "currentColor" : "none"} />
                      </button>
                      
                      <span className="text-xs font-mono text-stone-500 font-semibold">
                        {song.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulated Live Lyric Subscreen Panel */}
            <div className="bg-[#1A1A1A] text-stone-100 rounded-lg p-4 relative overflow-hidden h-36 border border-stone-850">
              <div className="absolute top-2.5 right-3 flex items-center gap-1 text-[9px] font-mono text-stone-400 uppercase tracking-widest pointer-events-none select-none">
                <span className="inline-block h-1 w-1 rounded-full bg-[#D97706] animate-pulse" />
                Aesthetic Lyrics
              </div>
              
              <div className="flex flex-col h-full justify-center text-center space-y-2 mt-1">
                {lyrics.length > 0 ? (
                  <>
                    <p className="text-stone-400 text-[11px] truncate italic opacity-50">
                      {activeLyricIndex > 0 ? lyrics[activeLyricIndex - 1] : "..."}
                    </p>
                    <p className="text-[#F9F7F2] font-serif italic text-sm sm:text-base px-2 animate-pulse whitespace-normal h-12 flex items-center justify-center">
                      「{lyrics[activeLyricIndex]}」
                    </p>
                    <p className="text-stone-400 text-[11px] truncate italic opacity-50">
                      {activeLyricIndex < lyrics.length - 1 ? lyrics[activeLyricIndex + 1] : "..."}
                    </p>
                  </>
                ) : (
                  <p className="text-stone-400 text-xs italic">无歌词数据</p>
                )}
              </div>
            </div>

          </div>

          {/* Interactive Player Controls */}
          <div className="mt-4 pt-3 border-t border-[#1A1A1A]/10 space-y-3">
            {/* Timeline slider */}
            <div className="flex items-center gap-3 text-[11px] font-mono text-stone-600 select-none">
              <span>{formatMockTime(progress, currentSong.duration)}</span>
              <div className="flex-1 relative h-1 bg-stone-200 rounded-full cursor-pointer" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newPercent = Math.min(Math.max((clickX / rect.width) * 100, 0), 100);
                setProgress(newPercent);
                synthInstance.playChords([currentSong.chordNotes[0] * 1.5], 0.6); // feedback synth chord
              }}>
                <div 
                  className="absolute h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%`, background: "#1A1A1A" }}
                />
                <div 
                  className="absolute h-3 w-3 rounded-full border border-[#1A1A1A] bg-[#FFFDFC] shadow-xs top-[-4px] transition-all duration-300 transform -translate-x-1/2"
                  style={{ left: `${progress}%` }}
                />
              </div>
              <span>{currentSong.duration}</span>
            </div>

            {/* Buttons control layout */}
            <div className="flex items-center justify-between">
              
              <p className="text-[10px] font-sans text-stone-500 italic max-w-44 truncate hidden sm:block">
                🎻 吉他谐律: Retro Equalizer
              </p>

              {/* Main controls button list */}
              <div className="flex items-center gap-4 mx-auto sm:mx-0">
                <button 
                  onClick={handlePrev}
                  className="p-2 rounded hover:bg-[#EFEDE6] text-stone-700 transition-colors"
                  title="上一首"
                >
                  <SkipBack className="h-4.5 w-4.5" />
                </button>
                
                <button 
                  onClick={handleTogglePlay}
                  className="h-10 w-10 rounded-full bg-[#1A1A1A] text-white active:scale-95 transition-transform flex items-center justify-center cursor-pointer hover:bg-stone-800"
                  title={isPlaying ? '暂停' : '播鸣琴弦'}
                >
                  {isPlaying ? (
                    <Pause className="h-4.5 w-4.5" />
                  ) : (
                    <Play className="h-4.5 w-4.5 fill-white pl-0.5" />
                  )}
                </button>

                <button 
                  onClick={handleNext}
                  className="p-2 rounded hover:bg-[#EFEDE6] text-stone-700 transition-colors"
                  title="下一首"
                >
                  <SkipForward className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Volume sliders */}
              <div className="hidden sm:flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-stone-550" />
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume}
                  onChange={(e) => {
                    const newVol = Number(e.target.value);
                    setVolume(newVol);
                    // trigger a tiny volume beep as reference
                    if (newVol % 10 === 0) {
                      synthInstance.playBeep(330, 0.05);
                    }
                  }}
                  className="w-16 accent-stone-800 h-1 cursor-pointer bg-stone-200 rounded-lg appearance-none"
                />
              </div>

            </div>

            {/* Selected Song Description Box */}
            <div className="bg-[#EFEDE6] border border-[#1A1A1A]/10 rounded-lg p-3 text-xs text-[#1A1A1A] leading-relaxed font-sans mt-2">
              <span className="font-bold text-[#D97706] mr-1">《{currentSong.title}》特展歌词意境：</span>
              {currentSong.description}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
