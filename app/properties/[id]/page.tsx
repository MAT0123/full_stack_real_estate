import { notFound } from 'next/navigation';
import PropertyImages from '../../components/PropertyImages';
import PropertyDetails from '../../components/PropertyDetails';
import PropertyContactForm from '../../components/PropertyContactForm';
import ShareButtons from '../../components/ShareButtons';
import BookmarkButton from '../../components/BookmarkButton';
import { prisma } from '../../lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
export const dynamic = 'force-dynamic';

/**
 * Property details page component
 * Displays full information about a specific property listing
 */
export type Params = Promise<{ id: string }>;
export default async function PropertyPage({ params }: { params: Params }) {
  const  {id}  = await params;

  // Get current user session for authentication status
  const session = await getServerSession(authOptions);

  // Fetch the property with its associated user
  const property = await prisma.property.findUnique({
    where: { id: id },
    include: {
      user: true,
    },
  });

  // Return 404 if property not found
  if (!property) {
    notFound();
  }

  // Check if the current user has bookmarked this property
  let isBookmarked = false;
  if (session?.user?.id) {
    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_propertyId: {
          userId: session.user.id,
          propertyId: property.id,
        },
      },
    });
    isBookmarked = !!bookmark;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <p className="text-lg text-gray-600 mt-2">{property.location}</p>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <p className="font-bold text-xl text-primary">
              ${(property.rates as any).monthly.toLocaleString()}/month
            </p>
            
            {session?.user?.id && (
              <BookmarkButton 
                propertyId={property.id}
                isBookmarked={isBookmarked}
              />
            )}
            
            <ShareButtons property={property} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PropertyImages images={property.images} />
            <PropertyDetails property={property} />
          </div>
          
          <div>
            <PropertyContactForm property={property} />
          </div>
        </div>
      </div>
    </section>
  );
};

