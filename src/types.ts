export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  beds: number;
  baths: number;
  sqft: number;
  type: 'Single Family' | 'Condo' | 'Townhouse' | 'Land' | 'Luxury';
  status: 'Active' | 'Pending' | 'Sold';
  images: string[];
  description: string;
  features: string[];
  neighborhood: string;
  yearBuilt: number;
  lotSize: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}
