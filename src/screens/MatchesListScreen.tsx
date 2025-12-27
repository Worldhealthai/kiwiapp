import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Match, User } from '../types';
import { getCountryById } from '../data/countries';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock matches data
const mockMatches: (Match & { matchedUser: User })[] = [
  {
    id: 'match-1',
    users: ['user-1', 'user-10'],
    countryId: 'nz',
    matchedAt: '2024-01-14T15:30:00Z',
    lastMessage: 'So excited to explore the South Island together!',
    lastMessageAt: '2024-01-15T10:00:00Z',
    matchedUser: {
      id: 'user-10',
      name: 'Sophie Chen',
      username: 'sophietravels',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      bio: 'Digital nomad exploring one country at a time',
      countriesVisited: ['JP', 'TH', 'VN', 'ID'],
      countriesWantToVisit: ['NZ', 'AU', 'FJ'],
      joinedDate: '2023-06-15',
      isOnline: true,
    },
  },
  {
    id: 'match-2',
    users: ['user-1', 'user-13'],
    countryId: 'jp',
    matchedAt: '2024-01-10T12:00:00Z',
    lastMessage: "Can't wait for cherry blossom season!",
    lastMessageAt: '2024-01-14T18:30:00Z',
    matchedUser: {
      id: 'user-13',
      name: 'Alex Rivera',
      username: 'alexexplores',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      bio: 'Photographer capturing the world',
      countriesVisited: ['IS', 'NO', 'SE', 'FI'],
      countriesWantToVisit: ['NZ', 'CH', 'AT'],
      joinedDate: '2023-07-10',
      isOnline: false,
    },
  },
  {
    id: 'match-3',
    users: ['user-1', 'user-12'],
    countryId: 'th',
    matchedAt: '2024-01-08T09:00:00Z',
    matchedUser: {
      id: 'user-12',
      name: 'Emma Wilson',
      username: 'emmawilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      bio: 'Slow traveler and culture enthusiast',
      countriesVisited: ['FR', 'IT', 'ES', 'GR'],
      countriesWantToVisit: ['NZ', 'JP', 'KR'],
      joinedDate: '2023-04-20',
      isOnline: true,
    },
  },
];

export default function MatchesListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [matches] = useState(mockMatches);

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins}m`;
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)}h`;
    } else {
      return `${Math.floor(diffHours / 24)}d`;
    }
  };

  const renderMatch = ({ item }: { item: typeof mockMatches[0] }) => {
    const country = getCountryById(item.countryId);

    return (
      <TouchableOpacity
        style={styles.matchCard}
        onPress={() =>
          navigation.navigate('MatchChat', {
            matchId: item.id,
            userName: item.matchedUser.name,
          })
        }
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.matchedUser.avatar }} style={styles.avatar} />
          {item.matchedUser.isOnline && <View style={styles.onlineDot} />}
        </View>

        <View style={styles.matchInfo}>
          <View style={styles.matchHeader}>
            <Text style={styles.matchName}>{item.matchedUser.name}</Text>
            {item.lastMessageAt && (
              <Text style={styles.matchTime}>{formatTime(item.lastMessageAt)}</Text>
            )}
          </View>

          <View style={styles.countryTag}>
            <Text style={styles.countryEmoji}>{country?.flagEmoji}</Text>
            <Text style={styles.countryName}>{country?.name}</Text>
          </View>

          {item.lastMessage ? (
            <Text style={styles.lastMessage} numberOfLines={1}>
              {item.lastMessage}
            </Text>
          ) : (
            <Text style={styles.newMatch}>New match! Say hello...</Text>
          )}
        </View>

        <Ionicons name="chevron-forward" size={20} color="#64748b" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Matches</Text>
        <Text style={styles.subtitle}>{matches.length} travel buddies</Text>
      </View>

      {matches.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={80} color="#4fd1c5" />
          <Text style={styles.emptyTitle}>No Matches Yet</Text>
          <Text style={styles.emptyText}>
            Explore countries on the globe and join the matching system to find travel buddies!
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('MainTabs')}
          >
            <Text style={styles.exploreButtonText}>Explore Globe</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#a0aec0',
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a5f',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4fd1c5',
    borderWidth: 2,
    borderColor: '#1e3a5f',
  },
  matchInfo: {
    flex: 1,
    marginLeft: 14,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  matchTime: {
    fontSize: 12,
    color: '#64748b',
  },
  countryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  countryEmoji: {
    fontSize: 14,
  },
  countryName: {
    fontSize: 12,
    color: '#4fd1c5',
  },
  lastMessage: {
    fontSize: 13,
    color: '#a0aec0',
    marginTop: 6,
  },
  newMatch: {
    fontSize: 13,
    color: '#ec4899',
    fontStyle: 'italic',
    marginTop: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#a0aec0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
