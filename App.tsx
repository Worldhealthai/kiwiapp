import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, Text, Platform } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/contexts/AuthContext';

const linking = {
  prefixes: [
    'http://localhost:8081',
    'http://localhost:19006',
    'https://kiwiapp.vercel.app',
  ],
  config: {
    screens: {
      Auth: 'auth',
      MainTabs: {
        screens: {
          Globe: '',
          Matches: 'matches',
          Profile: 'profile',
        },
      },
      CountryDetail: 'country/:countryId',
      CountryChat: 'country/:countryId/chat',
      Matching: 'country/:countryId/match',
      MatchChat: 'match/:matchId',
      BlogPost: 'blog/:postId',
    },
  },
};

// Error boundary for debugging
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorText}>{this.state.error?.message}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <SafeAreaProvider>
          <AuthProvider>
            <NavigationContainer
              linking={linking}
              fallback={
                <View style={styles.loading}>
                  <Text style={styles.loadingText}>Loading...</Text>
                </View>
              }
              documentTitle={{
                formatter: () => 'Kiwi Travel Footsteps',
              }}
            >
              <StatusBar style="light" />
              <RootNavigator />
            </NavigationContainer>
          </AuthProvider>
        </SafeAreaProvider>
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    padding: 20,
  },
  errorTitle: {
    color: '#f43f5e',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
