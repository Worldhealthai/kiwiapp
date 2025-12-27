import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { getCountryById } from '../data/countries';

const { width } = Dimensions.get('window');

type RouteProps = RouteProp<RootStackParamList, 'CountryDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CountryDetailScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const country = getCountryById(route.params.countryId);

  if (!country) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Country not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Cover Image */}
      <Image source={{ uri: country.coverImage }} style={styles.coverImage} />

      {/* Country Header */}
      <View style={styles.header}>
        <Text style={styles.emoji}>{country.flagEmoji}</Text>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{country.name}</Text>
          <Text style={styles.continent}>{country.continent}</Text>
        </View>
        {country.visited && (
          <View style={styles.visitedBadge}>
            <Ionicons name="checkmark-circle" size={20} color="#4fd1c5" />
          </View>
        )}
      </View>

      {/* Quick Info */}
      <View style={styles.quickInfo}>
        <View style={styles.infoItem}>
          <Ionicons name="calendar-outline" size={20} color="#4fd1c5" />
          <Text style={styles.infoLabel}>Best Time</Text>
          <Text style={styles.infoValue}>{country.bestTimeToVisit}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="cash-outline" size={20} color="#4fd1c5" />
          <Text style={styles.infoLabel}>Currency</Text>
          <Text style={styles.infoValue}>{country.currency}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="language-outline" size={20} color="#4fd1c5" />
          <Text style={styles.infoLabel}>Language</Text>
          <Text style={styles.infoValue}>{country.language}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{country.description}</Text>
      </View>

      {/* Highlights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Highlights</Text>
        {country.highlights.map((highlight, index) => (
          <View key={index} style={styles.highlightItem}>
            <Ionicons name="star" size={16} color="#f59e0b" />
            <Text style={styles.highlightText}>{highlight}</Text>
          </View>
        ))}
      </View>

      {/* Travel Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Travel Tips</Text>
        {country.travelTips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Ionicons name="bulb" size={16} color="#4fd1c5" />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      {/* Blog Posts */}
      {country.blogPosts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Blog Posts</Text>
          {country.blogPosts.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.blogCard}
              onPress={() =>
                navigation.navigate('BlogPost', {
                  postId: post.id,
                  countryId: country.id,
                })
              }
            >
              <Image source={{ uri: post.coverImage }} style={styles.blogImage} />
              <View style={styles.blogInfo}>
                <Text style={styles.blogTitle}>{post.title}</Text>
                <Text style={styles.blogExcerpt} numberOfLines={2}>
                  {post.excerpt}
                </Text>
                <View style={styles.blogMeta}>
                  <Text style={styles.blogDate}>{post.date}</Text>
                  <Text style={styles.blogReadTime}>{post.readTime} min read</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate('CountryChat', {
              countryId: country.id,
              countryName: country.name,
            })
          }
        >
          <Ionicons name="chatbubbles" size={24} color="#fff" />
          <Text style={styles.actionText}>Join Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.matchButton]}
          onPress={() =>
            navigation.navigate('Matching', {
              countryId: country.id,
              countryName: country.name,
            })
          }
        >
          <Ionicons name="heart" size={24} color="#fff" />
          <Text style={styles.actionText}>Find Travel Buddies</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  coverImage: {
    width: width,
    height: 250,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1a365d',
    marginTop: -30,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  emoji: {
    fontSize: 48,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  continent: {
    fontSize: 14,
    color: '#a0aec0',
    marginTop: 4,
  },
  visitedBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(79,209,197,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickInfo: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#1e3a5f',
    borderRadius: 16,
    padding: 16,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 10,
    color: '#a0aec0',
    marginTop: 8,
  },
  infoValue: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 24,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  highlightText: {
    flex: 1,
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  blogCard: {
    backgroundColor: '#1e3a5f',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  blogImage: {
    width: '100%',
    height: 150,
  },
  blogInfo: {
    padding: 16,
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  blogExcerpt: {
    fontSize: 13,
    color: '#a0aec0',
    lineHeight: 20,
  },
  blogMeta: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  blogDate: {
    fontSize: 12,
    color: '#64748b',
  },
  blogReadTime: {
    fontSize: 12,
    color: '#64748b',
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#7c3aed',
    paddingVertical: 16,
    borderRadius: 12,
  },
  matchButton: {
    backgroundColor: '#ec4899',
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
