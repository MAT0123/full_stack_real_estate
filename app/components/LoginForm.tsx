'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log("Login attempt with:", { email });

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      
      console.log("SignIn result:", result);

      if (result?.error) {
        toast.error(`Login failed: ${result.error}`);
        console.error("Login error details:", result.error);
        setIsLoading(false);
        return;
      }

      toast.success('Logged in successfully');
      console.log("Login successful, redirecting to profile...");
      
      // Add a slight delay to ensure toast is visible
      setTimeout(() => {
        router.push('/profile');
      }, 1000);
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong during login');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      
      <div className="flex flex-col gap-4">
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-secondary transition flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            'Logging in...'
          ) : (
            <>
              <FaSignInAlt className="mr-2" />
              Login
            </>
          )}
        </button>
        
        <p className="text-center">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;