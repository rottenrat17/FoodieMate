export interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  tags: string[];
  rating: number;
  latitude?: number;
  longitude?: number;
}

export interface NavigationProps {
  navigation: any;
  route: any;
}
