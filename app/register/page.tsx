import RegisterForm from '../components/RegisterForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import { redirect } from 'next/navigation';

const RegisterPage = async () => {
  // Check if logged in
  const session = await getServerSession(authOptions);

  // If already authenticated, redirect to profile
  if (session) {
    redirect('/profile');
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Create An Account</h1>
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;