export interface Country {
  id: string;
  name: string;
  code: string;
  continent: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  visited: boolean;
  flagEmoji: string;
  coverImage: string;
  description: string;
  highlights: string[];
  travelTips: string[];
  bestTimeToVisit: string;
  currency: string;
  language: string;
  blogPosts: BlogPost[];
}

export interface BlogPost {
  id: string;
  countryId: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: number;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  countriesVisited: string[];
  countriesWantToVisit: string[];
  joinedDate: string;
  isOnline: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  countryId: string;
  message: string;
  timestamp: string;
  likes: number;
  replies: ChatMessage[];
}

export interface MatchProfile {
  id: string;
  user: User;
  targetCountry: string;
  travelDates?: {
    from: string;
    to: string;
  };
  travelStyle: string[];
  bio: string;
  photos: string[];
  matchedAt?: string;
}

export interface Match {
  id: string;
  users: [string, string];
  countryId: string;
  matchedAt: string;
  lastMessage?: string;
  lastMessageAt?: string;
}
