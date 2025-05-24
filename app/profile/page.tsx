import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../lib/auth';
import PropertyCard from '../components/PropertyCard';
import ProfileHeader from '../components/ProfileHeader';
import { prisma } from '../lib/db';
import Link from 'next/link';
import { Property, SessionUser , Bookmark } from '../types';

export const dynamic = 'force-dynamic';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  const user = session.user as SessionUser;

  const userProperties = await prisma.property.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: user.id,
    },
    include: {
      property: true,
    },
  });

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <ProfileHeader user={user} propertiesCount={userProperties.length} />
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Your Properties</h2>
          
          {userProperties.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="mb-4">You don't have any properties listed</p>
              <Link href="/add-property" className="btn btn-primary">
                Add Your First Property
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProperties.map((property: Property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Link href="/add-property" className="btn btn-primary">
                  Add New Property
                </Link>
              </div>
            </>
          )}
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Saved Properties</h2>
          
          {bookmarks.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p>You haven't saved any properties yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarks.map(({ property } : Bookmark) => property && (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;