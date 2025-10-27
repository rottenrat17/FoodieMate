import { Restaurant } from '../types/Restaurant';

export const dummyRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Palace',
    address: '123 Main Street, Toronto, ON',
    phone: '(416) 555-1234',
    description: 'Cozy Italian restaurant with authentic wood-fired pizzas and fresh pasta. Great for family dinners.',
    tags: ['Italian', 'Family', 'Pizza'],
    rating: 4,
    latitude: 43.6532,
    longitude: -79.3832
  },
  {
    id: '2',
    name: 'Green Leaf Cafe',
    address: '456 Queen Street West, Toronto, ON',
    phone: '(416) 555-5678',
    description: 'Modern vegan cafe offering fresh salads, smoothie bowls, and plant-based comfort food.',
    tags: ['Vegan', 'Healthy', 'Cafe'],
    rating: 5,
    latitude: 43.6548,
    longitude: -79.3882
  },
  {
    id: '3',
    name: 'Thai Express',
    address: '789 Yonge Street, Toronto, ON',
    phone: '(416) 555-9012',
    description: 'Authentic Thai cuisine with spicy curries, fresh spring rolls, and traditional pad thai.',
    tags: ['Thai', 'Spicy', 'Asian'],
    rating: 4,
    latitude: 43.6702,
    longitude: -79.3867
  },
  {
    id: '4',
    name: 'Burger Junction',
    address: '321 King Street East, Toronto, ON',
    phone: '(416) 555-3456',
    description: 'Gourmet burgers made with locally sourced beef, fresh toppings, and crispy fries.',
    tags: ['Burgers', 'American', 'Casual'],
    rating: 3,
    latitude: 43.6519,
    longitude: -79.3754
  },
  {
    id: '5',
    name: 'Sushi Zen',
    address: '654 Bloor Street West, Toronto, ON',
    phone: '(416) 555-7890',
    description: 'Traditional Japanese sushi bar with fresh sashimi, creative rolls, and sake selection.',
    tags: ['Japanese', 'Sushi', 'Fine Dining'],
    rating: 5,
    latitude: 43.6629,
    longitude: -79.4107
  }
];