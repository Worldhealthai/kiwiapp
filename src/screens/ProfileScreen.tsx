import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { getCountryById, countries } from '../data/countries';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Please log in</Text>
      </View>
    );
  }

  const visitedCountries = user.countriesVisited
    .map((code) => countries.find((c) => c.code === code))
    .filter(Boolean);

  const wishlistCountries = user.countriesWantToVisit
    .map((code) => countries.find((c) => c.code === code))
    .filter(Boolean);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userHandle}>@{user.username}</Text>
          <Text style={styles.userBio}>{user.bio}</Text>

          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={16} color="#4fd1c5" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.countriesVisited.length}</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Matches</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
        </View>

        {/* Countries Visited */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Countries Visited</Text>
            <Text style={styles.sectionCount}>{visitedCountries.length}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.countriesRow}>
              {visitedCountries.map((country) => (
                <View key={country?.id} style={styles.countryChip}>
                  <Text style={styles.countryChipEmoji}>{country?.flagEmoji}</Text>
                  <Text style={styles.countryChipName}>{country?.name}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Bucket List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bucket List</Text>
            <Text style={styles.sectionCount}>{wishlistCountries.length}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.countriesRow}>
              {wishlistCountries.map((country) => (
                <View key={country?.id} style={[styles.countryChip, styles.wishlistChip]}>
                  <Text style={styles.countryChipEmoji}>{country?.flagEmoji}</Text>
                  <Text style={styles.countryChipName}>{country?.name}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Travel Style */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travel Style</Text>
          <View style={styles.travelStyles}>
            {['Adventure', 'Nature', 'Culture', 'Photography', 'Food'].map((style) => (
              <View key={style} style={styles.styleTag}>
                <Text style={styles.styleTagText}>{style}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="bookmark-outline" size={22} color="#4fd1c5" />
            <Text style={styles.menuItemText}>Saved Posts</Text>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={22} color="#4fd1c5" />
            <Text style={styles.menuItemText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#4fd1c5" />
            <Text style={styles.menuItemText}>Privacy & Safety</Text>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={22} color="#4fd1c5" />
            <Text style={styles.menuItemText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={22} color="#f43f5e" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1e3a5f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    alignItems: 'center',
    padding: 24,
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4fd1c5',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  userHandle: {
    fontSize: 14,
    color: '#a0aec0',
    marginTop: 4,
  },
  userBio: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4fd1c5',
  },
  editButtonText: {
    color: '#4fd1c5',
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#1e3a5f',
    borderRadius: 16,
    paddingVertical: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4fd1c5',
  },
  statLabel: {
    fontSize: 12,
    color: '#a0aec0',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#2d4a6f',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  sectionCount: {
    fontSize: 14,
    color: '#4fd1c5',
    marginLeft: 8,
    backgroundColor: '#1e3a5f',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countriesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  countryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a5f',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  wishlistChip: {
    backgroundColor: '#2d2a5f',
    borderWidth: 1,
    borderColor: '#7c3aed',
  },
  countryChipEmoji: {
    fontSize: 20,
  },
  countryChipName: {
    color: '#fff',
    fontSize: 14,
  },
  travelStyles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  styleTag: {
    backgroundColor: 'rgba(79,209,197,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  styleTagText: {
    color: '#4fd1c5',
    fontSize: 14,
  },
  menuSection: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#1e3a5f',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d4a6f',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 14,
    color: '#fff',
    fontSize: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginHorizontal: 20,
    padding: 16,
    backgroundColor: 'rgba(244,63,94,0.1)',
    borderRadius: 12,
    gap: 10,
  },
  logoutText: {
    color: '#f43f5e',
    fontSize: 16,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 12,
    marginTop: 20,
    marginBottom: 30,
  },
});
