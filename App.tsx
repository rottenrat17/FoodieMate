import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import SplashScreen from './src/screens/SplashScreen';
import RestaurantListScreen from './src/screens/RestaurantListScreen';
import RestaurantDetailsScreen from './src/screens/RestaurantDetailsScreen';
import AddEditRestaurantScreen from './src/screens/AddEditRestaurantScreen';
import MapScreen from './src/screens/MapScreen';
import AboutScreen from './src/screens/AboutScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, // Hide default headers, using custom ones
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
        />
        <Stack.Screen 
          name="RestaurantList" 
          component={RestaurantListScreen} 
        />
        <Stack.Screen 
          name="RestaurantDetails" 
          component={RestaurantDetailsScreen} 
        />
        <Stack.Screen 
          name="AddEditRestaurant" 
          component={AddEditRestaurantScreen} 
        />
        <Stack.Screen 
          name="Map" 
          component={MapScreen} 
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}