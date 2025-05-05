'use client';

import React, { useState } from 'react';
import { FaPaperPlane, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Property } from '../types/index';

interface PropertyContactFormProps {
  property: Property;
}

const PropertyContactForm: React.FC<PropertyContactFormProps> = ({ property }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real application, you'd send this data to an API endpoint
    setIsSubmitting(true);
    
    // For demo purposes, just show a success message
    setTimeout(() => {
      toast.success('Message sent successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name:
          </label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <FaUser />
            </div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email:
          </label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <FaEnvelope />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            Phone:
          </label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <FaPhone />
            </div>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="message">
            Message:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`I'm interested in this property located at ${property.location}`}
            required
            rows={4}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-primary"
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white py-3 px-4 rounded-md w-full flex justify-center items-center hover:bg-secondary transition"
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              <FaPaperPlane className="mr-2" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PropertyContactForm;