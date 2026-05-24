import Header from './components/Header';
import BandMembers from './components/BandMembers';
import AudioPlayer from './components/AudioPlayer';
import StyleDeconstruction from './components/StyleDeconstruction';
import TourTracker from './components/TourTracker';
import CommunityForum from './components/CommunityForum';
import { Music } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-vintage-cream py-6 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans retro-grain antialiased selection:bg-accent/20">
      
      {/* Centralized container with fluid layout constraint */}
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Editorial Masthead Menu */}
        <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end pb-5 border-b border-[#1A1A1A]/10">
          <div className="flex flex-col mb-3 sm:mb-0">
            <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-stone-550 mb-1">Fan-Designed Digital Experience</span>
            <h1 className="text-3xl font-serif italic font-light text-[#1A1A1A] tracking-tight">The Chairs 椅子樂團</h1>
          </div>
          <nav className="flex gap-6 sm:gap-10 text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/90">
            <a href="#" className="border-b border-[#1A1A1A] pb-0.5">Home</a>
            <a href="#" className="opacity-45 hover:opacity-100 transition-opacity">Discography</a>
            <a href="#" className="opacity-45 hover:opacity-100 transition-opacity">Touring</a>
            <a href="#" className="opacity-45 hover:opacity-100 transition-opacity">Studio</a>
          </nav>
        </header>

        {/* Section 1: Hero banner introduction */}
        <Header />

        {/* Section 1.5: Detailed Band Musician Biographies & Live Session profiles */}
        <BandMembers />

        {/* Section 2: Selected Playlists & Retro Turntable Engine */}
        <AudioPlayer />

        {/* Section 3: Band Musical Style Breakdown & Core Elements */}
        <StyleDeconstruction />

        {/* Section 4: Upcoming 2026 Tour Dates & predictions */}
        <TourTracker />

        {/* Section 5: Fan Interactive Community (forum posts, replies, and like chords) */}
        <CommunityForum />

        {/* Humility footer */}
        <footer className="pt-6 border-t border-[#1A1A1A]/10 text-center space-y-2.5 select-none">
          <p className="text-xs font-serif italic text-stone-500">
            Music is the only way to talk • 聆听海风与落日的中板歌谣
          </p>
          <p className="text-[10px] text-stone-400 font-sans max-w-2xl mx-auto leading-relaxed">
            本页所有伴奏与琴弦和弦音色基于原生 HTML5 Web Audio API 暖风和弦发生器模拟释出。
          </p>
        </footer>

      </div>
    </div>
  );
}
