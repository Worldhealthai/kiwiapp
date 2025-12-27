# Kiwi Travel Footsteps

An innovative cross-platform travel app that revolutionizes the travel blog experience with interactive exploration, community chat, and travel buddy matching.

## Features

### Interactive 3D Globe
- Explore the world with a draggable, interactive globe
- Click on countries to see travel content
- Visual indicators for visited vs bucket list countries

### Country Content & Blog
- Detailed country information (highlights, tips, best time to visit)
- Travel blog posts with rich content
- Cover images and reading time estimates

### Country Chat Rooms
- Real-time chat within each country's community
- Share tips and ideas with fellow travelers
- Like and engage with other travelers' posts

### Travel Buddy Matching
- Tinder-style swipe matching system
- Match with travelers heading to the same destination
- Opt-in system with travel date preferences
- Private chat with your matches

### User Profiles
- Track countries visited and bucket list
- Display travel style preferences
- View match statistics and posts

## Tech Stack

- **React Native** with **Expo** - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **React Navigation** - Native navigation
- **Zustand** - State management (ready for integration)
- **React Native Gesture Handler** - Smooth swipe interactions
- **React Native Reanimated** - Fluid animations

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Studio (for emulator)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## Project Structure

```
src/
├── contexts/        # React contexts (Auth)
├── data/            # Mock data (countries, users)
├── navigation/      # Navigation configuration
├── screens/         # App screens
│   ├── AuthScreen.tsx
│   ├── GlobeScreen.tsx
│   ├── CountryDetailScreen.tsx
│   ├── CountryChatScreen.tsx
│   ├── MatchingScreen.tsx
│   ├── MatchesListScreen.tsx
│   ├── MatchChatScreen.tsx
│   ├── ProfileScreen.tsx
│   └── BlogPostScreen.tsx
└── types/           # TypeScript type definitions
```

## Screens Overview

| Screen | Description |
|--------|-------------|
| Globe | Main interactive globe with country markers |
| Country Detail | Full country info, highlights, tips, and blog posts |
| Country Chat | Community chat room for each country |
| Matching | Swipe to match with travelers (opt-in required) |
| Matches List | View all your travel buddy matches |
| Match Chat | Private 1-on-1 chat with matches |
| Profile | User profile with visited countries and settings |
| Blog Post | Full blog post reading experience |

## Customization

### Adding Countries

Edit `src/data/countries.ts` to add more countries:

```typescript
{
  id: 'unique-id',
  name: 'Country Name',
  code: 'XX',
  continent: 'Continent',
  coordinates: { lat: 0, lng: 0 },
  visited: true/false,
  flagEmoji: '🏳️',
  coverImage: 'https://...',
  description: 'Description...',
  highlights: [...],
  travelTips: [...],
  bestTimeToVisit: '...',
  currency: '...',
  language: '...',
  blogPosts: [...]
}
```

### Backend Integration

The app is ready for backend integration:

1. Replace mock auth in `AuthContext.tsx` with real API calls
2. Connect chat screens to a real-time service (Firebase, Socket.io)
3. Implement matching system with a backend database
4. Add push notifications for matches and messages

## Future Enhancements

- [ ] Real 3D globe with Three.js
- [ ] Push notifications
- [ ] Image sharing in chats
- [ ] Trip planning features
- [ ] Travel timeline/map
- [ ] Social media integration
- [ ] Offline support

## License

MIT License - Feel free to use for your own travel projects!

---

Built with love by Kiwi Travel Footsteps
