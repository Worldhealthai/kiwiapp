import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../contexts/AuthContext';
import { ChatMessage } from '../types';
import { getCountryById } from '../data/countries';

type RouteProps = RouteProp<RootStackParamList, 'CountryChat'>;

// Mock chat messages
const mockMessages: ChatMessage[] = [
  {
    id: '1',
    userId: 'user-2',
    userName: 'Sarah Adventures',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    countryId: 'nz',
    message: 'Just got back from Queenstown! The bungee jumping was incredible!',
    timestamp: '2024-01-15T10:30:00Z',
    likes: 12,
    replies: [],
  },
  {
    id: '2',
    userId: 'user-3',
    userName: 'Mike Wanderer',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    countryId: 'nz',
    message: 'Anyone have recommendations for the Milford Track? Planning to do it next month!',
    timestamp: '2024-01-15T11:15:00Z',
    likes: 8,
    replies: [],
  },
  {
    id: '3',
    userId: 'user-4',
    userName: 'Emma Explorer',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    countryId: 'nz',
    message: '@Mike Book your huts early! They fill up months in advance. The track is absolutely worth it though!',
    timestamp: '2024-01-15T11:45:00Z',
    likes: 15,
    replies: [],
  },
  {
    id: '4',
    userId: 'user-5',
    userName: 'Tom Traveler',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    countryId: 'nz',
    message: 'The glowworm caves in Waitomo were magical! Highly recommend the black water rafting experience.',
    timestamp: '2024-01-15T14:20:00Z',
    likes: 20,
    replies: [],
  },
  {
    id: '5',
    userId: 'user-6',
    userName: 'Lisa Journey',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    countryId: 'nz',
    message: 'Pro tip: rent a campervan and do the South Island! Freedom camping spots are incredible and free!',
    timestamp: '2024-01-15T16:00:00Z',
    likes: 25,
    replies: [],
  },
];

export default function CountryChatScreen() {
  const route = useRoute<RouteProps>();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [onlineCount] = useState(Math.floor(Math.random() * 50) + 10);
  const flatListRef = useRef<FlatList>(null);
  const country = getCountryById(route.params.countryId);

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      countryId: route.params.countryId,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setMessages([...messages, message]);
    setNewMessage('');

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const likeMessage = (messageId: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isOwnMessage = item.userId === user?.id;

    return (
      <View style={[styles.messageContainer, isOwnMessage && styles.ownMessage]}>
        {!isOwnMessage && (
          <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
        )}
        <View
          style={[
            styles.messageBubble,
            isOwnMessage && styles.ownMessageBubble,
          ]}
        >
          {!isOwnMessage && (
            <Text style={styles.userName}>{item.userName}</Text>
          )}
          <Text style={[styles.messageText, isOwnMessage && styles.ownMessageText]}>
            {item.message}
          </Text>
          <View style={styles.messageFooter}>
            <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
            {!isOwnMessage && (
              <TouchableOpacity
                style={styles.likeButton}
                onPress={() => likeMessage(item.id)}
              >
                <Ionicons name="heart-outline" size={14} color="#a0aec0" />
                <Text style={styles.likeCount}>{item.likes}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Chat Header Info */}
      <View style={styles.chatInfo}>
        <Text style={styles.chatEmoji}>{country?.flagEmoji}</Text>
        <View style={styles.chatDetails}>
          <Text style={styles.chatTitle}>{route.params.countryName} Community</Text>
          <View style={styles.onlineInfo}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>{onlineCount} travelers online</Text>
          </View>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="image-outline" size={24} color="#a0aec0" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Share your travel tips..."
          placeholderTextColor="#64748b"
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!newMessage.trim()}
        >
          <Ionicons
            name="send"
            size={20}
            color={newMessage.trim() ? '#fff' : '#64748b'}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a365d',
    borderBottomWidth: 1,
    borderBottomColor: '#2d4a6f',
  },
  chatEmoji: {
    fontSize: 36,
  },
  chatDetails: {
    marginLeft: 12,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  onlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4fd1c5',
    marginRight: 6,
  },
  onlineText: {
    fontSize: 12,
    color: '#a0aec0',
  },
  messagesList: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  ownMessage: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    backgroundColor: '#1e3a5f',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
  },
  ownMessageBubble: {
    backgroundColor: '#2563eb',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
  },
  userName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4fd1c5',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  ownMessageText: {
    color: '#fff',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  timestamp: {
    fontSize: 10,
    color: '#64748b',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likeCount: {
    fontSize: 11,
    color: '#a0aec0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: '#1a365d',
    borderTopWidth: 1,
    borderTopColor: '#2d4a6f',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingRight: 12,
    color: '#fff',
    fontSize: 14,
    maxHeight: 100,
    marginHorizontal: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#1e3a5f',
  },
});
