export interface Song {
  id: string;
  title: string;
  englishTitle?: string;
  album: string;
  year: number;
  duration: string;
  description: string;
  lyrics?: string[];
  vibeTags: string[];
  backgroundGradient: string;
  accentColor: string;
  chordNotes: number[]; // frequencies for retro synth sounds
}

export interface TourEvent {
  id: string;
  city: string;
  englishCity: string;
  date: string;
  venue: string;
  status: 'upcoming' | 'sold_out' | 'completed';
  mapX: number; // percentage from left for custom illustration tour map
  mapY: number; // percentage from top
  ticketUrl?: string;
  specialGuests?: string;
}

export interface StyleFeature {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  musicalElements: string[];
  bgClass: string;
  emoji: string;
}
