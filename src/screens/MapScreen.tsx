import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Restaurant } from '../types/Restaurant';

interface MapScreenProps {
  navigation: any;
  route: any;
}

const MapScreen: React.FC<MapScreenProps> = ({ navigation, route }) => {
  const { restaurant }: { restaurant: Restaurant } = route.params;

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`;
    Linking.openURL(url).catch(err => console.error('Failed to open map:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Map</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={80} color="#FF6B35" />
          <Text style={styles.mapText}>Map View</Text>
          <Text style={styles.mapSubtext}>
            {restaurant.name}
          </Text>
          <Text style={styles.addressText}>{restaurant.address}</Text>
          {restaurant.latitude && restaurant.longitude && (
            <Text style={styles.coordinatesText}>
              {restaurant.latitude.toFixed(4)}, {restaurant.longitude.toFixed(4)}
            </Text>
          )}
          <TouchableOpacity 
            style={styles.openMapButton}
            onPress={openMap}
          >
            <Ionicons name="open-outline" size={20} color="#FFFFFF" />
            <Text style={styles.openMapText}>Open in Maps</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color="#FF6B35" />
          <Text style={styles.infoText}>{restaurant.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call" size={20} color="#FF6B35" />
          <Text style={styles.infoText}>{restaurant.phone}</Text>
        </View>
      </View>
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  mapText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginTop: 10,
  },
  mapSubtext: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginTop: 15,
    textAlign: 'center',
  },
  addressText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  coordinatesText: {
    fontSize: 12,
    color: '#999999',
    marginTop: 15,
    fontFamily: 'monospace',
  },
  openMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    gap: 8,
  },
  openMapText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666666',
    flex: 1,
  },
});

export default MapScreen;