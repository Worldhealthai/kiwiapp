import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { getCountryById } from '../data/countries';
import { MatchProfile } from '../types';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

type RouteProps = RouteProp<RootStackParamList, 'Matching'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock profiles for matching
const mockProfiles: MatchProfile[] = [
  {
    id: 'profile-1',
    user: {
      id: 'user-10',
      name: 'Sophie Chen',
      username: 'sophietravels',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Digital nomad exploring one country at a time',
      countriesVisited: ['JP', 'TH', 'VN', 'ID'],
      countriesWantToVisit: ['NZ', 'AU', 'FJ'],
      joinedDate: '2023-06-15',
      isOnline: true,
    },
    targetCountry: 'nz',
    travelDates: { from: '2024-03-01', to: '2024-03-21' },
    travelStyle: ['Adventure', 'Nature', 'Photography'],
    bio: 'Looking for hiking buddies for the South Island! Planning to do the Routeburn Track.',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    ],
  },
  {
    id: 'profile-2',
    user: {
      id: 'user-11',
      name: 'Marcus Johnson',
      username: 'marcuswanders',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      bio: 'Adventure seeker and food lover',
      countriesVisited: ['MX', 'CO', 'PE', 'AR'],
      countriesWantToVisit: ['NZ', 'IS', 'NO'],
      joinedDate: '2023-09-01',
      isOnline: false,
    },
    targetCountry: 'nz',
    travelDates: { from: '2024-02-15', to: '2024-03-05' },
    travelStyle: ['Extreme Sports', 'Foodie', 'Road Trip'],
    bio: 'Bungee jumping and skydiving enthusiast! Looking for adrenaline junkies to explore Queenstown.',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    ],
  },
  {
    id: 'profile-3',
    user: {
      id: 'user-12',
      name: 'Emma Wilson',
      username: 'emmawilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: 'Slow traveler and culture enthusiast',
      countriesVisited: ['FR', 'IT', 'ES', 'GR'],
      countriesWantToVisit: ['NZ', 'JP', 'KR'],
      joinedDate: '2023-04-20',
      isOnline: true,
    },
    targetCountry: 'nz',
    travelDates: { from: '2024-04-01', to: '2024-04-30' },
    travelStyle: ['Culture', 'Wine', 'Relaxation'],
    bio: 'Interested in Maori culture and wine regions. Would love to explore the North Island together!',
    photos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    ],
  },
  {
    id: 'profile-4',
    user: {
      id: 'user-13',
      name: 'Alex Rivera',
      username: 'alexexplores',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Photographer capturing the world',
      countriesVisited: ['IS', 'NO', 'SE', 'FI'],
      countriesWantToVisit: ['NZ', 'CH', 'AT'],
      joinedDate: '2023-07-10',
      isOnline: true,
    },
    targetCountry: 'nz',
    travelDates: { from: '2024-03-10', to: '2024-03-25' },
    travelStyle: ['Photography', 'Nature', 'Camping'],
    bio: 'Looking to capture the stunning landscapes of NZ. Early morning shoots and stargazing anyone?',
    photos: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    ],
  },
];

export default function MatchingScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOptedIn, setIsOptedIn] = useState(false);
  const country = getCountryById(route.params.countryId);

  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, width / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const nextCardScale = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0.9, 1],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -width - 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => handleSwipeComplete('left'));
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: width + 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => handleSwipeComplete('right'));
  };

  const handleSwipeComplete = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Handle match logic here
      console.log('Liked:', profiles[currentIndex].user.name);
    }
    setCurrentIndex((prev) => prev + 1);
    position.setValue({ x: 0, y: 0 });
  };

  const handleOptIn = () => {
    setIsOptedIn(true);
  };

  if (!isOptedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.optInCard}>
          <Text style={styles.optInEmoji}>{country?.flagEmoji}</Text>
          <Text style={styles.optInTitle}>Find Travel Buddies</Text>
          <Text style={styles.optInSubtitle}>for {route.params.countryName}</Text>

          <Text style={styles.optInDescription}>
            Join the matching system to connect with other travelers planning to visit {route.params.countryName}. Swipe right to match, left to pass!
          </Text>

          <View style={styles.optInFeatures}>
            <View style={styles.featureItem}>
              <Ionicons name="people" size={24} color="#4fd1c5" />
              <Text style={styles.featureText}>Meet like-minded travelers</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="calendar" size={24} color="#4fd1c5" />
              <Text style={styles.featureText}>Sync travel dates</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="chatbubbles" size={24} color="#4fd1c5" />
              <Text style={styles.featureText}>Chat with your matches</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.optInButton} onPress={handleOptIn}>
            <Ionicons name="heart" size={24} color="#fff" />
            <Text style={styles.optInButtonText}>Join Matching System</Text>
          </TouchableOpacity>

          <Text style={styles.optInNote}>
            Your profile will be visible to other travelers interested in {route.params.countryName}
          </Text>
        </View>
      </View>
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <View style={styles.container}>
        <View style={styles.noMoreCard}>
          <Ionicons name="globe-outline" size={80} color="#4fd1c5" />
          <Text style={styles.noMoreTitle}>No More Travelers</Text>
          <Text style={styles.noMoreText}>
            You've seen all travelers interested in {route.params.countryName}. Check back later for new matches!
          </Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => setCurrentIndex(0)}
          >
            <Text style={styles.resetButtonText}>Start Over</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <View style={styles.container}>
      {/* Country Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>{country?.flagEmoji}</Text>
        <Text style={styles.headerTitle}>Travelers to {route.params.countryName}</Text>
      </View>

      {/* Cards Stack */}
      <View style={styles.cardsContainer}>
        {/* Next Card (behind) */}
        {currentIndex + 1 < profiles.length && (
          <Animated.View
            style={[
              styles.card,
              styles.nextCard,
              { transform: [{ scale: nextCardScale }] },
            ]}
          >
            <Image
              source={{ uri: profiles[currentIndex + 1].user.avatar }}
              style={styles.cardImage}
            />
          </Animated.View>
        )}

        {/* Current Card */}
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                { rotate },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Image source={{ uri: currentProfile.user.avatar }} style={styles.cardImage} />

          {/* Like/Nope Stamps */}
          <Animated.View style={[styles.stamp, styles.likeStamp, { opacity: likeOpacity }]}>
            <Text style={styles.stampText}>MATCH</Text>
          </Animated.View>
          <Animated.View style={[styles.stamp, styles.nopeStamp, { opacity: nopeOpacity }]}>
            <Text style={styles.stampText}>PASS</Text>
          </Animated.View>

          {/* Card Info */}
          <View style={styles.cardInfo}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardName}>{currentProfile.user.name}</Text>
              {currentProfile.user.isOnline && (
                <View style={styles.onlineBadge}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.onlineText}>Online</Text>
                </View>
              )}
            </View>

            <Text style={styles.cardBio}>{currentProfile.bio}</Text>

            {currentProfile.travelDates && (
              <View style={styles.travelDates}>
                <Ionicons name="calendar-outline" size={16} color="#4fd1c5" />
                <Text style={styles.travelDatesText}>
                  {currentProfile.travelDates.from} - {currentProfile.travelDates.to}
                </Text>
              </View>
            )}

            <View style={styles.travelStyles}>
              {currentProfile.travelStyle.map((style, index) => (
                <View key={index} style={styles.styleTag}>
                  <Text style={styles.styleTagText}>{style}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.visitedCount}>
              {currentProfile.user.countriesVisited.length} countries visited
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionBtn, styles.nopeBtn]} onPress={swipeLeft}>
          <Ionicons name="close" size={36} color="#f43f5e" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, styles.likeBtn]} onPress={swipeRight}>
          <Ionicons name="heart" size={32} color="#4fd1c5" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  headerEmoji: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: width - 40,
    height: height * 0.6,
    borderRadius: 20,
    backgroundColor: '#1e3a5f',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  nextCard: {
    top: 10,
  },
  cardImage: {
    width: '100%',
    height: '55%',
  },
  stamp: {
    position: 'absolute',
    top: 50,
    padding: 12,
    borderWidth: 4,
    borderRadius: 8,
  },
  likeStamp: {
    right: 20,
    borderColor: '#4fd1c5',
    transform: [{ rotate: '15deg' }],
  },
  nopeStamp: {
    left: 20,
    borderColor: '#f43f5e',
    transform: [{ rotate: '-15deg' }],
  },
  stampText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4fd1c5',
  },
  cardInfo: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79,209,197,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4fd1c5',
  },
  onlineText: {
    color: '#4fd1c5',
    fontSize: 12,
  },
  cardBio: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
    marginBottom: 12,
  },
  travelDates: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  travelDatesText: {
    color: '#a0aec0',
    fontSize: 13,
  },
  travelStyles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  styleTag: {
    backgroundColor: '#2d4a6f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  styleTagText: {
    color: '#4fd1c5',
    fontSize: 12,
    fontWeight: '500',
  },
  visitedCount: {
    color: '#64748b',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    paddingVertical: 30,
  },
  actionBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nopeBtn: {
    backgroundColor: '#1e3a5f',
    borderWidth: 2,
    borderColor: '#f43f5e',
  },
  likeBtn: {
    backgroundColor: '#1e3a5f',
    borderWidth: 2,
    borderColor: '#4fd1c5',
  },
  optInCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  optInEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  optInTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  optInSubtitle: {
    fontSize: 18,
    color: '#4fd1c5',
    marginTop: 4,
    marginBottom: 24,
  },
  optInDescription: {
    fontSize: 15,
    color: '#a0aec0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  optInFeatures: {
    alignSelf: 'stretch',
    gap: 16,
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#1e3a5f',
    padding: 16,
    borderRadius: 12,
  },
  featureText: {
    color: '#fff',
    fontSize: 14,
  },
  optInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ec4899',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    marginBottom: 20,
  },
  optInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  optInNote: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  noMoreCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noMoreTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 12,
  },
  noMoreText: {
    fontSize: 15,
    color: '#a0aec0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  resetButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
