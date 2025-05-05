// File: components/PropertySearchForm.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

const PropertySearchForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All');
  
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Create query string
    const query = new URLSearchParams();
    
    if (searchTerm) query.set('q', searchTerm);
    if (location) query.set('location', location);
    if (propertyType !== 'All') query.set('propertyType', propertyType);
    
    // Redirect to properties page with filters
    router.push(`/properties?${query.toString()}`);
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="searchTerm" className="sr-only">Search Term</label>
          <input
            type="text"
            id="searchTerm"
            placeholder="Search by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <label htmlFor="location" className="sr-only">Location</label>
          <input
            type="text"
            id="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <label htmlFor="propertyType" className="sr-only">Property Type</label>
          <select
            id="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Studio">Studio</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <button 
          type="submit"
          className="bg-black text-white px-8 py-3 rounded-md hover:bg-secondary transition flex items-center"
        >
          <FaSearch className="mr-2" />
          Search Properties
        </button>
      </div>
    </form>
  );
};

export default PropertySearchForm;