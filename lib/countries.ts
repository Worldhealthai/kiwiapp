export interface Country {
  id: string;
  name: string;
  code: string;
  continent: string;
  coordinates: { lat: number; lng: number };
  visited: boolean;
  flagEmoji: string;
  coverImage: string;
  description: string;
  highlights: string[];
  travelTips: string[];
  bestTimeToVisit: string;
  currency: string;
  language: string;
}

export const countries: Country[] = [
  {
    id: 'nz',
    name: 'New Zealand',
    code: 'NZ',
    continent: 'Oceania',
    coordinates: { lat: -40.9, lng: 174.9 },
    visited: true,
    flagEmoji: '🇳🇿',
    coverImage: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800',
    description: 'The land of the long white cloud. New Zealand offers breathtaking landscapes from rolling hills to majestic fjords.',
    highlights: ['Milford Sound', 'Hobbiton', 'Queenstown', 'Rotorua', 'Abel Tasman'],
    travelTips: ['Rent a campervan', 'Book Milford Sound early', 'Try a hangi feast'],
    bestTimeToVisit: 'December to February',
    currency: 'NZD',
    language: 'English, Māori',
  },
  {
    id: 'jp',
    name: 'Japan',
    code: 'JP',
    continent: 'Asia',
    coordinates: { lat: 36.2, lng: 138.3 },
    visited: true,
    flagEmoji: '🇯🇵',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    description: 'A fascinating blend of ancient traditions and cutting-edge technology.',
    highlights: ['Tokyo', 'Kyoto temples', 'Mount Fuji', 'Osaka food', 'Hiroshima'],
    travelTips: ['Get a JR Pass', 'Learn basic Japanese', 'Visit during cherry blossom'],
    bestTimeToVisit: 'March to May or October to November',
    currency: 'JPY',
    language: 'Japanese',
  },
  {
    id: 'th',
    name: 'Thailand',
    code: 'TH',
    continent: 'Asia',
    coordinates: { lat: 15.9, lng: 101.0 },
    visited: true,
    flagEmoji: '🇹🇭',
    coverImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
    description: 'The Land of Smiles with incredible temples, beaches, and food.',
    highlights: ['Bangkok temples', 'Chiang Mai', 'Phuket beaches', 'Krabi islands'],
    travelTips: ['Dress modestly at temples', 'Try street food', 'Bargain politely'],
    bestTimeToVisit: 'November to February',
    currency: 'THB',
    language: 'Thai',
  },
  {
    id: 'fr',
    name: 'France',
    code: 'FR',
    continent: 'Europe',
    coordinates: { lat: 46.2, lng: 2.2 },
    visited: true,
    flagEmoji: '🇫🇷',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    description: 'From Paris romance to Provence lavender fields.',
    highlights: ['Paris', 'French Riviera', 'Provence', 'Loire Valley', 'Mont Saint-Michel'],
    travelTips: ['Learn basic French', 'Book attractions early', 'Embrace café culture'],
    bestTimeToVisit: 'April to June or September to October',
    currency: 'EUR',
    language: 'French',
  },
  {
    id: 'au',
    name: 'Australia',
    code: 'AU',
    continent: 'Oceania',
    coordinates: { lat: -25.3, lng: 133.8 },
    visited: true,
    flagEmoji: '🇦🇺',
    coverImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800',
    description: 'The land down under with stunning reefs and unique wildlife.',
    highlights: ['Sydney Opera House', 'Great Barrier Reef', 'Uluru', 'Melbourne'],
    travelTips: ['It is bigger than you think', 'Wear sunscreen', 'Respect wildlife'],
    bestTimeToVisit: 'September to November or March to May',
    currency: 'AUD',
    language: 'English',
  },
  {
    id: 'it',
    name: 'Italy',
    code: 'IT',
    continent: 'Europe',
    coordinates: { lat: 41.9, lng: 12.6 },
    visited: false,
    flagEmoji: '🇮🇹',
    coverImage: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800',
    description: 'Ancient Rome, Venice canals, and the best cuisine in the world.',
    highlights: ['Rome', 'Venice', 'Florence', 'Amalfi Coast', 'Tuscany'],
    travelTips: ['Book museums early', 'Eat where locals eat', 'Take slow trains'],
    bestTimeToVisit: 'April to June or September to October',
    currency: 'EUR',
    language: 'Italian',
  },
  {
    id: 'is',
    name: 'Iceland',
    code: 'IS',
    continent: 'Europe',
    coordinates: { lat: 65.0, lng: -19.0 },
    visited: false,
    flagEmoji: '🇮🇸',
    coverImage: 'https://images.unsplash.com/photo-1520769669658-f07657e5b307?w=800',
    description: 'Land of fire and ice with Northern Lights and glaciers.',
    highlights: ['Northern Lights', 'Blue Lagoon', 'Golden Circle', 'Jökulsárlón'],
    travelTips: ['Rent a 4x4', 'Layer clothing', 'Book early'],
    bestTimeToVisit: 'June to August or Sept to March for lights',
    currency: 'ISK',
    language: 'Icelandic',
  },
  {
    id: 'mx',
    name: 'Mexico',
    code: 'MX',
    continent: 'North America',
    coordinates: { lat: 23.6, lng: -102.6 },
    visited: false,
    flagEmoji: '🇲🇽',
    coverImage: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800',
    description: 'Vibrant culture, ancient ruins, and incredible food.',
    highlights: ['Mexico City', 'Cancun', 'Oaxaca', 'Chichen Itza', 'Guanajuato'],
    travelTips: ['Explore beyond resorts', 'Learn Spanish', 'Try street tacos'],
    bestTimeToVisit: 'December to April',
    currency: 'MXN',
    language: 'Spanish',
  },
];

export const getCountryById = (id: string) => countries.find(c => c.id === id);
