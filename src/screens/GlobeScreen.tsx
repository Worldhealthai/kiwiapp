import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { countries } from '../data/countries';
import { Country } from '../types';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Interactive Globe Component with touch controls
function InteractiveGlobe({ onCountrySelect }: { onCountrySelect: (country: Country) => void }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const rotationRef = useRef({ x: 0, y: 0 });
  const animatedRotation = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newRotation = {
          x: rotationRef.current.x + gestureState.dy * 0.5,
          y: rotationRef.current.y + gestureState.dx * 0.5,
        };
        setRotation(newRotation);
      },
      onPanResponderRelease: (_, gestureState) => {
        rotationRef.current = {
          x: rotationRef.current.x + gestureState.dy * 0.5,
          y: rotationRef.current.y + gestureState.dx * 0.5,
        };
      },
    })
  ).current;

  // Calculate country positions on globe based on rotation
  const getCountryPosition = (lat: number, lng: number) => {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lng + rotation.y) * Math.PI) / 180;

    const radius = 120 * scale;
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    // Only show if on front of globe
    const isVisible = z > -20;

    return {
      x: x + width / 2 - 25,
      y: -y + 150,
      z,
      isVisible,
      opacity: isVisible ? Math.min(1, (z + 120) / 120) : 0,
    };
  };

  return (
    <View style={styles.globeContainer} {...panResponder.panHandlers}>
      {/* Globe background */}
      <View style={[styles.globe, { transform: [{ scale }] }]}>
        <View style={styles.globeInner}>
          {/* Globe gradient layers */}
          <View style={styles.globeLayer1} />
          <View style={styles.globeLayer2} />
          <View style={styles.globeLayer3} />

          {/* Grid lines */}
          {[...Array(8)].map((_, i) => (
            <View
              key={`lat-${i}`}
              style={[
                styles.latLine,
                {
                  top: 30 + i * 30,
                  transform: [{ rotateX: `${rotation.x}deg` }],
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Country markers */}
      {countries.map((country) => {
        const pos = getCountryPosition(country.coordinates.lat, country.coordinates.lng);
        if (!pos.isVisible) return null;

        return (
          <TouchableOpacity
            key={country.id}
            style={[
              styles.countryMarker,
              {
                left: pos.x,
                top: pos.y,
                opacity: pos.opacity,
                transform: [{ scale: 0.5 + pos.opacity * 0.5 }],
              },
              country.visited && styles.visitedMarker,
            ]}
            onPress={() => onCountrySelect(country)}
          >
            <Text style={styles.countryEmoji}>{country.flagEmoji}</Text>
            <View style={[styles.markerDot, country.visited && styles.visitedDot]} />
          </TouchableOpacity>
        );
      })}

      {/* Instructions */}
      <View style={styles.globeInstructions}>
        <Ionicons name="hand-left-outline" size={16} color="#a0aec0" />
        <Text style={styles.instructionText}>Drag to rotate globe</Text>
      </View>
    </View>
  );
}

export default function GlobeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showCountryList, setShowCountryList] = useState(false);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleExploreCountry = () => {
    if (selectedCountry) {
      navigation.navigate('CountryDetail', { countryId: selectedCountry.id });
      setSelectedCountry(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Kiwi Travel</Text>
          <Text style={styles.subtitle}>Explore the world</Text>
        </View>
        <TouchableOpacity
          style={styles.listButton}
          onPress={() => setShowCountryList(true)}
        >
          <Ionicons name="list" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{countries.filter(c => c.visited).length}</Text>
          <Text style={styles.statLabel}>Countries Visited</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{countries.length}</Text>
          <Text style={styles.statLabel}>Total Countries</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {Math.round((countries.filter(c => c.visited).length / countries.length) * 100)}%
          </Text>
          <Text style={styles.statLabel}>Explored</Text>
        </View>
      </View>

      {/* Globe */}
      <InteractiveGlobe onCountrySelect={handleCountrySelect} />

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.visitedDot]} />
          <Text style={styles.legendText}>Visited</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={styles.legendDot} />
          <Text style={styles.legendText}>Bucket List</Text>
        </View>
      </View>

      {/* Country Preview Modal */}
      <Modal
        visible={!!selectedCountry}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedCountry(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.countryPreview}>
            {selectedCountry && (
              <>
                <View style={styles.previewHeader}>
                  <Text style={styles.previewEmoji}>{selectedCountry.flagEmoji}</Text>
                  <View style={styles.previewTitleContainer}>
                    <Text style={styles.previewTitle}>{selectedCountry.name}</Text>
                    <Text style={styles.previewContinent}>{selectedCountry.continent}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setSelectedCountry(null)}
                  >
                    <Ionicons name="close" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.previewDescription} numberOfLines={3}>
                  {selectedCountry.description}
                </Text>

                {selectedCountry.visited && (
                  <View style={styles.visitedBadge}>
                    <Ionicons name="checkmark-circle" size={16} color="#4fd1c5" />
                    <Text style={styles.visitedText}>You've been here!</Text>
                  </View>
                )}

                <View style={styles.previewActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleExploreCountry}
                  >
                    <Ionicons name="compass" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Explore</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.chatButton]}
                    onPress={() => {
                      navigation.navigate('CountryChat', {
                        countryId: selectedCountry.id,
                        countryName: selectedCountry.name,
                      });
                      setSelectedCountry(null);
                    }}
                  >
                    <Ionicons name="chatbubbles" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Chat</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.matchButton]}
                    onPress={() => {
                      navigation.navigate('Matching', {
                        countryId: selectedCountry.id,
                        countryName: selectedCountry.name,
                      });
                      setSelectedCountry(null);
                    }}
                  >
                    <Ionicons name="heart" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Match</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Country List Modal */}
      <Modal
        visible={showCountryList}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCountryList(false)}
      >
        <View style={styles.listModalOverlay}>
          <View style={styles.listModal}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>All Countries</Text>
              <TouchableOpacity onPress={() => setShowCountryList(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.countryList}>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country.id}
                  style={styles.countryListItem}
                  onPress={() => {
                    setShowCountryList(false);
                    setSelectedCountry(country);
                  }}
                >
                  <Text style={styles.countryListEmoji}>{country.flagEmoji}</Text>
                  <View style={styles.countryListInfo}>
                    <Text style={styles.countryListName}>{country.name}</Text>
                    <Text style={styles.countryListContinent}>{country.continent}</Text>
                  </View>
                  {country.visited && (
                    <Ionicons name="checkmark-circle" size={20} color="#4fd1c5" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
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
  subtitle: {
    fontSize: 14,
    color: '#a0aec0',
    marginTop: 2,
  },
  listButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1e3a5f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#1e3a5f',
    borderRadius: 16,
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
  globeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  globe: {
    width: 280,
    height: 280,
    borderRadius: 140,
    overflow: 'hidden',
    position: 'absolute',
  },
  globeInner: {
    width: '100%',
    height: '100%',
    borderRadius: 140,
    overflow: 'hidden',
  },
  globeLayer1: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#1e40af',
    borderRadius: 140,
  },
  globeLayer2: {
    position: 'absolute',
    width: '70%',
    height: '70%',
    backgroundColor: '#2563eb',
    borderRadius: 140,
    top: '15%',
    left: '15%',
    opacity: 0.6,
  },
  globeLayer3: {
    position: 'absolute',
    width: '40%',
    height: '40%',
    backgroundColor: '#3b82f6',
    borderRadius: 100,
    top: '10%',
    left: '10%',
    opacity: 0.4,
  },
  latLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  countryMarker: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  countryEmoji: {
    fontSize: 28,
  },
  markerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f59e0b',
    marginTop: 4,
  },
  visitedMarker: {},
  visitedDot: {
    backgroundColor: '#4fd1c5',
  },
  globeInstructions: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  instructionText: {
    color: '#a0aec0',
    fontSize: 12,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    paddingBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#f59e0b',
  },
  legendText: {
    color: '#a0aec0',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  countryPreview: {
    backgroundColor: '#1a365d',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  previewEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  previewTitleContainer: {
    flex: 1,
  },
  previewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  previewContinent: {
    fontSize: 14,
    color: '#a0aec0',
    marginTop: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2d4a6f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
    marginBottom: 16,
  },
  visitedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(79,209,197,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  visitedText: {
    color: '#4fd1c5',
    fontSize: 14,
    fontWeight: '500',
  },
  previewActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
  },
  chatButton: {
    backgroundColor: '#7c3aed',
  },
  matchButton: {
    backgroundColor: '#ec4899',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  listModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  listModal: {
    flex: 1,
    backgroundColor: '#1a365d',
    marginTop: 100,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2d4a6f',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  countryList: {
    flex: 1,
  },
  countryListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d4a6f',
  },
  countryListEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  countryListInfo: {
    flex: 1,
  },
  countryListName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  countryListContinent: {
    fontSize: 12,
    color: '#a0aec0',
    marginTop: 2,
  },
});
