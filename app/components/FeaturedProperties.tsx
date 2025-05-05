import React from 'react';
import Link from 'next/link';
import PropertyCard from './PropertyCard';
import { prisma } from '../lib/db';
import { Property } from '../types';

// This needs to be a server component to fetch data
const FeaturedProperties = async () => {
  // Get featured properties
  const featuredProperties = await prisma.property.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
  });
  
  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
        
        {featuredProperties.length === 0 ? (
          <p className="text-center text-gray-500">No featured properties at this time.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property: Property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/properties" className="btn btn-secondary">
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;