import { JsonValue } from '@prisma/client/runtime/library';

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface Property {
  id: string;
  userId: string;
  title: string;
  description: string;
  location: string;
  type: string;
  squareFeet?: number | null;
  beds: number;
  baths: number;
  rates: JsonValue;
  amenities: string[];
  images: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface Bookmark {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: Date;
  property?: Property;
}

