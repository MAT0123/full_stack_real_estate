import LoginForm from '../components/LoginForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/profile');
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login To Your Account</h1>
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
