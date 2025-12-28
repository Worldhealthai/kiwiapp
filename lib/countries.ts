export interface Place {
  name: string;
  description: string;
  tips: string;
  link?: string;
  isBooking: boolean;
}

export interface Experience {
  name: string;
  description: string;
  link?: string;
  isBooking: boolean;
}

export interface Country {
  id: string;
  name: string;
  city: string;
  flagEmoji: string;
  coverImage: string;
  coordinates: { lat: number; lng: number };
  visited: boolean;
  continent: 'Europe' | 'Asia' | 'Africa' | 'North America' | 'South America' | 'Oceania';
  parentCountry?: string; // For multi-city countries (e.g., "USA" for both Nashville and Las Vegas)
  places: Place[];
  experiences: Experience[];
  topTips: string[];
  foodRecs: string[];
  accommodationTips: string;
  whatToPack: string;
}

export const countries: Country[] = [
  {
    id: 'france',
    name: 'France',
    city: 'Paris',
    flagEmoji: '🇫🇷',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    visited: true,
    continent: 'Europe',
    places: [
      {
        name: 'Eiffel Tower',
        description: 'The Eiffel Tower truly stole the show during my first visit to Paris. Ever since I was a child, I dreamt of standing in front of this iconic structure. The breath-taking views from the top, which stands at 275m, left me speechless.',
        tips: 'Pre-book tickets to avoid queues. The experience typically lasts 1.5-2 hours. Don\'t forget your cameras!',
        link: 'https://getyourguide.tp.st/edHIqXid',
        isBooking: true
      },
      {
        name: 'Arc De Triomphe',
        description: 'Can you believe it took 30 years to build this iconic monument? Situated right in the middle of a bustling roundabout, where you can witness cars navigating through various lanes, creating a captivating chaos. The panoramic views from the top are breath-taking.',
        tips: 'Visit on the first of the month for free admission! Otherwise tickets start from €15.',
        link: 'https://getyourguide.tp.st/mIE2xuXA',
        isBooking: true
      },
      {
        name: 'Disneyland Paris',
        description: 'A place that truly lives up to its reputation as one of the happiest places on earth. Book tickets in advance, opt for a weekday visit, and arrive 30 minutes before gates open to beat the crowds.',
        tips: 'Pack snacks to save on food costs. Catch all the amazing rides and fireworks for a magical ending. Tickets from €55.',
        link: 'https://getyourguide.tp.st/pH7eMOmP',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Fine Dining at JJ Beaumarchais',
        description: 'A delightful 4 or 6 course dining experience with two entrees, two mains, and two desserts. The attentive staff explain the intricate ingredients of each dish. €60 but worth every penny.',
        link: 'https://jjbeaumarchais.com/',
        isBooking: true
      },
      {
        name: 'Speakeasy Bar - Mobster Bar',
        description: 'A charming and distinctive cocktail bar with a twist. This enigmatic venue is tucked away from prying eyes. You\'ll need to crack a riddle before gaining entry! Cocktails around €15.',
        link: 'https://mobsterbar.com/',
        isBooking: true
      }
    ],
    topTips: [
      'Pre-book tickets for major attractions like the Eiffel Tower to avoid long queues',
      'Visit the Arc de Triomphe on the first of the month for free rooftop views',
      'Book fine dining experiences in advance as bookings run out',
      'For Disneyland, opt for a weekday visit and arrive 30 minutes before gates open'
    ],
    foodRecs: [
      'JJ Beaumarchais - exceptional 4-6 course French dining (€60)',
      'Croissants and coffee at a cozy Parisian café along the Seine',
      'Cocktails at speakeasy bars like Mobster Bar (€15 per cocktail)'
    ],
    accommodationTips: 'For Disneyland visits, staying at a hotel just one stop away from the park is a great budget-friendly choice.',
    whatToPack: 'Comfortable walking shoes for cobblestone streets, light jacket for variable weather, and a camera.'
  },
  {
    id: 'malta',
    name: 'Malta',
    city: 'Valletta',
    flagEmoji: '🇲🇹',
    coverImage: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800',
    coordinates: { lat: 35.8989, lng: 14.5146 },
    visited: true,
    continent: 'Europe',
    places: [
      {
        name: 'Upper Barrakka Gardens',
        description: 'Nestled in the heart of Valletta, this enchanting public garden provides a serene escape with panoramic views of the Grand Harbour.',
        tips: 'Open 7am-10pm, freely accessible. Perfect first pit stop.',
        isBooking: false
      },
      {
        name: 'Ghajn Tuffieha Bay',
        description: 'The ultimate beach destination on mainland Malta with diverse beaches and incredible hiking spots. Scaling the rock face to reach a breath-taking viewpoint is worth it for adventurous souls.',
        tips: 'Pay attention to flag systems for currents. Use Bolt or bus to Riviera stop. Over 100 steps to descend!',
        isBooking: false
      },
      {
        name: 'Gozo Island',
        description: 'The sister island offers unforgettable adventure with ferry crossing, jeep exploration, Ggantija Temple (world heritage site), the Citadel, and Xwejni Salt Pans.',
        tips: 'Guided tour around €80 EUR, includes 8 hours, lunch, ferry, and hotel transfers.',
        link: 'https://getyourguide.tp.st/cCFfo6Om',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Walking Tours of Valletta',
        description: 'Discover this UNESCO world heritage site with 320 historic monuments. Guides share fascinating historical facts and extraordinary landmarks.',
        link: 'https://tiqets.tp.st/XiQfTdk2',
        isBooking: true
      },
      {
        name: 'St Julian\'s Nightlife',
        description: 'Energetic and vibrant party atmosphere with clubs like Havana, Sky Club, and rooftop bars like Twenty Two. Great dining options from casual to fine dining.',
        isBooking: false
      },
      {
        name: 'Pub Crawl Experience',
        description: 'Fantastic way to meet new people, immerse yourself in a lively atmosphere and discover the local nightlife.',
        link: 'https://viator.tp.st/Ed84MgAD',
        isBooking: true
      }
    ],
    topTips: [
      'Use Bolt services for convenient beach transport',
      'Pay attention to beach flag systems before swimming',
      'Book Gozo Island day tours in advance',
      'Don\'t let the small 27km island fool you - countless destinations to explore'
    ],
    foodRecs: [
      'Local cuisine at St Julian\'s diverse restaurants',
      'Purchase genuine natural salt from farmers at Xwejni Salt Pans on Gozo',
      'St Julian\'s offers casual to fine dining options'
    ],
    accommodationTips: 'Valletta city centre is ideal for historic sites. St Julian\'s is perfect for beach and party scene.',
    whatToPack: 'Sunscreen and water for hot weather, comfortable shoes for 100+ step beach staircases, party attire for nightlife.'
  },
  {
    id: 'romania',
    name: 'Romania',
    city: 'Bucharest',
    flagEmoji: '🇷🇴',
    coverImage: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=800',
    coordinates: { lat: 44.4268, lng: 26.1025 },
    visited: true,
    continent: 'Europe',
    places: [
      {
        name: 'Old Town (Centrul Vechi)',
        description: 'The heart of the city with vibrant bars, clubs, affordable drinks and amazing food. A hub for exciting events and parties that last all night long.',
        tips: 'Bring earplugs if you\'re a light sleeper staying in the city centre!',
        isBooking: false
      },
      {
        name: 'Peleș Castle',
        description: 'The most extravagant highlight! First castle in Europe fully powered by electricity (1873-1914) with electric lighting, central heating and an elevator.',
        tips: 'Part of a guided day tour from Bucharest. Journey takes 8-10 hours but absolutely worthwhile.',
        link: 'https://getyourguide.tp.st/aRYkIhBz',
        isBooking: true
      },
      {
        name: 'Bran Castle (Dracula\'s Castle)',
        description: 'Often linked to Dracula, this castle\'s mysterious aura and Transylvania location has solidified its connection to vampire lore. An hour from Peleș Castle.',
        tips: 'Usually visited as part of a combined castle tour with Peleș Castle.',
        link: 'https://getyourguide.tp.st/aRYkIhBz',
        isBooking: true
      },
      {
        name: 'Therme București Spa',
        description: 'Incredible spa with waterslides, indoor and outdoor heated thermal pools, saunas and steam rooms. Thermal water sourced from natural springs.',
        tips: 'Bring swimwear, towel and flip flops (mandatory). Just 15-20 mins from airport - perfect for last day!',
        link: 'https://getyourguide.tp.st/cJOfFzuf',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Transylvania Castle Day Tour',
        description: 'Guided tour includes Peleș Castle, Bran Castle, and ends in picturesque Brașov. 8-10 hours but worth every minute.',
        link: 'https://getyourguide.tp.st/aRYkIhBz',
        isBooking: true
      },
      {
        name: 'Rooftop Bar - Linea/Closer to The Moon',
        description: 'Perfect spot for sunset with local beer or cocktails. Book in advance for cozy igloos. Cocktails from 35 LEI (£6).',
        link: 'https://booklinea.me/',
        isBooking: true
      },
      {
        name: 'Traditional Dining at Caru Cu Bere',
        description: 'Exciting Romanian restaurant with meat-centric menu - pork with potatoes and cabbage. Try local Bacanta wine. Mains from 45 LEI (£7.50).',
        link: 'https://www.carucubere.ro/meniu',
        isBooking: true
      }
    ],
    topTips: [
      'Book restaurant tables in advance and request seating near entertainment',
      'Bring swimwear, towel, and flip flops for Therme spa (mandatory but rentable)',
      'Visit spa on departure day - only 15-20 mins from airport',
      'Castle day tour takes 8-10 hours but worth every minute'
    ],
    foodRecs: [
      'Caru Cu Bere - traditional Romanian pork with Bacanta wine (45 LEI/£7.50)',
      'Hanu\'lul Manuc - generous portions with live music and dancing',
      'Mosto Natural Wine Bar - Romania\'s first natural wine bar (from 32 LEI/£5)'
    ],
    accommodationTips: 'Old Town puts you in the heart of the action. Bring earplugs if you\'re a light sleeper!',
    whatToPack: 'Comfortable clothes for long castle tour bus rides, swimwear for spa, and cash in Romanian LEI.'
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    city: 'Amsterdam',
    flagEmoji: '🇳🇱',
    coverImage: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800',
    coordinates: { lat: 52.3676, lng: 4.9041 },
    visited: true,
    continent: 'Europe',
    places: [
      {
        name: 'Albert Cuyp Market',
        description: 'A foodie paradise with local delicacies. Try the Poffertjes - fluffy mini pancakes cooked in front of your eyes and topped with your favourite sauces.',
        tips: 'Great for breakfast or snacking. €4.50 for 10 pieces!',
        link: 'https://albertcuyp-markt.amsterdam/attractions/?lang=en',
        isBooking: false
      },
      {
        name: 'Van Stapele Koekmakerij',
        description: 'The most delicious cookie in Amsterdam, freshly baked right before your eyes. I went back the very next day for another cookie fix!',
        tips: 'Single cookie €3 or box of 6 for €15. Expect queues but worth the wait!',
        link: 'https://vanstapele.com/en/home/',
        isBooking: false
      },
      {
        name: 'Keukenhof Gardens',
        description: 'Amazing during April-May. 7 million bulbs planted across 79 acres. Over a million visitors during the short two-month opening period.',
        tips: 'Book tickets ahead. Arrive 9am or 10am to avoid crowds. Check weather forecast.',
        link: 'https://getyourguide.tp.st/GsQvviC2',
        isBooking: true
      },
      {
        name: 'Anne Frank House',
        description: 'A captivating journey back to WWII. Step into the house where Anne Frank hid for over two years. Plan 2-3 hours.',
        tips: 'Book tickets 6 weeks in advance - they sell out quickly! €16 including audio guide.',
        link: 'https://www.annefrank.org/en/',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Walking Tour of Amsterdam',
        description: 'Explore the Red Light District, Kop Zeedijk (oldest parts), the national monument op de dam, old trams, and Rijksmuseum.',
        isBooking: false
      },
      {
        name: 'Greg Monsieur Toasties',
        description: 'Best toasties in Amsterdam with customizable fillings. Prices from €3.50 to €6.75.',
        link: 'https://www.gregmonsieur.nl/',
        isBooking: false
      },
      {
        name: 'Heertje Friet',
        description: 'The fries that truly stand out from the rest. Freshly cooked and topped with your sauce of choice.',
        link: 'https://www.heertjefriet.nl/',
        isBooking: false
      }
    ],
    topTips: [
      'Book Keukenhof tickets in advance for April-May, arriving at 9am',
      'Reserve Anne Frank House tickets 6 weeks before - they sell out immediately',
      'Explore by bicycle like locals - excellent bike infrastructure',
      'Embrace the cycling culture - bikes and canals everywhere!'
    ],
    foodRecs: [
      'Poffertjes at Albert Cuyp Market - €4.50 for 10 pieces',
      'Van Stapele cookies - €3 single or €15 for box of 6 (worth the queue!)',
      'Heertje Friet - exceptional freshly-cooked fries',
      'Greg Monsieur toasties - €3.50 to €6.75'
    ],
    accommodationTips: 'Staying slightly outside the centre can be more affordable while still convenient.',
    whatToPack: 'Comfortable cycling-friendly clothes, rain gear for unpredictable weather, camera for canals and Keukenhof.'
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    city: 'Cape Town',
    flagEmoji: '🇿🇦',
    coverImage: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800',
    coordinates: { lat: -33.9249, lng: 18.4241 },
    visited: true,
    continent: 'Africa',
    places: [
      {
        name: 'Table Mountain',
        description: 'An iconic flat-topped marvel ranked as one of the oldest mountains on Earth. The Platteklip Gorge trail is a thrilling 1.8km trek to 1050m above sea level. My reward? A cold, locally brewed beer with breathtaking panoramic views.',
        tips: 'Take the cable car if hiking isn\'t your thing. Use Hop-On Hop-Off bus. Bundle bookings from around £34.',
        link: 'https://getyourguide.tp.st/iwORDdY8',
        isBooking: true
      },
      {
        name: 'Signal Hill - Paragliding',
        description: 'Paragliding with breathtaking views of the city, ocean, and surrounding hills. 5-10 minutes soaking in stunning sights. A highlight I would do again in a heartbeat.',
        tips: 'Setup takes around 20 mins, whole activity 1-1.5 hours. Prices from £60-£70.',
        link: 'https://getyourguide.tp.st/XyjB2zLm',
        isBooking: true
      },
      {
        name: 'Cape Winelands',
        description: 'The largest wine-producing area in the country. Visit Stellenbosch and Franschhoek valleys. Reminds me of New Zealand but with its own special charm.',
        tips: 'Pace yourself during tastings, savor the flavours, book in advance, buy favourites to take home.',
        link: 'https://viator.tp.st/cO9olv6O',
        isBooking: true
      },
      {
        name: 'Aquila Private Game Reserve',
        description: 'Search for the Big Five across 10,000 hectares framed by Karoo Mountains. I encountered lions, elephants, rhinos, giraffes, zebras, hippos, and various bird species.',
        tips: 'Game drives 1-2 hours with stops. Half-day includes buffet lunch, transfers, and knowledgeable guides.',
        link: 'https://getyourguide.tp.st/08k361Ox',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Table Mountain Hike - Platteklip Gorge',
        description: 'Thrilling 1.8km trek to 1050m above sea level. Set your own pace with breaks whenever needed. My summit reward was a cold locally brewed beer with breathtaking views.',
        link: 'https://getyourguide.tp.st/iwORDdY8',
        isBooking: true
      },
      {
        name: 'Wine Tasting Day Tour',
        description: 'Visit various wineries in Stellenbosch and Franschhoek valleys. Expert guidance helps you understand production and appreciate local wines.',
        link: 'https://viator.tp.st/cO9olv6O',
        isBooking: true
      },
      {
        name: 'Safari at Aquila Game Reserve',
        description: 'Search for the Big Five and fascinating wildlife. Half-day experience includes buffet lunch, round-trip transfers, and knowledgeable guides.',
        link: 'https://getyourguide.tp.st/08k361Ox',
        isBooking: true
      }
    ],
    topTips: [
      'Book wine tours and safari in advance, especially during peak season',
      'Pace yourself during wine tastings and stay hydrated',
      'Set your own pace when hiking Table Mountain',
      'Cable car is a great alternative if you don\'t want to hike'
    ],
    foodRecs: [
      'Locally brewed beer at Table Mountain summit',
      'Wine tasting at Stellenbosch and Franschhoek with food pairings',
      'Buffet lunch with Aquila safari featuring local South African cuisine'
    ],
    accommodationTips: 'Cape Town offers variety. Having local guides makes exploration easier and safer. Book in advance during peak season.',
    whatToPack: 'Comfortable hiking shoes, layers for variable mountain weather, binoculars for safari wildlife viewing.'
  },
  {
    id: 'wales',
    name: 'Wales',
    city: 'Cardiff',
    flagEmoji: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    coverImage: 'https://images.unsplash.com/photo-1599833975787-5c143f373c30?w=800',
    coordinates: { lat: 51.4816, lng: -3.1791 },
    visited: true,
    continent: 'Europe',
    places: [
      {
        name: 'Cardiff Castle',
        description: 'A breathtaking blend of 2,000 years of history. From Roman fort to Norman Keep with panoramic views, WWII wartime shelter tunnels, and stunning Gothic Revival Castle Apartments.',
        tips: 'Arrive early to avoid crowds. Consider a guided tour for deeper understanding. Allow plenty of time.',
        link: 'https://www.cardiffcastle.com/',
        isBooking: true
      },
      {
        name: 'Snowdonia - Watkins Path Waterfalls',
        description: 'Mount Snowdon is the tallest peak in Wales at 1,085m. Try Watkins Path for stunning waterfalls - 20-30 minute walk. Take a plunge in the icy cold water!',
        tips: 'Park near Caffi Gwynant (LL55 4NH). Wear old comfortable shoes. A car is essential - prepare for narrow, winding roads.',
        isBooking: false
      },
      {
        name: 'Zip World - Fastest Zipline',
        description: 'The fastest zipline in the world! Soar at speeds up to 100mph through stunning Welsh mountains. Mini zipline takes you partway, then a truck to the top.',
        tips: 'Fully equipped with safety gear, detailed briefing, and camera capture. Prices from £92.',
        link: 'https://www.zipworld.co.uk/',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Free Walking Tour of Cardiff',
        description: 'Covers must-see spots like Bute Park, Principality Stadium, and Cardiff City Hall. Tours typically last 2-3 hours.',
        link: 'https://www.freetour.com/',
        isBooking: true
      },
      {
        name: 'Cardiff Castle Exploration',
        description: 'Explore 2,000 years of history. Climb Norman Keep for views, walk through WWII tunnels, admire Gothic Revival apartments.',
        link: 'https://www.cardiffcastle.com/',
        isBooking: true
      },
      {
        name: 'Zip World Experience',
        description: 'Soar at 100mph through stunning Welsh mountain scenery. Complete experience includes mini ziplines, truck transport, safety gear, and photo/video capture.',
        link: 'https://www.zipworld.co.uk/',
        isBooking: true
      }
    ],
    topTips: [
      'Arrive early at Cardiff Castle to avoid crowds',
      'Wear old comfortable shoes for Snowdonia - expect mud',
      'Book Zip World in advance and prepare for the ultimate adrenaline rush',
      'Walking tours are tip-based - reward your guide based on the experience'
    ],
    foodRecs: [
      'Anna Loka - Cardiff\'s first fully vegan restaurant (£8-£15 mains)',
      'Giovanni\'s Restaurant - authentic Italian (around £25 mains)',
      'Pack a picnic for Snowdonia adventures'
    ],
    accommodationTips: 'Cardiff city centre offers easy access to all major attractions. Wales has over 600 castles to explore!',
    whatToPack: 'Waterproof hiking boots, layers for changeable Welsh weather, old clothes for waterfall adventures.'
  },
  {
    id: 'ireland',
    name: 'Ireland',
    city: 'Dublin',
    flagEmoji: '🇮🇪',
    coverImage: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?w=800',
    coordinates: { lat: 53.3498, lng: -6.2603 },
    visited: true,
    continent: 'Europe',
    places: [
      {
        name: 'Guinness Storehouse',
        description: 'An absolute must! A vibrant, multi-sensory experience across multiple immersive levels. Interactive stations let you test brewing knowledge or perfect pouring the perfect pint. Complimentary drink at the end!',
        tips: 'Plan 90-120 minutes. Bring a snack if saving appetite for Dublin feast. Tickets from €24.',
        link: 'https://getyourguide.tp.st/f6iUJWgf',
        isBooking: true
      },
      {
        name: 'Temple Bar',
        description: 'Dublin\'s renowned cultural and nightlife destination with lively atmosphere, cobblestone streets, pubs, and food shops. Traditional Irish music, generous pints of Guinness, and enchanting Dublin allure.',
        tips: 'Perfect for both daytime culture and evening festivities. Try multiple pubs for different atmospheres.',
        link: 'https://thetemplebarpub.com/',
        isBooking: false
      },
      {
        name: 'Hop-On Hop-Off Bus Tour',
        description: 'Discover famous landmarks and hidden treasures. Visits Trinity College, Guinness Storehouse, St. Patrick\'s Cathedral, Kilmainham Gaol, Dublin Castle. Buses every 15-20 mins.',
        tips: 'Tickets from €24. Valid 24-48 hours. Ideal for solo adventurers, families, or newcomers.',
        link: 'https://getyourguide.tp.st/jjWXoEWp',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Guinness Storehouse Tour',
        description: 'Multi-sensory experience across multiple levels. Test brewing knowledge, learn to pour the perfect pint, enjoy complimentary drink. Might be greeted by lively local music!',
        link: 'https://getyourguide.tp.st/f6iUJWgf',
        isBooking: true
      },
      {
        name: 'Dublin Hop-On Hop-Off Bus Tour',
        description: 'Explore landmarks and hidden treasures at your own pace. Live guides provide insider insights. Buses every 15-20 mins with 24-48 hour validity.',
        link: 'https://getyourguide.tp.st/jjWXoEWp',
        isBooking: true
      },
      {
        name: 'Traditional Irish Dining',
        description: 'Woollen Mills offers Irish comfort food - fish n chips, beef stew (€20/main). Vintage Kitchen has seasonal Irish cuisine with salmon and lamb stew (€30-40 for 3 courses).',
        link: 'https://www.thewoollenmills.com/',
        isBooking: true
      }
    ],
    topTips: [
      'Use Airport Express buses at €12-14 round-trip instead of taxis (30 min to city)',
      'Bring a snack for Guinness Factory to save appetite for Dublin dining',
      'Use Hop-On Hop-Off for comprehensive sightseeing at your own pace',
      'Local buses are €3.30 - have exact change or a Leap Card (no cards accepted)'
    ],
    foodRecs: [
      'Woollen Mills - Irish comfort food, fish n chips, beef stew (€20/main)',
      'The Vintage Kitchen - seasonal Irish with salmon and lamb stew (€30-40 for 3 courses)',
      'Perfect pint of Guinness at Temple Bar\'s traditional pubs'
    ],
    accommodationTips: 'Dublin is easy to navigate. Airport Express runs 24/7 (30 mins, €12-14 round-trip).',
    whatToPack: 'Leap Card or exact change for buses, comfortable walking shoes for cobblestones, rain gear for Irish weather.'
  },
  {
    id: 'poland',
    name: 'Poland',
    city: 'Warsaw',
    flagEmoji: '🇵🇱',
    coverImage: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=800',
    coordinates: { lat: 52.2297, lng: 21.0122 },
    visited: true,
    continent: 'Europe',
    places: [
      {
        name: 'Old Town (UNESCO World Heritage)',
        description: 'Almost entirely destroyed during WWII, carefully rebuilt to preserve cobblestone streets, colourful buildings, and the Royal Castle. A window into Poland\'s past with vibrant culture and inviting cafes.',
        tips: 'Join a walking tour to dive deeper into history. Stay hydrated and wear comfortable shoes!',
        link: 'https://getyourguide.tp.st/hoqDLVPa',
        isBooking: true
      },
      {
        name: 'Vodka Museum',
        description: 'An engaging, interactive exploration of vodka history, ingredients, and production. Five captivating galleries ending with a delightful tasting session of 3-5 different varieties.',
        tips: 'Tour lasts around 70 minutes. Tickets from €19. Fun and flavourful!',
        link: 'https://getyourguide.tp.st/T8UoTVPP',
        isBooking: true
      },
      {
        name: 'Royal Castle',
        description: 'Part of the beautifully restored Old Town, showcasing Warsaw\'s determination to preserve heritage after WWII. Represents Poland\'s remarkable resilience and rebirth.',
        tips: 'Best visited as part of an Old Town walking tour for full historical context.',
        link: 'https://getyourguide.tp.st/hoqDLVPa',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Gun Range Shooting Experience',
        description: 'An absolute game-changer! Handle five different firearms including pistol, AK-47, assault rifle, shotgun, and submachine gun. Top-notch instructors snap photos and videos.',
        link: 'https://viator.tp.st/Wjy1QXjH',
        isBooking: true
      },
      {
        name: 'Chopin Piano Show',
        description: 'A standout experience paying tribute to Frédéric Chopin. Captivating performance in an intimate historic venue where elegance beautifully complements timeless music.',
        link: 'https://getyourguide.tp.st/2alQp5Fl',
        isBooking: true
      },
      {
        name: 'Old Town Walking Tour',
        description: 'Explore the UNESCO World Heritage Site rebuilt after WWII. Discover cobblestone streets, colourful buildings, Royal Castle, and remarkable stories of Warsaw\'s resilience.',
        link: 'https://getyourguide.tp.st/hoqDLVPa',
        isBooking: true
      }
    ],
    topTips: [
      'Book gun range and popular activities in advance',
      'Wear comfortable walking shoes for Old Town exploration',
      'Vodka Museum tour lasts 70 minutes - perfect for a cultural afternoon',
      'Warsaw\'s modern skyline contrasts beautifully with restored Old Town'
    ],
    foodRecs: [
      'Pierogi - savory or sweet dumplings (Polish staple)',
      'Żurek - tangy sour rye soup with sausage and egg (perfect for cooler days)',
      'Bigos - rich hunter\'s stew with cabbage, sauerkraut, and meats'
    ],
    accommodationTips: 'Warsaw blends history with modernity. Old Town offers charming stays, modern skyline area has contemporary options.',
    whatToPack: 'Comfortable walking shoes for extensive exploration, layers for variable Polish weather, camera for historic architecture.'
  },
  {
    id: 'germany',
    name: 'Germany',
    city: 'Munich',
    flagEmoji: '🇩🇪',
    coverImage: 'https://images.unsplash.com/photo-1595867818082-083862f3d630?w=800',
    coordinates: { lat: 48.1351, lng: 11.5820 },
    visited: true,
    continent: 'Europe',
    places: [
      {
        name: 'Chinesischer Turm Beer Garden',
        description: 'One of the most iconic outdoor beer gardens in Munich! Traditional Bavarian food and large beers in a lively, welcoming atmosphere. Perfect for gathering with family and friends.',
        tips: 'Full litre beer around €14. Classic roast pork €18. Expect to spend €30-40 for a hearty meal and drink.',
        link: 'https://tripadvisor.tp.st/QWi95xUV',
        isBooking: false
      },
      {
        name: 'Nuremberg Day Trip',
        description: 'An enchanting historical city 170km north. Stunning medieval architecture, rich history, vibrant culture. High-speed train gets you there in 1 hour 15 minutes.',
        tips: 'Take the high-speed train. Don\'t miss the Bimmelbahn train tour around city sights.',
        link: 'https://getyourguide.tp.st/iR0gYucg',
        isBooking: true
      },
      {
        name: 'Nuremberg Toy Museum',
        description: 'Unique highlight showcasing fascinating evolution of toy making from ancient times to modern day. Wonderful for all ages.',
        tips: 'Part of a Nuremberg day trip - combine with castle visit and old town.',
        link: 'https://tripadvisor.tp.st/y25lVeJV',
        isBooking: false
      }
    ],
    experiences: [
      {
        name: 'Guided Beer House Tour',
        description: 'Deep dive into Bavaria\'s rich brewing traditions. A guide leads you through historic and celebrated beer houses sharing fascinating stories. 3 hours with transport and two beers.',
        link: 'https://getyourguide.tp.st/7AfYzsiy',
        isBooking: true
      },
      {
        name: 'Half-Day City Bike Tour',
        description: 'Combine sightseeing with activity! Visit Marienplatz, English Garden, and hidden gems. Many tours include a stop at a local beer garden. Perfect for first-time visitors!',
        link: 'https://getyourguide.tp.st/q2BQOXqP',
        isBooking: true
      },
      {
        name: 'Oktoberfest (September-October)',
        description: 'One of the biggest and most exciting beer festivals in the world! Millions of visitors for Bavarian culture, traditional music, hearty food, and litres of beer.',
        isBooking: false
      }
    ],
    topTips: [
      'Book Oktoberfest accommodation at least one year in advance',
      'Reserve beer tent tables for large groups well ahead',
      'Pace yourself at Oktoberfest - drink water between beers',
      'Guided beer tour at €45 includes transport, exclusive access, and two beers'
    ],
    foodRecs: [
      'Traditional Bavarian roast pork at Chinesischer Turm (€18)',
      'Full litre beers at Munich\'s famous beer gardens (€14)',
      'Oktoberfest - pretzels, sausages, and schnitzels'
    ],
    accommodationTips: 'For Oktoberfest, book at least one year in advance. City is well-connected with excellent public transport.',
    whatToPack: 'Comfortable walking and cycling shoes, rain jacket, Lederhosen/Dirndl for Oktoberfest (optional!).'
  },
  {
    id: 'norway',
    name: 'Norway',
    city: 'Oslo & Tromsø',
    flagEmoji: '🇳🇴',
    coverImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
    coordinates: { lat: 69.6496, lng: 18.9560 },
    visited: true,
    continent: 'Europe',
    places: [
      {
        name: 'Holmenkollen Ski Jump (Oslo)',
        description: 'One of Norway\'s most exciting attractions showcasing rich winter sports heritage. Stunning panoramic views of Oslo and surrounding fjord from the summit.',
        tips: 'Direct train then 10-minute walk from Holmenkollen station. Features over 4,000 years of skiing history.',
        link: 'https://www.visitoslo.com/en/product/?tlp=2992333&name=Holmenkollen-Ski-Museum--Tower',
        isBooking: true
      },
      {
        name: 'Vigeland Park (Oslo)',
        description: 'A must-see for art and nature lovers. Over 200 stunning sculptures by Gustav Vigeland capturing the complexity of human emotions and relationships.',
        tips: 'Free entry. 10-15 mins from city centre by transport, or 30-min walk. Take time to immerse yourself.',
        isBooking: false
      },
      {
        name: 'Fjellheisen Cable Car (Tromsø)',
        description: 'Stunning views of Tromsø from just 15 minutes from city centre. 4-5 minute ride to breathtaking panoramic views. Can continue hiking further up.',
        tips: 'Consider hiking back down in suitable weather. Great views in both summer and winter.',
        link: 'https://www.fjellheisen.no/',
        isBooking: true
      },
      {
        name: 'Pust Sauna (Tromsø)',
        description: 'A truly one-of-a-kind floating sauna on the waterfront with breathtaking views of fjords and mountains. The highlight? Plunging into icy Norwegian waters before dashing back into the warm sauna.',
        tips: 'A sensory delight. Perfect for unwinding after a day of exploring.',
        link: 'https://www.pust.io/',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Dog Sledding in Tromsø',
        description: 'An unforgettable adventure! Glide through pristine snow-covered landscapes with enthusiastic huskies. The thrill of racing through Arctic silence with only the sound of sled and paws is absolutely magical.',
        link: 'https://getyourguide.tp.st/8SMbPvjj',
        isBooking: true
      },
      {
        name: 'Northern Lights Chase',
        description: 'The much-anticipated magical adventure. Everything depends on weather - my trip required crossing into Finland. Includes campfires and marshmallows while waiting. Note: colors captured better by camera than naked eye.',
        link: 'https://getyourguide.tp.st/VAAvvHmr',
        isBooking: true
      },
      {
        name: 'Free Walking Tour of Oslo',
        description: 'Great way to explore Oslo and discover highlights like Vigeland Park. Tours cover main attractions while sharing local insights and history.',
        isBooking: false
      }
    ],
    topTips: [
      'Prepare for higher dining costs in Norway compared to other European destinations',
      'Book dog sledding in advance - the higher cost is worth every penny',
      'Keep phones fully charged for Northern Lights photography and prepare for long, cold nights',
      'Oslo Klatrepark climbing courses are great for summer (around €30 per adult)'
    ],
    foodRecs: [
      'Warm drinks and snacks after dog sledding (included with most tours)',
      'Local Norwegian cuisine in Oslo (be prepared for higher pricing)',
      'Marshmallows by campfire during Northern Lights adventures'
    ],
    accommodationTips: 'Oslo offers a good introduction to Norway but dining is more expensive. Tromsø is the gateway to Arctic adventures.',
    whatToPack: 'Extremely warm layered clothing for Arctic activities, fully charged phones and portable charger, comfortable shoes for city exploration.'
  },
  {
    id: 'england',
    name: 'England',
    city: 'London',
    flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    visited: true,
    continent: 'Europe',
    places: [
      {
        name: 'West End Theatre District',
        description: 'World-renowned theatre district with timeless musicals like Phantom of the Opera, Les Misérables, and modern hits like Hamilton and The Lion King. Stunning choreography, captivating storytelling.',
        tips: 'Book tickets in advance. A great way to end a day of sightseeing!',
        link: 'https://www.todaytix.com/',
        isBooking: true
      },
      {
        name: 'Tower of London',
        description: 'Over 1,000 years of history as royal palace, prison, and treasury. See the Crown Jewels, White Tower, and famous Beefeaters who guide you through fascinating past.',
        tips: 'Check Changing of the Guard schedule in advance - not held daily.',
        link: 'https://getyourguide.tp.st/iTaFfRN5',
        isBooking: true
      },
      {
        name: 'London Eye',
        description: 'Iconic Ferris wheel offering breathtaking views of Big Ben, St. Paul\'s Cathedral, and city skyline. 30-minute ride to soak in the sights and capture stunning photos.',
        tips: 'Book in advance for preferred time slots. Great for photos!',
        link: 'https://getyourguide.tp.st/KZ9yf1Ku',
        isBooking: true
      },
      {
        name: 'Sky Garden',
        description: 'Breathtaking views from a vibrant indoor garden atop 20 Fenchurch Street. Best of all, entry is completely free if you book in advance!',
        tips: 'Free entry but requires advance booking. A great free alternative to paid observation decks!',
        link: 'https://skygarden.london/',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'West End Show',
        description: 'Experience world-renowned theatre with stunning choreography and captivating storytelling. Use TodayTix for quick, seamless booking.',
        link: 'https://www.todaytix.com/',
        isBooking: true
      },
      {
        name: 'Tower of London Tour',
        description: 'Explore over 1,000 years of history. See Crown Jewels, White Tower, and meet the Beefeaters. Time your visit for Changing of the Guard ceremony.',
        link: 'https://getyourguide.tp.st/iTaFfRN5',
        isBooking: true
      },
      {
        name: 'Glastonbury Festival',
        description: 'Two hours from London, one of the world\'s top festivals with 5 days of music, theatre, comedy. Tickets sell out within 30 minutes! Expect 30,000+ daily steps.',
        link: 'https://www.glastonburyfestivals.co.uk/',
        isBooking: true
      }
    ],
    topTips: [
      'Book West End tickets through TodayTix for quick access',
      'Reserve Sky Garden visits in advance - free entry requires prior booking',
      'Secure Glastonbury tickets immediately upon release (sell out within 30 mins)',
      'Check Tower of London Changing of the Guard schedule - not held daily'
    ],
    foodRecs: [
      'Flat Iron - signature steak at £13 with complimentary soft-serve ice cream',
      'Kiln in Soho - bold Thai-inspired dishes from £6-£16',
      'Duck & Waffle - 40th-floor dining with panoramic views (mains £15-£30)'
    ],
    accommodationTips: 'London offers endless options across all budgets. City of 9.5 million is well-connected by tube, bus, and rail.',
    whatToPack: 'Smart-casual attire for West End, comfortable walking shoes, festival gear including rain boots for Glastonbury.'
  },
  {
    id: 'usa-vegas',
    name: 'USA',
    city: 'Las Vegas',
    flagEmoji: '🇺🇸',
    coverImage: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800',
    coordinates: { lat: 36.1699, lng: -115.1398 },
    visited: true,
    continent: 'North America',
    parentCountry: 'USA',
    places: [
      {
        name: 'Las Vegas Strip',
        description: 'An absolute must-visit! Filled with casinos, hotels, and events. Don\'t miss the free Fountains of Bellagio show every 15-30 minutes.',
        tips: 'Visit multiple hotels to experience their unique themes - each is like a mini universe!',
        isBooking: false
      },
      {
        name: 'Grand Canyon Day Trip',
        description: 'An extraordinary experience that will stay with you forever! Bus option takes 10-12 hours with breath-taking scenery. Helicopter tour available for a splurge.',
        tips: 'Tours around $90 include transport, guide, lunch, and Hoover Dam stop.',
        link: 'https://getyourguide.tp.st/vNsyqMa3',
        isBooking: true
      },
      {
        name: 'The High Roller Ferris Wheel',
        description: 'The best leisurely ride with phenomenal city views, especially just before sunset. I purchased a ticket with bar access for 30 minutes of happy hour - unforgettable!',
        tips: 'Visit just before sunset for best views. Tickets with bar access from $75.',
        link: 'https://www.ticketmaster.com/artist/2333410',
        isBooking: true
      },
      {
        name: 'Las Vegas North Premium Outlet',
        description: 'One of the top outlet malls with around 175 stores. Impressive discounts from 25-65%.',
        tips: 'Visit during public holidays for maximum discounts.',
        link: 'https://www.premiumoutlets.com/outlet/las-vegas-north',
        isBooking: false
      }
    ],
    experiences: [
      {
        name: 'Grand Canyon Tour',
        description: 'Extraordinary experience. Bus tours ($90, 10-12 hours) include transport, guide, lunch, and Hoover Dam stop. Helicopter tours available for a splurge.',
        link: 'https://getyourguide.tp.st/vNsyqMa3',
        isBooking: true
      },
      {
        name: 'The High Roller at Sunset',
        description: 'Leisurely Ferris wheel ride with phenomenal views. Visit before sunset. Bar access for 30 minutes of happy hour while taking in unbeatable views!',
        link: 'https://www.ticketmaster.com/artist/2333410',
        isBooking: true
      },
      {
        name: 'Fountains of Bellagio',
        description: 'A free, mesmerising water show every 15-30 minutes. One of the top attractions that absolutely should be on your list!',
        isBooking: false
      }
    ],
    topTips: [
      'Book Grand Canyon tours in advance - 10-12 hour bus trip is worth it',
      'Visit High Roller just before sunset for best views and happy hour',
      'Fountains of Bellagio run every 15-30 mins and are free',
      'Plan shopping at Premium Outlet during public holidays for best discounts'
    ],
    foodRecs: [
      'Eiffel Tower Restaurant - fine dining with Bellagio fountain views (mains $35-$40)',
      'Food courts at various casino hotels',
      'Las Vegas North Premium Outlet restaurants'
    ],
    accommodationTips: 'The strip is packed with iconic hotels like Caesars Palace and Bellagio. Staying on the strip puts you in the heart of the action.',
    whatToPack: 'Comfortable walking shoes, sunscreen for desert activities, expandable luggage for outlet shopping.'
  },
  {
    id: 'usa-nashville',
    name: 'USA',
    city: 'Nashville',
    flagEmoji: '🇺🇸',
    coverImage: 'https://images.unsplash.com/photo-1545419913-775e3e3d37c4?w=800',
    coordinates: { lat: 36.1627, lng: -86.7816 },
    visited: true,
    continent: 'North America',
    parentCountry: 'USA',
    places: [
      {
        name: 'Broadway Street (Music Row)',
        description: 'The number one recommendation! Incredible variety of music day and night. Even non-country fans are surprised by how much talent there is every night.',
        tips: 'Visit multiple venues in one night to experience different styles and emerging talent.',
        isBooking: false
      },
      {
        name: 'Tootsie\'s Orchid Lounge',
        description: 'Amazing experience with 3 stages, 3 floors, and 3 bars! Opportunities for emerging singers alongside country music legends.',
        tips: 'Great for experiencing the full range of country music.',
        link: 'https://www.tootsies.net/',
        isBooking: false
      },
      {
        name: 'Grand Ole Opry',
        description: 'An upgrade in country music! Witness icons, up-and-coming talents, and hottest tracks. 8 different artists for a two-hour extravaganza. Venue accommodates 4,372 attendees.',
        tips: 'Book early - highly sought after and sells out quickly. Prices vary by date and seating.',
        link: 'https://www.opry.com/',
        isBooking: true
      },
      {
        name: 'Wildhorse Saloon',
        description: 'The ultimate spot for live music and dancing! Restaurant food, vibrant bar, live performances, and line dancing lessons. As a beginner, I found it easy to grasp.',
        tips: 'Try the line dancing lessons - perfect for beginners and a fun skill to take home!',
        link: 'https://wildhorsesaloon.com/',
        isBooking: false
      }
    ],
    experiences: [
      {
        name: 'Live Country Music on Broadway',
        description: 'Incredible variety day and night. Venues like Tootsie\'s (3 stages, 3 floors, 3 bars) offer emerging singers alongside legends. Even non-country fans enjoy it!',
        link: 'https://www.tootsies.net/',
        isBooking: false
      },
      {
        name: 'Grand Ole Opry Show',
        description: 'Witness icons, up-and-coming talents, and chart-topping hits. 8 artists perform for two hours - like attending a music festival! Book early, sells out quickly.',
        link: 'https://www.opry.com/',
        isBooking: true
      },
      {
        name: 'Line Dancing at Wildhorse Saloon',
        description: 'Ultimate spot for live music and dancing. Try the line dancing lessons - perfect for beginners and incredibly easy to grasp!',
        link: 'https://wildhorsesaloon.com/',
        isBooking: false
      },
      {
        name: 'Redneck Comedy Bus Tour',
        description: 'Unique experience combining thrilling comedy with city tour. Guide and driver connect with each person and throw in playful jabs. 2 hours, $40 per person.',
        link: 'https://www.theredneckbus.com/',
        isBooking: true
      }
    ],
    topTips: [
      'Secure Grand Ole Opry tickets early - sells out quickly',
      'Try line dancing lessons at Wildhorse Saloon - easy for beginners',
      'Plan shopping at Opry Mills during public holidays for best discounts',
      'Bring your sense of humor for the Redneck Comedy Bus Tour!'
    ],
    foodRecs: [
      'Nashville\'s legendary barbecue and Southern cuisine',
      'Halftime food at NFL games for authentic American sports experience',
      'Restaurant food at Wildhorse Saloon during live performances'
    ],
    accommodationTips: 'Nashville is "Music City" and "Bachelorette Party Capital". Staying near Broadway puts you in the action.',
    whatToPack: 'Comfortable shoes for dancing, cowboy boots or hat (optional!), expandable luggage for Opry Mills shopping.'
  },
  {
    id: 'spain',
    name: 'Spain',
    city: 'Barcelona',
    flagEmoji: '🇪🇸',
    coverImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
    coordinates: { lat: 41.3851, lng: 2.1734 },
    visited: true,
    continent: 'Europe',
    places: [
      {
        name: 'Sagrada Família',
        description: 'You can\'t travel to Barcelona without seeing Antoni Gaudí\'s work! Like stepping into a dream world of creativity and colour. Breathtaking intricate facades and towering points.',
        tips: 'Book in advance or get skip-the-line tickets. Go early morning or late afternoon. Bring your own headphones for audio tour.',
        link: 'https://getyourguide.tp.st/VIlG31Se',
        isBooking: true
      },
      {
        name: 'Park Güell',
        description: 'Another Gaudí masterpiece with playful mosaics and winding pathways. Free grounds surround a ticketed monumental zone with his most famous works.',
        tips: 'Go early morning or late afternoon. Wear comfortable shoes for hilly terrain. Stunning views are worth the effort!',
        link: 'https://getyourguide.tp.st/UdsbIlxH',
        isBooking: true
      },
      {
        name: 'Barcelona Zoo',
        description: 'A fun and friendly day for animal lovers and families. Wide variety of animals with interactive experiences like feeding sessions and animal shows.',
        tips: 'Great for families. Interactive experiences bring you close to wildlife.',
        link: 'https://getyourguide.tp.st/OWotOXEr',
        isBooking: true
      },
      {
        name: 'Mediterranean Beaches',
        description: 'Perfect for relaxation, swimming, and catching waves when you need a break from sightseeing.',
        tips: 'Great for a relaxing afternoon between architectural adventures.',
        isBooking: false
      }
    ],
    experiences: [
      {
        name: 'Sagrada Família Self-Guided Tour',
        description: 'Explore at your own pace with ticket access and audio guide. Gaudí\'s masterpiece features intricate facades and towering points - a dream world of creativity and colour.',
        link: 'https://getyourguide.tp.st/VIlG31Se',
        isBooking: true
      },
      {
        name: 'Park Güell Visit',
        description: 'Experience Gaudí\'s playful mosaics and winding pathways. Monumental zone houses his most famous works. Hilly terrain offers stunning views worth the effort.',
        link: 'https://getyourguide.tp.st/UdsbIlxH',
        isBooking: true
      },
      {
        name: 'Tapas Tour',
        description: 'A must-do for food lovers! Visit local tapas bars for traditional dishes like patatas bravas and croquetas. Meet fellow travellers. Many tours include wine pairing.',
        link: 'https://getyourguide.tp.st/lxcnENbW',
        isBooking: true
      }
    ],
    topTips: [
      'Book Sagrada Família and Park Güell tickets in advance to avoid long queues',
      'Bring personal headphones for audio guides',
      'Visit popular attractions early morning or late afternoon',
      'Choose accommodation in central, well-connected, safe neighbourhoods'
    ],
    foodRecs: [
      'Tapas tour for traditional dishes like patatas bravas and croquetas',
      'Fresh seafood along Mediterranean waterfront',
      'Local tapas bars for wine pairings and hidden culinary gems'
    ],
    accommodationTips: 'Choose convenient, well-connected accommodation in a safe neighbourhood. Central Airbnb locations provide easy access to attractions.',
    whatToPack: 'Comfortable shoes for hilly Park Güell, personal headphones for audio guides, beach essentials for Mediterranean relaxation.'
  },
  {
    id: 'italy-rome',
    name: 'Italy',
    city: 'Rome',
    flagEmoji: '🇮🇹',
    coverImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    coordinates: { lat: 41.9028, lng: 12.4964 },
    visited: true,
    continent: 'Europe',
    parentCountry: 'Italy',
    places: [
      {
        name: 'Colosseum',
        description: 'A legendary landmark featured in countless films! The first time I set foot in this ancient wonder, I was truly speechless. The sheer magnitude and beauty left me amazed.',
        tips: 'Book tickets online in advance. Arrive early morning or late afternoon. Wear comfortable shoes for uneven surfaces. Stay hydrated - little shade inside.',
        link: 'https://getyourguide.tp.st/O8gYZXWV',
        isBooking: true
      },
      {
        name: 'Vatican City',
        description: 'A country within a country! The world\'s smallest independent state. Marvel at St. Peter\'s Basilica, climb the dome for views, and see Michelangelo\'s Sistine Chapel ceiling.',
        tips: 'Book tickets in advance to skip queues. A truly amazing artistic journey.',
        link: 'https://getyourguide.tp.st/oyXV93hx',
        isBooking: true
      },
      {
        name: 'Trevi Fountain',
        description: 'A breathtaking masterpiece every tourist dreams of seeing. Approximately €3,000 is thrown in daily by tourists making wishes, donated to charity.',
        tips: 'Visit early morning or late evening to avoid crowds. Don\'t forget to make a wish!',
        isBooking: false
      },
      {
        name: 'Pantheon',
        description: 'Just 10 minutes from Trevi Fountain! Its magnificent dome (43.4m diameter) is the largest unreinforced concrete dome in history - standing strong for over 1,800 years!',
        tips: 'Free entry. Combine with a visit to nearby Trevi Fountain.',
        isBooking: false
      }
    ],
    experiences: [
      {
        name: 'Colosseum Guided Tour',
        description: 'Book online for skip-the-line access. Guided tours offer fascinating insights into gladiator stories and epic battles. Combined tickets include Roman Forum and Palatine Hill.',
        link: 'https://getyourguide.tp.st/O8gYZXWV',
        isBooking: true
      },
      {
        name: 'Vatican Museums & Sistine Chapel',
        description: 'Experience world\'s most famous artworks including Michelangelo\'s Sistine Chapel ceiling. Climb St. Peter\'s Basilica dome for breathtaking Rome views.',
        link: 'https://getyourguide.tp.st/oyXV93hx',
        isBooking: true
      },
      {
        name: 'Guided Walking Tour',
        description: 'Stroll through Rome\'s main sights. A local expert brings ancient stories to life, shares insider tips, and points out hidden gems. Nighttime walks are breathtaking!',
        link: 'https://getyourguide.tp.st/vHfjo52x',
        isBooking: true
      },
      {
        name: 'Gelato Tasting',
        description: 'Rome\'s gelato is on another level! Giolitti is one of the oldest spots with rich, creamy delights (€3-5). Try their signature whipped cream topping!',
        link: 'https://www.giolitti.it/',
        isBooking: false
      }
    ],
    topTips: [
      'Book Colosseum and Vatican tickets online in advance',
      'Get combined tickets for Colosseum, Roman Forum, and Palatine Hill for best value',
      'Arrive early morning or late afternoon to avoid heaviest crowds',
      'Wear comfortable shoes for ancient cobblestones'
    ],
    foodRecs: [
      'Giolitti - classic creamy gelato with whipped cream topping (€3-5)',
      'Gelateria del Teatro - unique flavors like lavender honey and raspberry white chocolate',
      'Grab gelato and enjoy while wandering the charming streets'
    ],
    accommodationTips: 'Stay central to easily walk between Colosseum, Trevi Fountain, and Pantheon. Ancient sites are fairly close together.',
    whatToPack: 'Comfortable walking shoes for cobblestones, modest clothing covering shoulders and knees for Vatican, camera for architecture and gelato.'
  },
  {
    id: 'italy-venice',
    name: 'Italy',
    city: 'Venice',
    flagEmoji: '🇮🇹',
    coverImage: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800',
    coordinates: { lat: 45.4408, lng: 12.3155 },
    visited: true,
    continent: 'Europe',
    parentCountry: 'Italy',
    places: [
      {
        name: 'Grand Canal & Gondola Ride',
        description: 'Venice is a city like no other! A gondola ride is the most iconic and romantic way to explore. Traditional wooden boats steered by gondoliers in striped shirts glide through serene canals.',
        tips: 'Rides last 30-40 minutes. Great for seeing canals, charming bridges, and historic buildings up close.',
        link: 'https://getyourguide.tp.st/QjnNnex7',
        isBooking: true
      },
      {
        name: 'St Mark\'s Campanile',
        description: 'One of the best ways to take in panoramic views! The bell tower in Piazza San Marco stands nearly 100m tall. Quick elevator ride to the observation deck for breathtaking 360-degree views.',
        tips: 'Tickets €12-€15. Amazing 360-degree views of Venice, canals, and surrounding islands!',
        link: 'https://tiqets.tp.st/G6cAX8LS',
        isBooking: true
      },
      {
        name: 'Piazza San Marco',
        description: 'The iconic main square surrounded by stunning architecture including St Mark\'s Basilica and the Campanile. The heart of Venice.',
        tips: 'Visit early morning to avoid crowds. Watch out for pigeons!',
        isBooking: false
      }
    ],
    experiences: [
      {
        name: 'Gondola Ride',
        description: 'The most iconic and romantic way to explore Venice. Traditional wooden boats glide through serene canals for 30-40 minutes, offering unique perspectives of stunning architecture.',
        link: 'https://getyourguide.tp.st/QjnNnex7',
        isBooking: true
      },
      {
        name: 'Local Food Walking Tour',
        description: 'The best way to experience Venice - discovering charming streets while savouring incredible dishes with passionate local guides. Tours last about 3 hours.',
        link: 'https://tripadvisor.tp.st/zgtjznqc',
        isBooking: true
      },
      {
        name: 'St Mark\'s Campanile Views',
        description: 'Quick elevator ride to nearly 100m for stunning 360-degree panoramic views of Venice, canals, and surrounding islands. Tickets €12-15.',
        link: 'https://tiqets.tp.st/G6cAX8LS',
        isBooking: true
      }
    ],
    topTips: [
      'Stay in Mestre for more affordable accommodation with excellent transport connections',
      'Check out transport passes for multiple trips to Venice',
      'Book gondola rides and popular experiences in advance',
      'Leave reviews for local food tours - it helps support local businesses'
    ],
    foodRecs: [
      'Join a local food walking tour for authentic cuisine discoveries',
      'Fresh seafood from local restaurants',
      'Traditional Venetian cicchetti (small snacks) at local bacari (wine bars)'
    ],
    accommodationTips: 'Venice can be pricey for overnight stays. Mestre offers budget-friendly options with excellent transport connections.',
    whatToPack: 'Comfortable walking shoes for endless bridges and cobblestones, light layers, camera for stunning canal views.'
  },
  {
    id: 'japan',
    name: 'Japan',
    city: 'Tokyo',
    flagEmoji: '🇯🇵',
    coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    visited: false,
    continent: 'Asia',
    places: [
      {
        name: 'Shibuya Crossing',
        description: 'Experience the world\'s busiest pedestrian crossing where up to 3,000 people cross at once. Surrounded by giant video screens and neon lights, it\'s the ultimate Tokyo experience.',
        tips: 'Visit during rush hour (6-8pm) for the full effect. Go to Starbucks 2nd floor for the best overhead view.',
        isBooking: false
      },
      {
        name: 'Senso-ji Temple',
        description: 'Tokyo\'s oldest and most significant Buddhist temple in Asakusa. Walk through the iconic Thunder Gate and browse traditional shops along Nakamise Shopping Street.',
        tips: 'Visit early morning to avoid crowds. The temple is beautifully illuminated at night.',
        link: 'https://getyourguide.tp.st/tokyo-temples',
        isBooking: true
      },
      {
        name: 'Mount Fuji Day Trip',
        description: 'Japan\'s iconic snow-capped volcano and UNESCO World Heritage site. Crystal clear views of the 3,776m peak from Lake Kawaguchi or Hakone.',
        tips: 'Best views in winter months. Day tours from Tokyo take 12 hours.',
        link: 'https://getyourguide.tp.st/mount-fuji',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Robot Restaurant Show',
        description: 'An electrifying sensory overload of neon lights, giant robots, and energetic performances in Shinjuku. Unlike anything you\'ve experienced before!',
        link: 'https://getyourguide.tp.st/robot-restaurant',
        isBooking: true
      },
      {
        name: 'Tsukiji Outer Market Food Tour',
        description: 'Sample the freshest sushi, street food, and Japanese delicacies at Tokyo\'s famous fish market. A must for food lovers!',
        link: 'https://getyourguide.tp.st/tsukiji-food-tour',
        isBooking: true
      },
      {
        name: 'Traditional Tea Ceremony',
        description: 'Experience the art of Japanese tea ceremony in a traditional tea house. Learn about centuries-old customs and enjoy matcha with wagashi sweets.',
        isBooking: false
      }
    ],
    topTips: [
      'Get a JR Pass if traveling beyond Tokyo - saves significant money',
      'Learn basic Japanese phrases - English is less common than expected',
      'Convenience stores (konbini) have amazing food available 24/7',
      'Take off shoes when entering homes, ryokans, and some restaurants'
    ],
    foodRecs: [
      'Fresh sushi at Tsukiji Outer Market',
      'Authentic ramen at Ichiran (solo dining booths)',
      'Wagyu beef at a traditional yakiniku restaurant',
      'Matcha desserts and traditional wagashi sweets'
    ],
    accommodationTips: 'Capsule hotels offer unique budget stays. Ryokans (traditional inns) provide authentic Japanese experience. Shinjuku and Shibuya are central for first-time visitors.',
    whatToPack: 'Comfortable walking shoes, portable WiFi device, cash (many places don\'t accept cards), light jacket for temples.'
  },
  {
    id: 'thailand',
    name: 'Thailand',
    city: 'Bangkok',
    flagEmoji: '🇹🇭',
    coverImage: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800',
    coordinates: { lat: 13.7563, lng: 100.5018 },
    visited: false,
    continent: 'Asia',
    places: [
      {
        name: 'Grand Palace',
        description: 'Bangkok\'s most famous landmark and former royal residence. Stunning Thai architecture, intricate details, and the sacred Emerald Buddha Temple.',
        tips: 'Dress modestly - shoulders and knees must be covered. Arrive when it opens at 8:30am to beat crowds.',
        link: 'https://getyourguide.tp.st/grand-palace',
        isBooking: true
      },
      {
        name: 'Phi Phi Islands',
        description: 'Paradise islands with crystal-clear turquoise waters, white sand beaches, and dramatic limestone cliffs. Made famous by "The Beach" movie.',
        tips: 'Day trips from Phuket or Krabi. Maya Bay can get crowded - go early or late.',
        link: 'https://getyourguide.tp.st/phi-phi',
        isBooking: true
      },
      {
        name: 'Floating Markets',
        description: 'Traditional markets on canals where vendors sell fresh produce, street food, and souvenirs from wooden boats. A unique cultural experience.',
        tips: 'Damnoen Saduak is most famous but touristy. Amphawa is more authentic and has night markets.',
        isBooking: false
      }
    ],
    experiences: [
      {
        name: 'Thai Cooking Class',
        description: 'Learn to cook authentic Thai dishes like Pad Thai, Green Curry, and Tom Yum. Visit local markets for fresh ingredients, then cook and eat your creations!',
        link: 'https://getyourguide.tp.st/cooking-class-bangkok',
        isBooking: true
      },
      {
        name: 'Traditional Thai Massage',
        description: 'Experience authentic Thai massage at Wat Pho temple\'s traditional medicine school. 2,500 years of healing technique.',
        isBooking: false
      },
      {
        name: 'Muay Thai Boxing Match',
        description: 'Watch Thailand\'s national sport at Rajadamnern or Lumpinee Stadium. Electrifying atmosphere with traditional music and ceremonies.',
        link: 'https://getyourguide.tp.st/muay-thai',
        isBooking: true
      }
    ],
    topTips: [
      'Always negotiate tuk-tuk prices before getting in',
      'Street food is delicious and safe - follow where locals eat',
      'Remove shoes before entering temples and homes',
      'Never disrespect images of the King - it\'s illegal'
    ],
    foodRecs: [
      'Street food Pad Thai from night markets (30-40 THB)',
      'Tom Yum soup - spicy and sour with prawns',
      'Mango sticky rice for dessert',
      'Fresh coconut water straight from the coconut'
    ],
    accommodationTips: 'Bangkok has options for all budgets. Beach areas like Phuket and Krabi offer beachfront resorts. Islands like Koh Samui perfect for relaxation.',
    whatToPack: 'Light breathable clothes, modest temple attire, reef-safe sunscreen, insect repellent, waterproof phone case.'
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    city: 'Auckland',
    flagEmoji: '🇳🇿',
    coverImage: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800',
    coordinates: { lat: -41.2865, lng: 174.7762 },
    visited: false,
    continent: 'Oceania',
    places: [
      {
        name: 'Milford Sound',
        description: 'Rudyard Kipling called it the "Eighth Wonder of the World." Breathtaking fjord with towering waterfalls, rainforests, and dramatic peaks reaching 1,200m straight from the sea.',
        tips: 'Book cruises months in advance. Rains 200+ days/year but that makes waterfalls spectacular!',
        link: 'https://getyourguide.tp.st/milford-sound',
        isBooking: true
      },
      {
        name: 'Queenstown Adventure Sports',
        description: 'The adventure capital of the world! Birthplace of bungy jumping. Try bungy, skydiving, jet boating, paragliding, or canyon swinging.',
        tips: 'The Nevis Bungy (134m) is NZ\'s highest. Book combos for discounts.',
        link: 'https://getyourguide.tp.st/queenstown-adventure',
        isBooking: true
      },
      {
        name: 'Hobbiton Movie Set',
        description: 'Step into Middle-earth at the actual Lord of the Rings filming location. 44 hobbit holes, the Green Dragon Inn, and stunning Shire landscapes.',
        tips: 'Evening tours include a feast at the Green Dragon. Tours sell out weeks ahead.',
        link: 'https://getyourguide.tp.st/hobbiton',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Haka Cultural Performance',
        description: 'Experience traditional Māori culture through the powerful haka dance, songs, and hangi feast. Learn about New Zealand\'s indigenous heritage.',
        link: 'https://getyourguide.tp.st/maori-haka',
        isBooking: true
      },
      {
        name: 'Tongariro Alpine Crossing',
        description: 'New Zealand\'s best one-day hike through volcanic landscapes, emerald lakes, and alpine meadows. 19.4km trek takes 6-8 hours.',
        isBooking: false
      },
      {
        name: 'Glow Worm Caves',
        description: 'Float through underground caves lit by thousands of glowing worms. Magical experience in Waitomo.',
        link: 'https://getyourguide.tp.st/waitomo-caves',
        isBooking: true
      }
    ],
    topTips: [
      'Rent a car or campervan to explore - public transport is limited',
      'Book activities in advance, especially in Queenstown',
      'Weather changes rapidly - pack layers',
      'Distances are deceiving - allow more driving time than expected'
    ],
    foodRecs: [
      'Fergburger in Queenstown - legendary burgers (NZ$15-20)',
      'Fresh green-lipped mussels',
      'Pavlova dessert with kiwi fruit',
      'Flat white coffee - NZ perfected it'
    ],
    accommodationTips: 'Hostels and holiday parks widespread. Queenstown and Auckland pricier. Freedom camping allowed in designated areas with self-contained vehicles.',
    whatToPack: 'Hiking boots, waterproof jacket, layers for all seasons, sandfly repellent, sunscreen (strong UV).'
  },
  {
    id: 'australia',
    name: 'Australia',
    city: 'Sydney',
    flagEmoji: '🇦🇺',
    coverImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    coordinates: { lat: -33.8688, lng: 151.2093 },
    visited: false,
    continent: 'Oceania',
    places: [
      {
        name: 'Sydney Opera House',
        description: 'Iconic architectural masterpiece and UNESCO World Heritage site. Those white shell-shaped sails are even more impressive in person!',
        tips: 'Take a guided tour to go inside. Photograph from Mrs Macquarie\'s Chair for best angles.',
        link: 'https://getyourguide.tp.st/sydney-opera',
        isBooking: true
      },
      {
        name: 'Great Barrier Reef',
        description: 'The world\'s largest coral reef system - visible from space! 2,900km of vibrant coral, tropical fish, sea turtles, and reef sharks.',
        tips: 'Cairns and Port Douglas are main gateways. Best visibility Oct-Dec. Snorkeling and diving available.',
        link: 'https://getyourguide.tp.st/great-barrier-reef',
        isBooking: true
      },
      {
        name: 'Uluru (Ayers Rock)',
        description: 'Sacred Aboriginal site and Australia\'s spiritual heart. Massive 348m sandstone monolith that glows red at sunset in the Outback.',
        tips: 'Climbing is disrespectful and now banned. Watch sunrise and sunset - colors are incredible.',
        link: 'https://getyourguide.tp.st/uluru-tour',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Sydney Harbour Bridge Climb',
        description: 'Climb the iconic "Coathanger" for 360° views 134m above the harbor. 3.5-hour experience you\'ll never forget!',
        link: 'https://getyourguide.tp.st/bridge-climb',
        isBooking: true
      },
      {
        name: 'Great Ocean Road Drive',
        description: 'One of the world\'s most scenic coastal drives. See the Twelve Apostles limestone stacks, rainforests, and beaches along 243km.',
        isBooking: false
      },
      {
        name: 'Kangaroo Island Wildlife',
        description: 'Get up close with kangaroos, koalas, sea lions, and penguins in their natural habitat. Australia\'s "zoo without fences."',
        link: 'https://getyourguide.tp.st/kangaroo-island',
        isBooking: true
      }
    ],
    topTips: [
      'Australia is HUGE - don\'t underestimate distances between cities',
      'Slip, slop, slap - sunscreen is essential (strong UV)',
      'Check for deadly creatures before putting on shoes',
      'Tipping not expected - minimum wage is high'
    ],
    foodRecs: [
      'Fresh fish and chips at Bondi Beach',
      'Barramundi - iconic Australian fish',
      'Tim Tams - chocolate biscuit cookies',
      'Flat white or long black coffee - coffee culture is strong'
    ],
    accommodationTips: 'Sydney and Melbourne are expensive. Hostels common for backpackers. Airbnb good value. Consider house sitting for longer stays.',
    whatToPack: 'Strong sunscreen, hat, swimmers, hiking shoes, camera, reef-safe sunscreen for Great Barrier Reef.'
  },
  {
    id: 'iceland',
    name: 'Iceland',
    city: 'Reykjavik',
    flagEmoji: '🇮🇸',
    coverImage: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800',
    coordinates: { lat: 64.1466, lng: -21.9426 },
    visited: false,
    continent: 'Europe',
    places: [
      {
        name: 'Blue Lagoon',
        description: 'Geothermal spa with milky-blue waters rich in silica and minerals. Bathe in 37-39°C water surrounded by volcanic landscapes.',
        tips: 'Book weeks in advance - sells out daily. Splurge on premium package for private changing room.',
        link: 'https://getyourguide.tp.st/blue-lagoon',
        isBooking: true
      },
      {
        name: 'Golden Circle',
        description: 'Iceland\'s most popular route covering Þingvellir National Park, Geysir geothermal area, and Gullfoss waterfall. 300km of stunning sights.',
        tips: 'Self-drive or join a tour. Can be done in 6-7 hours but better with full day.',
        link: 'https://getyourguide.tp.st/golden-circle',
        isBooking: true
      },
      {
        name: 'Jökulsárlón Glacier Lagoon',
        description: 'Otherworldly lagoon filled with icebergs calving from Breiðamerkurjökull glacier. Seals swim among floating ice. Adjacent black sand Diamond Beach.',
        tips: 'Visit at sunrise or sunset for best light. Boat tours available May-Oct.',
        link: 'https://getyourguide.tp.st/glacier-lagoon',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Northern Lights Hunt',
        description: 'Chase the magical Aurora Borealis dancing across Arctic skies. Best from September to April during solar activity.',
        link: 'https://getyourguide.tp.st/northern-lights-iceland',
        isBooking: true
      },
      {
        name: 'Ice Cave Exploration',
        description: 'Venture inside natural blue ice caves formed in glaciers. Stunning translucent blue ice formations. Only accessible in winter.',
        link: 'https://getyourguide.tp.st/ice-cave',
        isBooking: true
      },
      {
        name: 'Whale Watching',
        description: 'Spot humpback whales, orcas, dolphins, and puffins in Icelandic waters. Húsavík is the whale watching capital.',
        link: 'https://getyourguide.tp.st/whale-watching-iceland',
        isBooking: true
      }
    ],
    topTips: [
      'Rent a 4WD for exploring - roads can be rough',
      'Pack layers - weather changes every 15 minutes',
      'Iceland is expensive - budget accordingly',
      'Download offline maps - phone coverage is spotty'
    ],
    foodRecs: [
      'Icelandic hot dogs (pylsur) - the national snack',
      'Fresh seafood - Arctic char and langoustine',
      'Skyr - thick yogurt-like dairy product',
      'Plokkfiskur - traditional fish stew'
    ],
    accommodationTips: 'Reykjavik has hotels and hostels. Guesthouses common in countryside. Book summer accommodation months ahead. Consider van camping.',
    whatToPack: 'Waterproof and windproof layers, thermal underwear, sturdy hiking boots, swimming suit for hot springs, camera.'
  },
  {
    id: 'peru',
    name: 'Peru',
    city: 'Lima',
    flagEmoji: '🇵🇪',
    coverImage: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800',
    coordinates: { lat: -13.1631, lng: -72.5450 },
    visited: false,
    continent: 'South America',
    places: [
      {
        name: 'Machu Picchu',
        description: 'The legendary "Lost City of the Incas" perched 2,430m in the Andes. One of the New Seven Wonders of the World. Clouds part to reveal the ancient citadel.',
        tips: 'Book permits months in advance - only 2,500 daily visitors allowed. Hike up or take train from Cusco.',
        link: 'https://getyourguide.tp.st/machu-picchu',
        isBooking: true
      },
      {
        name: 'Rainbow Mountain',
        description: 'Vinicunca\'s mineral-streaked slopes create natural rainbow colors. Strenuous 5,200m altitude hike but the views are surreal.',
        tips: 'Start at 4am to see sunrise and beat crowds. Take altitude sickness pills.',
        link: 'https://getyourguide.tp.st/rainbow-mountain',
        isBooking: true
      },
      {
        name: 'Amazon Rainforest',
        description: 'Explore the Peruvian Amazon from Puerto Maldonado or Iquitos. Spot monkeys, macaws, pink river dolphins, and caimans.',
        tips: 'Multi-day lodge stays offer best wildlife encounters. Bring serious bug spray!',
        link: 'https://getyourguide.tp.st/amazon-peru',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Inca Trail Trek',
        description: 'Four-day trek through cloud forests, Inca ruins, and mountain passes to reach Machu Picchu at sunrise. 43km of ancient pathways.',
        link: 'https://getyourguide.tp.st/inca-trail',
        isBooking: true
      },
      {
        name: 'Lima Food Tour',
        description: 'Peru\'s capital is South America\'s culinary capital. Sample ceviche, anticuchos, and pisco sours in world-class restaurants.',
        link: 'https://getyourguide.tp.st/lima-food-tour',
        isBooking: true
      },
      {
        name: 'Lake Titicaca Floating Islands',
        description: 'Visit the Uros people living on man-made floating reed islands on the world\'s highest navigable lake at 3,812m.',
        isBooking: false
      }
    ],
    topTips: [
      'Spend 2-3 days acclimatizing in Cusco before Machu Picchu',
      'Carry altitude sickness medication',
      'Book Inca Trail permits 6 months in advance',
      'Bring USD cash - widely accepted and better rates'
    ],
    foodRecs: [
      'Ceviche - fresh raw fish marinated in lime (national dish)',
      'Lomo saltado - Peruvian beef stir-fry',
      'Pisco sour - grape brandy cocktail',
      'Cuy (guinea pig) - traditional Andean dish'
    ],
    accommodationTips: 'Cusco has many hostels for trekkers. Sacred Valley offers scenic stays. Lima ranges from budget to luxury. Book Machu Picchu town (Aguas Calientes) early.',
    whatToPack: 'Hiking boots, altitude sickness pills, layers for temperature changes, rain jacket, insect repellent, water purification tablets.'
  },
  {
    id: 'morocco',
    name: 'Morocco',
    city: 'Marrakech',
    flagEmoji: '🇲🇦',
    coverImage: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    visited: false,
    continent: 'Africa',
    places: [
      {
        name: 'Jemaa el-Fnaa Square',
        description: 'Marrakech\'s main square transforms into an open-air theatre at sunset. Snake charmers, acrobats, storytellers, and sizzling food stalls create sensory overload.',
        tips: 'Visit both day and night for different experiences. Haggle prices for street food.',
        isBooking: false
      },
      {
        name: 'Sahara Desert',
        description: 'Sleep under a billion stars in the world\'s largest hot desert. Camel trek over golden dunes, watch surreal sunsets, and experience Berber hospitality.',
        tips: 'Merzouga is the gateway. Book overnight desert camps. Go in spring or autumn to avoid extreme heat.',
        link: 'https://getyourguide.tp.st/sahara-desert',
        isBooking: true
      },
      {
        name: 'Chefchaouen Blue City',
        description: 'The entire medina is painted in dreamy shades of blue. Wander narrow alleyways, stunning photo opportunities at every corner.',
        tips: 'Stay overnight - most day-trippers leave by 4pm. Best light for photos is morning.',
        isBooking: false
      }
    ],
    experiences: [
      {
        name: 'Traditional Hammam Spa',
        description: 'Experience centuries-old Moroccan bathing ritual. Steam room, black soap scrub, and eucalyptus wash leave you completely rejuvenated.',
        link: 'https://getyourguide.tp.st/hammam-marrakech',
        isBooking: true
      },
      {
        name: 'Moroccan Cooking Class',
        description: 'Learn to make authentic tagine, couscous, and mint tea. Shop at local souks for spices and ingredients.',
        link: 'https://getyourguide.tp.st/cooking-class-morocco',
        isBooking: true
      },
      {
        name: 'Atlas Mountains Trek',
        description: 'Day hike or multi-day trek through Berber villages, waterfalls, and valleys. Mount Toubkal (4,167m) is North Africa\'s highest peak.',
        link: 'https://getyourguide.tp.st/atlas-mountains',
        isBooking: true
      }
    ],
    topTips: [
      'Haggling is expected in souks - start at 40% of asking price',
      'Dress modestly, especially in smaller towns',
      'Learn basic French or Arabic phrases - English less common',
      'Only drink bottled water'
    ],
    foodRecs: [
      'Lamb or chicken tagine with preserved lemons',
      'Fresh mint tea - offered everywhere as hospitality',
      'Couscous - traditionally eaten on Fridays',
      'Pastilla - sweet and savory phyllo pastry'
    ],
    accommodationTips: 'Stay in a traditional riad (courtyard house) in medinas. Riads range from budget to luxury. Sahara camps offer unique overnight experience.',
    whatToPack: 'Modest clothing covering shoulders and knees, comfortable walking shoes, scarf/hat for desert, sunscreen, hand sanitizer.'
  },
  {
    id: 'greece',
    name: 'Greece',
    city: 'Athens',
    flagEmoji: '🇬🇷',
    coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
    coordinates: { lat: 37.9838, lng: 23.7275 },
    visited: false,
    continent: 'Europe',
    places: [
      {
        name: 'Acropolis & Parthenon',
        description: 'Ancient citadel overlooking Athens. The 2,500-year-old Parthenon temple dedicated to Athena is even more awe-inspiring in person.',
        tips: 'Buy combo ticket for 7 archaeological sites (€30). Arrive at 8am opening or late afternoon.',
        link: 'https://getyourguide.tp.st/acropolis-tour',
        isBooking: true
      },
      {
        name: 'Santorini',
        description: 'The postcard-perfect island with white-washed buildings, blue-domed churches, and stunning caldera views. Sunsets in Oia are legendary.',
        tips: 'Visit May-June or Sept-Oct for fewer crowds. Fira and Oia get packed in summer.',
        link: 'https://getyourguide.tp.st/santorini-tour',
        isBooking: true
      },
      {
        name: 'Meteora Monasteries',
        description: 'Medieval monasteries built atop towering rock pillars. Six monasteries still functioning, perched 400m above the plain. Surreal landscape.',
        tips: 'Visit at least 2 monasteries. Kalambaka town is the base. Dress modestly - no shorts or bare shoulders.',
        link: 'https://getyourguide.tp.st/meteora-tour',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Island Hopping',
        description: 'Ferry between Greek islands - Mykonos for nightlife, Naxos for beaches, Crete for history. Each island has unique character.',
        link: 'https://getyourguide.tp.st/greek-islands',
        isBooking: true
      },
      {
        name: 'Traditional Greek Taverna',
        description: 'Experience authentic Greek hospitality with mezze platters, fresh seafood, ouzo, and plate smashing. Often includes live music and dancing.',
        isBooking: false
      },
      {
        name: 'Delphi Archaeological Site',
        description: 'Ancient sanctuary of Apollo and home of the famous Oracle. Spectacular mountain setting with ruins of temples, treasury, and ancient theatre.',
        link: 'https://getyourguide.tp.st/delphi-tour',
        isBooking: true
      }
    ],
    topTips: [
      'Greece uses cash more than cards - carry euros',
      'Siesta time (2-5pm) - many shops close',
      'Tipping 10% is appreciated but not mandatory',
      'Book ferries in advance during summer'
    ],
    foodRecs: [
      'Fresh Greek salad with feta and olive oil',
      'Grilled octopus and calamari',
      'Moussaka - layered eggplant and meat casserole',
      'Baklava and Greek coffee for dessert'
    ],
    accommodationTips: 'Athens has all budget levels. Islands more expensive in peak season. Cave hotels in Santorini are iconic. Book summer accommodation months ahead.',
    whatToPack: 'Comfortable walking shoes for ancient sites, modest clothing for monasteries, swimwear, sunscreen, hat for hot sun.'
  },
  {
    id: 'argentina',
    name: 'Argentina',
    city: 'Buenos Aires',
    flagEmoji: '🇦🇷',
    coverImage: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800',
    coordinates: { lat: -34.6037, lng: -58.3816 },
    visited: false,
    continent: 'South America',
    places: [
      {
        name: 'Iguazu Falls',
        description: 'One of the world\'s most spectacular waterfalls. 275 individual cascades thunder over 3km. The "Devil\'s Throat" is absolutely mind-blowing.',
        tips: 'Visit both Argentine and Brazilian sides for different perspectives. Bring waterproof bag for walkways.',
        link: 'https://getyourguide.tp.st/iguazu-falls',
        isBooking: true
      },
      {
        name: 'Perito Moreno Glacier',
        description: 'Massive glacier with 60m ice walls in Patagonia. Hear thunderous cracks as huge chunks calve into Lake Argentino. One of few advancing glaciers.',
        tips: 'Visit from El Calafate. Ice-trekking tours walk ON the glacier with crampons.',
        link: 'https://getyourguide.tp.st/perito-moreno',
        isBooking: true
      },
      {
        name: 'Mendoza Wine Region',
        description: 'World-class Malbec region in the Andes foothills. Tour vineyards, taste exceptional wines, and enjoy gourmet food with mountain views.',
        tips: 'Bike between wineries in Maipú. Book vineyard tours and tastings in advance.',
        link: 'https://getyourguide.tp.st/mendoza-wine',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Buenos Aires Tango Show',
        description: 'Watch passionate tango dancers in the birthplace of tango. Dinner shows in San Telmo combine steak, wine, and mesmerizing performances.',
        link: 'https://getyourguide.tp.st/tango-show',
        isBooking: true
      },
      {
        name: 'Patagonia Trekking',
        description: 'El Chaltén offers world-class hiking to Fitz Roy and Laguna de los Tres. Torres del Paine across in Chile is Patagonia\'s crown jewel.',
        isBooking: false
      },
      {
        name: 'Argentine Asado BBQ',
        description: 'Experience traditional Argentine barbecue. Grass-fed beef, chorizo, morcilla (blood sausage), and chimichurri. Paired with Malbec wine.',
        isBooking: false
      }
    ],
    topTips: [
      'Use Western Union for best USD to peso exchange rates',
      'Dinner starts late - 9pm or 10pm is normal',
      'Book Patagonia accommodations months in advance',
      'Learn basic Spanish - English is uncommon outside Buenos Aires'
    ],
    foodRecs: [
      'Bife de chorizo (sirloin steak) with chimichurri',
      'Empanadas - savory pastries with various fillings',
      'Dulce de leche everything',
      'Malbec wine from Mendoza'
    ],
    accommodationTips: 'Buenos Aires has excellent hostels and Airbnbs. Patagonia is expensive - book early. El Calafate and El Chaltén are trekking bases.',
    whatToPack: 'Layers for Patagonia (all four seasons in one day), hiking boots, waterproof jacket, sunscreen, water bottle.'
  },
  {
    id: 'canada',
    name: 'Canada',
    city: 'Vancouver',
    flagEmoji: '🇨🇦',
    coverImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800',
    coordinates: { lat: 49.2827, lng: -123.1207 },
    visited: false,
    continent: 'North America',
    places: [
      {
        name: 'Banff National Park',
        description: 'Canada\'s most iconic national park in the Canadian Rockies. Turquoise lakes (Lake Louise, Moraine Lake), glaciers, and wildlife. Jaw-dropping scenery.',
        tips: 'Visit June-Sept for hiking. Lake Louise gets packed - arrive before 7am or after 5pm.',
        link: 'https://getyourguide.tp.st/banff-tour',
        isBooking: true
      },
      {
        name: 'Niagara Falls',
        description: 'Thundering waterfalls on the US-Canada border. 750,000 gallons per second plunge over the edge. Canadian side has the best views.',
        tips: 'Take the Hornblower boat tour right to the falls. Visit Table Rock for closest views.',
        link: 'https://getyourguide.tp.st/niagara-falls',
        isBooking: true
      },
      {
        name: 'Vancouver Island',
        description: 'Pacific Rim National Park, wild beaches, temperate rainforests, and Victoria\'s British charm. Whale watching, surfing, and hiking.',
        tips: 'Tofino is the surf capital. Ferry from Vancouver takes 1.5 hours.',
        isBooking: false
      }
    ],
    experiences: [
      {
        name: 'Northern Lights in Yukon',
        description: 'Whitehorse and Yellowknife offer prime Aurora viewing from September to April. Clear skies and minimal light pollution.',
        link: 'https://getyourguide.tp.st/yukon-aurora',
        isBooking: true
      },
      {
        name: 'Ice Skating on Lake Louise',
        description: 'Skate on the frozen turquoise lake surrounded by snow-capped mountains and the Fairmont Chateau. Winter wonderland perfection.',
        isBooking: false
      },
      {
        name: 'Poutine Trail Montreal',
        description: 'Sample Canada\'s national dish - fries, gravy, and cheese curds. Montreal has the best poutine. Also explore Old Montreal and French culture.',
        isBooking: false
      }
    ],
    topTips: [
      'Canada is massive - don\'t underestimate travel distances',
      'Book Banff accommodations far in advance (6+ months)',
      'Tipping 15-20% is expected at restaurants',
      'Bring layers - weather varies dramatically'
    ],
    foodRecs: [
      'Poutine - fries, gravy, and cheese curds',
      'Montreal smoked meat sandwiches',
      'Nanaimo bars - layered chocolate dessert',
      'Fresh salmon on the West Coast'
    ],
    accommodationTips: 'Banff and Vancouver are expensive. Consider Canmore near Banff. Hostels widely available. Camping in national parks is affordable.',
    whatToPack: 'Warm layers (even in summer evenings), waterproof jacket, hiking boots, bear spray for mountain hikes, camera.'
  },
  {
    id: 'egypt',
    name: 'Egypt',
    city: 'Cairo',
    flagEmoji: '🇪🇬',
    coverImage: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800',
    coordinates: { lat: 30.0444, lng: 31.2357 },
    visited: false,
    continent: 'Africa',
    places: [
      {
        name: 'Pyramids of Giza',
        description: 'The last remaining Wonder of the Ancient World. The Great Pyramid stood as the world\'s tallest structure for 3,800 years. The Sphinx guards nearby.',
        tips: 'Go early (7am) to avoid crowds and heat. Camel rides are negotiable. Watch sunset from viewpoint.',
        link: 'https://getyourguide.tp.st/pyramids-giza',
        isBooking: true
      },
      {
        name: 'Valley of the Kings',
        description: 'Ancient burial ground of pharaohs near Luxor. Tutankhamun\'s tomb and intricate hieroglyphics preserved for 3,000+ years in rock-cut tombs.',
        tips: 'Ticket includes 3 tombs. Photography banned inside. Visit early before tour groups.',
        link: 'https://getyourguide.tp.st/valley-of-kings',
        isBooking: true
      },
      {
        name: 'Red Sea Diving',
        description: 'Some of the world\'s best diving and snorkeling. Crystal-clear waters, vibrant coral reefs, and abundant marine life in Sharm el-Sheikh or Hurghada.',
        tips: 'Water temperature perfect year-round. Liveaboard diving trips offer best sites.',
        link: 'https://getyourguide.tp.st/red-sea-diving',
        isBooking: true
      }
    ],
    experiences: [
      {
        name: 'Nile River Cruise',
        description: 'Multi-day cruise between Luxor and Aswan. Visit temples of Karnak, Edfu, and Kom Ombo while sailing past villages and desert landscapes.',
        link: 'https://getyourguide.tp.st/nile-cruise',
        isBooking: true
      },
      {
        name: 'Egyptian Museum',
        description: 'Home to Tutankhamun\'s golden mask and 120,000+ ancient artifacts. Overwhelming collection of mummies, sarcophagi, and treasures.',
        link: 'https://getyourguide.tp.st/egyptian-museum',
        isBooking: true
      },
      {
        name: 'Bedouin Desert Experience',
        description: 'Camel trek into the Sahara, watch sunset over dunes, enjoy traditional Bedouin feast, and sleep under desert stars.',
        isBooking: false
      }
    ],
    topTips: [
      'Haggle for everything except in modern shops',
      'Dress conservatively - cover shoulders and knees',
      'Only drink bottled water - ice cubes can cause issues',
      'Carry small bills (Egyptian pounds) for tips'
    ],
    foodRecs: [
      'Koshari - Egypt\'s national dish (rice, lentils, pasta, tomato sauce)',
      'Ful medames - fava bean stew for breakfast',
      'Fresh mango juice',
      'Molokhia - green soup with garlic and coriander'
    ],
    accommodationTips: 'Cairo ranges from budget hostels to luxury hotels. Nile cruises include accommodation. Red Sea resorts in Sharm/Hurghada for beach stays.',
    whatToPack: 'Modest clothing, comfortable walking shoes, sunscreen, hat, scarf for dust, hand sanitizer, toilet paper.'
  }
];

export const getCountryById = (id: string) => countries.find(c => c.id === id);
