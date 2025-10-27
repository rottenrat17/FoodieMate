import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addRestaurant, updateRestaurant } from '../services/restaurantService';
import { Restaurant } from '../types/Restaurant';

interface AddEditRestaurantScreenProps {
  navigation: any;
  route: any;
}

const AddEditRestaurantScreen: React.FC<AddEditRestaurantScreenProps> = ({ navigation, route }) => {
  const existingRestaurant = route.params?.restaurant;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: existingRestaurant?.name || '',
    address: existingRestaurant?.address || '',
    phone: existingRestaurant?.phone || '',
    description: existingRestaurant?.description || '',
    tags: existingRestaurant?.tags || [],
    rating: existingRestaurant?.rating || 3,
  });
  const [tagsInput, setTagsInput] = useState(existingRestaurant?.tags.join(', ') || '');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const parseTags = (input: string): string[] => {
    return input
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => {
            setFormData(prev => ({ ...prev, rating: i }));
          }}
        >
          <Ionicons
            name={i <= rating ? 'star' : 'star-outline'}
            size={30}
            color="#FFD700"
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter a restaurant name');
      return;
    }

    if (!formData.address.trim()) {
      Alert.alert('Error', 'Please enter an address');
      return;
    }

    setIsLoading(true);

    try {
      const tags = parseTags(tagsInput);

      if (existingRestaurant) {
        // Update existing restaurant
        const updatedRestaurant: Restaurant = {
          id: existingRestaurant.id,
          name: formData.name.trim(),
          address: formData.address.trim(),
          phone: formData.phone.trim(),
          description: formData.description.trim(),
          tags,
          rating: formData.rating,
          latitude: existingRestaurant.latitude,
          longitude: existingRestaurant.longitude,
        };
        
        await updateRestaurant(updatedRestaurant);
        Alert.alert('Success', 'Restaurant updated successfully!');
      } else {
        // Create new restaurant
        const newRestaurant: Restaurant = {
          id: Date.now().toString(),
          name: formData.name.trim(),
          address: formData.address.trim(),
          phone: formData.phone.trim(),
          description: formData.description.trim(),
          tags,
          rating: formData.rating,
        };
        
        await addRestaurant(newRestaurant);
        Alert.alert('Success', 'Restaurant added successfully!');
      }
      
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save restaurant. Please try again.');
      console.error('Error saving restaurant:', error);
    } finally {
      setIsLoading(false);
    }
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
        <Text style={styles.headerTitle}>
          {existingRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Restaurant Name</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Enter restaurant name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              placeholder="Enter address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholder="Enter phone number"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              placeholder="Enter description"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tags (comma separated)</Text>
            <TextInput
              style={styles.input}
              value={tagsInput}
              onChangeText={setTagsInput}
              placeholder="e.g., Italian, Pizza, Casual"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Rating</Text>
            <View style={styles.starsContainer}>
              {renderStars(formData.rating)}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]} 
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>Save Restaurant</Text>
          )}
        </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 20,
  },
  form: {
    backgroundColor: '#FFFFFF',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddEditRestaurantScreen;