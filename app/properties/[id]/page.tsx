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

const PropertyPage = async ({ params }: { params: { id: string } }) => {
  // Get session for user auth status
  const session = await getServerSession(authOptions);

  // Fetch property
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      user: true,
    },
  });

  // Check if property exists
  if (!property) {
    notFound();
  }

  // Check if property is bookmarked by user
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{property.location}</p>
          </div>
          <div className="flex items-center gap-4">
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
export default PropertyPage;