'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBed, FaBath, FaRuler, FaMapMarker } from 'react-icons/fa';
import { formatPrice } from '../lib/utils';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="property-card">
      <Link href={`/properties/${property.id}`}>
        <Image 
          src={property.images[0] || '/images/property-default.jpg'} 
          alt={property.title}
          width={500}
          height={300}
          className="h-48 w-full object-cover"
          priority={true}
        />
      </Link>
      
      <div className="p-4">
        <div className="text-primary font-bold text-xl mb-1">
          {formatPrice((property.rates as any).monthly)}/mo
        </div>
        
        <h3 className="text-xl font-bold mb-2">
          <Link href={`/properties/${property.id}`} className="hover:text-primary transition">
            {property.title}
          </Link>
        </h3>
        
        <div className="flex items-center text-gray-600 mb-4">
          <FaMapMarker className="mr-1 text-primary" />
          <p className="truncate">{property.location}</p>
        </div>
        
        <div className="flex justify-between text-gray-500 mb-4">
          <div className="flex items-center">
            <FaBed className="mr-1" />
            <p>{property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}</p>
          </div>
          
          <div className="flex items-center">
            <FaBath className="mr-1" />
            <p>{property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}</p>
          </div>
          
          {property.squareFeet && (
            <div className="flex items-center">
              <FaRuler className="mr-1" />
              <p>{property.squareFeet} sqft</p>
            </div>
          )}
        </div>
        
        <div className="border-t pt-3">
          <Link 
            href={`/properties/${property.id}`}
            className="inline-block bg-primary text-white rounded-md px-3 py-1 hover:bg-secondary transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;