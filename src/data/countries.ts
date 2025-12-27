import { Country } from '../types';

export const countries: Country[] = [
  {
    id: 'nz',
    name: 'New Zealand',
    code: 'NZ',
    continent: 'Oceania',
    coordinates: { lat: -40.9006, lng: 174.886 },
    visited: true,
    flagEmoji: '🇳🇿',
    coverImage: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800',
    description: 'The land of the long white cloud. New Zealand offers breathtaking landscapes from the rolling hills of the Shire to the majestic fjords of Milford Sound.',
    highlights: [
      'Milford Sound - Stunning fjord with waterfalls',
      'Hobbiton - The Shire from Lord of the Rings',
      'Queenstown - Adventure capital of the world',
      'Rotorua - Geothermal wonders and Māori culture',
      'Abel Tasman - Crystal clear waters and golden beaches'
    ],
    travelTips: [
      'Rent a campervan for the ultimate road trip experience',
      'Book Milford Sound cruises in advance',
      'Try a traditional Māori hangi feast',
      'Pack layers - weather changes quickly!'
    ],
    bestTimeToVisit: 'December to February (Summer)',
    currency: 'New Zealand Dollar (NZD)',
    language: 'English, Māori',
    blogPosts: [
      {
        id: 'nz-1',
        countryId: 'nz',
        title: 'Road Tripping Through the South Island',
        excerpt: 'From Christchurch to Queenstown, discovering the most scenic drive in the world.',
        content: 'The South Island of New Zealand is a road tripper\'s paradise. Starting from Christchurch, we embarked on a two-week journey that would take us through some of the most breathtaking landscapes on Earth...',
        coverImage: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=800',
        date: '2024-02-15',
        readTime: 8,
        tags: ['road-trip', 'nature', 'adventure']
      },
      {
        id: 'nz-2',
        countryId: 'nz',
        title: 'A Day in Hobbiton',
        excerpt: 'Walking through the real Shire - a Lord of the Rings fan\'s dream come true.',
        content: 'As a lifelong Lord of the Rings fan, visiting Hobbiton was always on my bucket list. The moment you step through those gates, you\'re transported to Middle-earth...',
        coverImage: 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=800',
        date: '2024-02-18',
        readTime: 5,
        tags: ['culture', 'movies', 'tours']
      }
    ]
  },
  {
    id: 'jp',
    name: 'Japan',
    code: 'JP',
    continent: 'Asia',
    coordinates: { lat: 36.2048, lng: 138.2529 },
    visited: true,
    flagEmoji: '🇯🇵',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    description: 'A fascinating blend of ancient traditions and cutting-edge technology. From serene temples to neon-lit streets, Japan never fails to amaze.',
    highlights: [
      'Tokyo - The ultimate modern metropolis',
      'Kyoto - Ancient temples and geisha districts',
      'Mount Fuji - Japan\'s iconic peak',
      'Osaka - Street food paradise',
      'Hiroshima - Peace and resilience'
    ],
    travelTips: [
      'Get a JR Pass for unlimited train travel',
      'Learn basic Japanese phrases',
      'Visit during cherry blossom season (late March-April)',
      'Try an onsen (hot spring) experience'
    ],
    bestTimeToVisit: 'March to May (Spring) or October to November (Fall)',
    currency: 'Japanese Yen (JPY)',
    language: 'Japanese',
    blogPosts: [
      {
        id: 'jp-1',
        countryId: 'jp',
        title: 'Cherry Blossoms in Kyoto',
        excerpt: 'Experiencing hanami season in Japan\'s cultural capital.',
        content: 'There\'s nothing quite like witnessing the sakura in full bloom. The streets of Kyoto transform into tunnels of pink and white...',
        coverImage: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800',
        date: '2024-04-05',
        readTime: 6,
        tags: ['nature', 'culture', 'spring']
      }
    ]
  },
  {
    id: 'th',
    name: 'Thailand',
    code: 'TH',
    continent: 'Asia',
    coordinates: { lat: 15.870, lng: 100.9925 },
    visited: true,
    flagEmoji: '🇹🇭',
    coverImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
    description: 'The Land of Smiles welcomes you with incredible temples, stunning beaches, delicious food, and warm hospitality.',
    highlights: [
      'Bangkok - Temples, markets, and nightlife',
      'Chiang Mai - Mountains and elephants',
      'Phuket - Beautiful beaches',
      'Krabi - Limestone cliffs and islands',
      'Ayutthaya - Ancient ruins'
    ],
    travelTips: [
      'Dress modestly when visiting temples',
      'Bargain at markets (politely!)',
      'Try street food - it\'s amazing and safe',
      'Be respectful of the monarchy'
    ],
    bestTimeToVisit: 'November to February (Cool and dry)',
    currency: 'Thai Baht (THB)',
    language: 'Thai',
    blogPosts: [
      {
        id: 'th-1',
        countryId: 'th',
        title: 'Island Hopping in Southern Thailand',
        excerpt: 'From Phuket to Koh Phi Phi - discovering paradise.',
        content: 'The islands of southern Thailand are everything you\'ve seen in the movies and more. Crystal clear waters, dramatic limestone cliffs...',
        coverImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
        date: '2024-01-20',
        readTime: 7,
        tags: ['beaches', 'islands', 'adventure']
      }
    ]
  },
  {
    id: 'fr',
    name: 'France',
    code: 'FR',
    continent: 'Europe',
    coordinates: { lat: 46.2276, lng: 2.2137 },
    visited: true,
    flagEmoji: '🇫🇷',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    description: 'From the romantic streets of Paris to the lavender fields of Provence, France is a country of art, culture, and gastronomy.',
    highlights: [
      'Paris - The City of Light',
      'French Riviera - Glamorous coastline',
      'Provence - Lavender and vineyards',
      'Loire Valley - Magnificent châteaux',
      'Mont Saint-Michel - Medieval marvel'
    ],
    travelTips: [
      'Learn basic French - locals appreciate the effort',
      'Book major attractions in advance',
      'Embrace the café culture',
      'Try regional specialties in each area'
    ],
    bestTimeToVisit: 'April to June or September to October',
    currency: 'Euro (EUR)',
    language: 'French',
    blogPosts: [
      {
        id: 'fr-1',
        countryId: 'fr',
        title: 'A Week in Paris',
        excerpt: 'Beyond the Eiffel Tower - discovering the real Paris.',
        content: 'Paris is more than just its famous landmarks. In the winding streets of Le Marais and the bohemian corners of Montmartre, you\'ll find the soul of this incredible city...',
        coverImage: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800',
        date: '2024-05-10',
        readTime: 9,
        tags: ['city', 'culture', 'food']
      }
    ]
  },
  {
    id: 'au',
    name: 'Australia',
    code: 'AU',
    continent: 'Oceania',
    coordinates: { lat: -25.2744, lng: 133.7751 },
    visited: true,
    flagEmoji: '🇦🇺',
    coverImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800',
    description: 'The land down under offers everything from the iconic Sydney Opera House to the ancient wonder of the Great Barrier Reef.',
    highlights: [
      'Sydney - Harbour Bridge and Opera House',
      'Great Barrier Reef - World\'s largest coral reef',
      'Uluru - Sacred red rock',
      'Melbourne - Coffee and culture',
      'Great Ocean Road - Stunning coastal drive'
    ],
    travelTips: [
      'It\'s bigger than you think - plan travel times',
      'Wear sunscreen - the sun is intense',
      'Respect wildlife - look but don\'t touch',
      'Try a meat pie and flat white coffee'
    ],
    bestTimeToVisit: 'September to November or March to May',
    currency: 'Australian Dollar (AUD)',
    language: 'English',
    blogPosts: [
      {
        id: 'au-1',
        countryId: 'au',
        title: 'Diving the Great Barrier Reef',
        excerpt: 'Swimming with sea turtles and colorful coral gardens.',
        content: 'Nothing prepares you for the moment you slip beneath the surface of the Coral Sea. The Great Barrier Reef is a kaleidoscope of color and life...',
        coverImage: 'https://images.unsplash.com/photo-1587139223877-04cb899fa3e8?w=800',
        date: '2024-03-01',
        readTime: 6,
        tags: ['diving', 'nature', 'wildlife']
      }
    ]
  },
  {
    id: 'it',
    name: 'Italy',
    code: 'IT',
    continent: 'Europe',
    coordinates: { lat: 41.8719, lng: 12.5674 },
    visited: false,
    flagEmoji: '🇮🇹',
    coverImage: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800',
    description: 'From ancient Rome to the canals of Venice, Italy is a treasure trove of history, art, and the world\'s best cuisine.',
    highlights: [
      'Rome - Ancient history everywhere',
      'Venice - Romantic canals',
      'Florence - Renaissance art',
      'Amalfi Coast - Stunning coastline',
      'Tuscany - Rolling hills and wine'
    ],
    travelTips: [
      'Book popular museums in advance',
      'Eat where locals eat',
      'Learn basic Italian phrases',
      'Take the slow trains for scenic routes'
    ],
    bestTimeToVisit: 'April to June or September to October',
    currency: 'Euro (EUR)',
    language: 'Italian',
    blogPosts: []
  },
  {
    id: 'gr',
    name: 'Greece',
    code: 'GR',
    continent: 'Europe',
    coordinates: { lat: 39.0742, lng: 21.8243 },
    visited: false,
    flagEmoji: '🇬🇷',
    coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
    description: 'The cradle of Western civilization, where ancient ruins meet stunning islands and delicious Mediterranean cuisine.',
    highlights: [
      'Santorini - Iconic sunsets',
      'Athens - Ancient Acropolis',
      'Mykonos - Beautiful beaches',
      'Meteora - Monasteries in the sky',
      'Crete - Largest Greek island'
    ],
    travelTips: [
      'Island hop by ferry',
      'Visit in shoulder season to avoid crowds',
      'Try local tavernas over tourist restaurants',
      'Bring comfortable walking shoes'
    ],
    bestTimeToVisit: 'May to June or September to October',
    currency: 'Euro (EUR)',
    language: 'Greek',
    blogPosts: []
  },
  {
    id: 'pe',
    name: 'Peru',
    code: 'PE',
    continent: 'South America',
    coordinates: { lat: -9.19, lng: -75.0152 },
    visited: false,
    flagEmoji: '🇵🇪',
    coverImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
    description: 'Home to Machu Picchu and the Amazon rainforest, Peru offers incredible history, adventure, and some of the world\'s best food.',
    highlights: [
      'Machu Picchu - Lost city of the Incas',
      'Cusco - Ancient Incan capital',
      'Lima - Culinary capital',
      'Amazon Rainforest - Wildlife paradise',
      'Rainbow Mountain - Colorful peaks'
    ],
    travelTips: [
      'Acclimatize to altitude in Cusco',
      'Book Machu Picchu tickets months ahead',
      'Try ceviche in Lima',
      'Learn some Spanish basics'
    ],
    bestTimeToVisit: 'May to October (Dry season)',
    currency: 'Peruvian Sol (PEN)',
    language: 'Spanish, Quechua',
    blogPosts: []
  },
  {
    id: 'is',
    name: 'Iceland',
    code: 'IS',
    continent: 'Europe',
    coordinates: { lat: 64.9631, lng: -19.0208 },
    visited: false,
    flagEmoji: '🇮🇸',
    coverImage: 'https://images.unsplash.com/photo-1520769669658-f07657e5b307?w=800',
    description: 'The land of fire and ice, where glaciers meet volcanoes, and the Northern Lights dance across the sky.',
    highlights: [
      'Northern Lights - Nature\'s light show',
      'Blue Lagoon - Geothermal spa',
      'Golden Circle - Iconic route',
      'Jökulsárlón - Glacier lagoon',
      'Reykjavik - Colorful capital'
    ],
    travelTips: [
      'Rent a 4x4 for the highlands',
      'Layer your clothing',
      'Book accommodations early',
      'Respect the fragile nature'
    ],
    bestTimeToVisit: 'June to August (Midnight Sun) or September to March (Northern Lights)',
    currency: 'Icelandic Króna (ISK)',
    language: 'Icelandic',
    blogPosts: []
  },
  {
    id: 'mx',
    name: 'Mexico',
    code: 'MX',
    continent: 'North America',
    coordinates: { lat: 23.6345, lng: -102.5528 },
    visited: false,
    flagEmoji: '🇲🇽',
    coverImage: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800',
    description: 'A vibrant country of ancient ruins, colorful culture, incredible food, and beautiful beaches.',
    highlights: [
      'Mexico City - Massive metropolis with rich history',
      'Cancun & Riviera Maya - Caribbean beaches',
      'Oaxaca - Indigenous culture and cuisine',
      'Chichen Itza - Mayan wonder',
      'Guanajuato - Colorful colonial city'
    ],
    travelTips: [
      'Explore beyond the resorts',
      'Learn some Spanish',
      'Try authentic tacos from street vendors',
      'Visit during Day of the Dead (Nov 1-2)'
    ],
    bestTimeToVisit: 'December to April (Dry season)',
    currency: 'Mexican Peso (MXN)',
    language: 'Spanish',
    blogPosts: []
  }
];

export const getCountryById = (id: string): Country | undefined => {
  return countries.find((country) => country.id === id);
};

export const getCountriesByContinent = (continent: string): Country[] => {
  return countries.filter((country) => country.continent === continent);
};

export const getVisitedCountries = (): Country[] => {
  return countries.filter((country) => country.visited);
};

export const getWishlistCountries = (): Country[] => {
  return countries.filter((country) => !country.visited);
};
