/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  databaseId?: string;
  slug?: string;
  name: string;
  price: number;
  currencySymbol: string;
  image: string;
  description: string;
  subheading?: string;
  category: 'herbal-powders' | 'nutraceuticals' | 'superfoods' | 'immunity' | 'fitness';
  isOrganic?: boolean;
  scientificBadge?: string;
  benefits: {
    title: string;
    description: string;
    icon: string;
  }[];
  ingredients: string;
  ingredientsDetail: string;
  qualityTesting: {
    badges: string[];
    description: string;
  };
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type ActiveTab = 'benefits' | 'ingredients' | 'quality';

export type ViewState =
  | 'home'
  | 'shop'
  | 'product-details'
  | 'cart'
  | 'checkout'
  | 'success'
  | 'wisdom'
  | 'quality'
  | 'sustainability'
  | 'contact'
  | 'login'
  | 'signup'
  | 'sanctuary'
  | 'admin'
  | 'not-found';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  phone?: string | null;
  role: 'customer' | 'admin';
}

export interface ShippingDetails {
  email: string;
  newsletter: boolean;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
}
