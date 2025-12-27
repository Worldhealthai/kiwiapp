import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Platform, View } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/contexts/AuthContext';

const linking = {
  prefixes: ['http://localhost:8081', 'https://kiwiapp.vercel.app'],
  config: {
    screens: {
      Auth: 'auth',
      MainTabs: {
        screens: {
          Globe: 'explore',
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

// Wrapper component for web compatibility
function AppWrapper({ children }: { children: React.ReactNode }) {
  if (Platform.OS === 'web') {
    return <View style={styles.container}>{children}</View>;
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      {children}
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <AppWrapper>
      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer linking={linking}>
            <StatusBar style="light" />
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </AppWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
});
