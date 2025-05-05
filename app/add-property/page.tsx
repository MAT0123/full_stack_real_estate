import PropertyAddForm from '../components/PropertyAddForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import { redirect } from 'next/navigation';

const AddPropertyPage = async () => {
  // Check for session (authentication)
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to login page
  if (!session) {
    redirect('/login');
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Add Property</h1>
        <PropertyAddForm />
      </div>
    </section>
  );
};

export default AddPropertyPage;