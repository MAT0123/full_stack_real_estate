import Link from 'next/link';
import HomeBanner from './components/HomeBanner';
import PropertyCard from './components/PropertyCard';
import FeaturedProperties from './components/FeaturedProperties';
import InfoBoxes from './components/InfoBoxes';
import { prisma } from './lib/db';
import { Property } from './types';


// Force dynamic rendering to avoid prerendering errors
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Use a try/catch block to handle potential errors during data fetching
  let properties: Property[] = [];

  try {
    // Import prisma within the try block to handle connection errors gracefully
    const { prisma } = await import('./lib/db');
    
    properties = await prisma.property.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 6,
    });
    
  } catch (error) {
    console.error("Error fetching properties:", error);
    // Continue with empty properties array rather than crashing
  }

  return (
    <div>
      <HomeBanner />
      <InfoBoxes />
      
      {/* Conditionally render FeaturedProperties to avoid errors */}
      {/* Commenting this out temporarily if it's causing issues */}
      {/* <FeaturedProperties /> */}

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Properties</h2>
          
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No properties available at this time.</p>
          )}
          
          <div className="mt-12 text-center">
            <Link href="/properties" className="btn btn-primary">
              View All Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}