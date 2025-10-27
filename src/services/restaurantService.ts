import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restaurant } from '../types/Restaurant';
import { dummyRestaurants } from '../data/dummyData';

const STORAGE_KEY = '@restaurants_data';

// Load restaurants from storage or return defaults
export const loadRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    // If no data exists, initialize with dummy data
    await saveRestaurants(dummyRestaurants);
    return dummyRestaurants;
  } catch (error) {
    console.error('Error loading restaurants:', error);
    return dummyRestaurants;
  }
};

// Save restaurants to storage
export const saveRestaurants = async (restaurants: Restaurant[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
  } catch (error) {
    console.error('Error saving restaurants:', error);
  }
};

// Add a new restaurant
export const addRestaurant = async (restaurant: Restaurant): Promise<void> => {
  try {
    const restaurants = await loadRestaurants();
    restaurants.push(restaurant);
    await saveRestaurants(restaurants);
  } catch (error) {
    console.error('Error adding restaurant:', error);
  }
};

// Update an existing restaurant
export const updateRestaurant = async (updatedRestaurant: Restaurant): Promise<void> => {
  try {
    const restaurants = await loadRestaurants();
    const index = restaurants.findIndex(r => r.id === updatedRestaurant.id);
    if (index !== -1) {
      restaurants[index] = updatedRestaurant;
      await saveRestaurants(restaurants);
    }
  } catch (error) {
    console.error('Error updating restaurant:', error);
  }
};

// Delete a restaurant
export const deleteRestaurant = async (id: string): Promise<void> => {
  try {
    const restaurants = await loadRestaurants();
    const filtered = restaurants.filter(r => r.id !== id);
    await saveRestaurants(filtered);
  } catch (error) {
    console.error('Error deleting restaurant:', error);
  }
};

// Get a single restaurant by ID
export const getRestaurantById = async (id: string): Promise<Restaurant | undefined> => {
  try {
    const restaurants = await loadRestaurants();
    return restaurants.find(r => r.id === id);
  } catch (error) {
    console.error('Error getting restaurant:', error);
    return undefined;
  }
};

