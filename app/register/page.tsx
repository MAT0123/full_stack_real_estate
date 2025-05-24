import RegisterForm from '../components/RegisterForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import { redirect } from 'next/navigation';

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

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