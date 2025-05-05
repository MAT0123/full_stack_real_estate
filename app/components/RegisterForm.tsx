'use client';

import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password, password2 } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Password validation
    if (password !== password2) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you'd send this to your API
      // For example:
      // const res = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name,
      //     email,
      //     password,
      //   }),
      // });
      
      // Simulate API call for demo
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success('Registration successful!');
      router.push('/login');
      
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Register</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      
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
      
      <div className="mb-4">
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
      
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password2">
          Confirm Password
        </label>
        <input
          type="password"
          id="password2"
          name="password2"
          value={password2}
          onChange={handleChange}
          placeholder="Confirm your password"
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
            'Creating your account...'
          ) : (
            <>
              <FaUser className="mr-2" />
              Register
            </>
          )}
        </button>
        
        <p className="text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
      
    </form>
  );
};

export default RegisterForm;