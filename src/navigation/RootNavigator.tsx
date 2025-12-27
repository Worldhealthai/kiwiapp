import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

// Screens
import GlobeScreen from '../screens/GlobeScreen';
import CountryDetailScreen from '../screens/CountryDetailScreen';
import CountryChatScreen from '../screens/CountryChatScreen';
import MatchingScreen from '../screens/MatchingScreen';
import MatchesListScreen from '../screens/MatchesListScreen';
import MatchChatScreen from '../screens/MatchChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BlogPostScreen from '../screens/BlogPostScreen';
import AuthScreen from '../screens/AuthScreen';

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  CountryDetail: { countryId: string };
  CountryChat: { countryId: string; countryName: string };
  Matching: { countryId: string; countryName: string };
  MatchChat: { matchId: string; userName: string };
  BlogPost: { postId: string; countryId: string };
};

export type TabParamList = {
  Globe: undefined;
  Matches: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a365d',
          borderTopColor: '#2d4a6f',
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: '#4fd1c5',
        tabBarInactiveTintColor: '#a0aec0',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Globe') {
            iconName = focused ? 'globe' : 'globe-outline';
          } else if (route.name === 'Matches') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Globe"
        component={GlobeScreen}
        options={{ tabBarLabel: 'Explore' }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesListScreen}
        options={{ tabBarLabel: 'Matches' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a365d',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CountryDetail"
            component={CountryDetailScreen}
            options={{ title: 'Country Details' }}
          />
          <Stack.Screen
            name="CountryChat"
            component={CountryChatScreen}
            options={({ route }) => ({ title: `${route.params.countryName} Chat` })}
          />
          <Stack.Screen
            name="Matching"
            component={MatchingScreen}
            options={({ route }) => ({ title: `Find Travel Buddies` })}
          />
          <Stack.Screen
            name="MatchChat"
            component={MatchChatScreen}
            options={({ route }) => ({ title: route.params.userName })}
          />
          <Stack.Screen
            name="BlogPost"
            component={BlogPostScreen}
            options={{ title: 'Blog Post' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
