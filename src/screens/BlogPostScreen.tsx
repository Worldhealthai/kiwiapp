import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { getCountryById } from '../data/countries';

const { width } = Dimensions.get('window');

type RouteProps = RouteProp<RootStackParamList, 'BlogPost'>;

export default function BlogPostScreen() {
  const route = useRoute<RouteProps>();
  const country = getCountryById(route.params.countryId);
  const post = country?.blogPosts.find((p) => p.id === route.params.postId);

  if (!post || !country) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Post not found</Text>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this travel post: ${post.title} - Kiwi Travel Footsteps`,
        title: post.title,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cover Image */}
      <Image source={{ uri: post.coverImage }} style={styles.coverImage} />

      {/* Article Content */}
      <View style={styles.content}>
        {/* Tags */}
        <View style={styles.tags}>
          {post.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        {/* Title */}
        <Text style={styles.title}>{post.title}</Text>

        {/* Meta Info */}
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Text style={styles.countryEmoji}>{country.flagEmoji}</Text>
            <Text style={styles.countryName}>{country.name}</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={16} color="#a0aec0" />
            <Text style={styles.metaText}>{post.date}</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#a0aec0" />
            <Text style={styles.metaText}>{post.readTime} min read</Text>
          </View>
        </View>

        {/* Author */}
        <View style={styles.author}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' }}
            style={styles.authorAvatar}
          />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>Travel Explorer</Text>
            <Text style={styles.authorTitle}>Kiwi Travel Footsteps</Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Article Body */}
        <Text style={styles.excerpt}>{post.excerpt}</Text>

        <Text style={styles.body}>{post.content}</Text>

        <Text style={styles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </Text>

        <Text style={styles.body}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>

        {/* Engagement */}
        <View style={styles.engagement}>
          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="heart-outline" size={24} color="#f43f5e" />
            <Text style={styles.engagementText}>248</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#4fd1c5" />
            <Text style={styles.engagementText}>32</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="bookmark-outline" size={24} color="#f59e0b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={24} color="#a0aec0" />
          </TouchableOpacity>
        </View>

        {/* Related Posts Placeholder */}
        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>More from {country.name}</Text>
          <Text style={styles.relatedPlaceholder}>
            {country.blogPosts.length > 1
              ? `${country.blogPosts.length - 1} more posts to explore`
              : 'More posts coming soon!'}
          </Text>
        </View>
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
    height: 280,
  },
  content: {
    padding: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#1e3a5f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#4fd1c5',
    fontSize: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 36,
    marginBottom: 16,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#64748b',
    marginHorizontal: 12,
  },
  countryEmoji: {
    fontSize: 16,
  },
  countryName: {
    color: '#4fd1c5',
    fontSize: 14,
  },
  metaText: {
    color: '#a0aec0',
    fontSize: 13,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a5f',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  authorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  authorName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  authorTitle: {
    color: '#a0aec0',
    fontSize: 13,
    marginTop: 2,
  },
  followButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  excerpt: {
    fontSize: 18,
    color: '#cbd5e1',
    lineHeight: 28,
    fontStyle: 'italic',
    marginBottom: 20,
    paddingLeft: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#4fd1c5',
  },
  body: {
    fontSize: 16,
    color: '#cbd5e1',
    lineHeight: 28,
    marginBottom: 20,
  },
  engagement: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#2d4a6f',
    marginVertical: 20,
    gap: 24,
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  engagementText: {
    color: '#a0aec0',
    fontSize: 14,
  },
  relatedSection: {
    backgroundColor: '#1e3a5f',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  relatedPlaceholder: {
    color: '#a0aec0',
    fontSize: 14,
  },
});
