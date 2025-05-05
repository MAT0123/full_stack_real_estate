import Link from 'next/link';
import HomeBanner from './components/HomeBanner';
import PropertyCard from './components/PropertyCard';
import FeaturedProperties from './components/FeaturedProperties';
import InfoBoxes from './components/InfoBoxes';
import { prisma } from './lib/db';
import { Property } from './types';

export default async function Home() {
  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 6, // Limit to 6 properties
  });
  return (
    <div className="">
            <HomeBanner />
      <InfoBoxes />
      <FeaturedProperties />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Properties</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {properties.map((property:Property) => (
              <PropertyCard key={property.id} property={property} />
            ))} */}
          </div>
          
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
