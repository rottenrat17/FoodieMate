import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AboutScreenProps {
  navigation: any;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Ionicons name="restaurant" size={60} color="#FF6B35" style={styles.icon} />
          <Text style={styles.appName}>FoodieMate</Text>
          <Text style={styles.tagline}>Your Personal Restaurant Guide</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the App</Text>
          <Text style={styles.sectionText}>
            FoodieMate helps users keep track of restaurants they visit. 
            Store restaurant details, rate them, and search for restaurants.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <Text style={styles.featureText}>• Add and manage restaurants</Text>
          <Text style={styles.featureText}>• Rate restaurants (1-5 stars)</Text>
          <Text style={styles.featureText}>• Search restaurants by name</Text>
          <Text style={styles.featureText}>• View restaurant details</Text>
          <Text style={styles.featureText}>• Edit and delete restaurants</Text>
          <Text style={styles.featureText}>• Data persistence with local storage</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group Members</Text>
          <Text style={styles.sectionText}>
            Pratik Pokhrel
          </Text>
          <Text style={styles.sectionText}>
            Khalid Wasim
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contributions</Text>
          <Text style={styles.featureText}>• Pratik: Main functionality, CRUD operations, data persistence</Text>
          <Text style={styles.featureText}>• Khalid: UI improvements, documentation, additional features</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Information</Text>
          <Text style={styles.sectionText}>
            COMP 3074 - Mobile Application Development
            {'\n'}Group: G-22
            {'\n'}George Brown College
          </Text>
        </View>
      </ScrollView>
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
  section: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
    textAlign: 'left',
  },
});

export default AboutScreen;