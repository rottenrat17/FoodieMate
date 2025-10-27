import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Restaurant } from '../types/Restaurant';
import { loadRestaurants } from '../services/restaurantService';

interface RestaurantListScreenProps {
  navigation: any;
}

const RestaurantListScreen: React.FC<RestaurantListScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  // Load restaurants when screen comes into focus
  const fetchRestaurants = async () => {
    setLoading(true);
    const data = await loadRestaurants();
    setRestaurants(data);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchRestaurants();
    });
    fetchRestaurants();
    return unsubscribe;
  }, [navigation]);

  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={16}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  const renderRestaurantItem = ({ item }: { item: Restaurant }) => (
    <View style={styles.restaurantItemContainer}>
      <TouchableOpacity
        style={styles.restaurantItem}
        onPress={() => navigation.navigate('RestaurantDetails', { restaurant: item })}
        onLongPress={() => navigation.navigate('AddEditRestaurant', { restaurant: item })}
      >
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(item.rating)}
            </View>
            <Text style={styles.ratingText}>{item.rating}/5</Text>
          </View>
          <Text style={styles.restaurantAddress}>{item.address}</Text>
          <Text style={styles.restaurantTags}>{item.tags.join(', ')}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>
      {Platform.OS === 'web' && (
        <TouchableOpacity
          style={styles.editButtonWeb}
          onPress={() => navigation.navigate('AddEditRestaurant', { restaurant: item })}
        >
          <Ionicons name="create-outline" size={18} color="#FF6B35" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Restaurants</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('About')}
        >
          <Ionicons name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredRestaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchRestaurants} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="restaurant-outline" size={60} color="#CCCCCC" />
            <Text style={styles.emptyText}>No restaurants found</Text>
            <Text style={styles.emptySubtext}>Add your first restaurant!</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEditRestaurant')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FF6B35',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  menuButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
  },
  listWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  list: {
    flex: 1,
  },
  restaurantItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  restaurantItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  editButtonWeb: {
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666666',
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 3,
  },
  restaurantTags: {
    fontSize: 12,
    color: '#999999',
    fontStyle: 'italic',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999999',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 5,
  },
});

export default RestaurantListScreen;