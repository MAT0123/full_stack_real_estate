import PropertySearchForm from '../components/PropertySearchForm';
import PropertyCard from '../components/PropertyCard';
import { prisma } from '../lib/db';
import { Property } from '../types';

export const dynamic = 'force-dynamic';

interface SearchParams {
  q?: string;
  location?: string;
  propertyType?: string;
}

const PropertiesPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const searchQuery = searchParams.q || '';
  const location = searchParams.location || '';
  const propertyType = searchParams.propertyType || '';

  // Build filter options
  const filters: any = {
    AND: [],
  };

  // Add text search
  if (searchQuery) {
    filters.AND.push({
      OR: [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
      ],
    });
  }

  // Add location filter
  if (location) {
    filters.AND.push({
      location: { contains: location, mode: 'insensitive' },
    });
  }

  // Add property type filter
  if (propertyType && propertyType !== 'All') {
    filters.AND.push({
      type: propertyType,
    });
  }

  // If no filters, don't filter by anything
  const whereClause = filters.AND.length > 0 ? filters : {};

  const properties = await prisma.property.findMany({
    where: whereClause,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <>
      <section className="page-banner h-[100px]">
       
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <PropertySearchForm />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">
            {properties.length > 0 
              ? `Found ${properties.length} Properties` 
              : 'No Properties Found'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property:Property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;