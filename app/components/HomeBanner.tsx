import React from 'react';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

const HomeBanner: React.FC = () => {
  return (
    <div className="bg-blue-700 py-20">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-center">
          Find Your Perfect Property
        </h1>
        <p className="text-white text-xl text-center mb-12 max-w-2xl">
          Discover the ideal rental property that matches your lifestyle and budget with PropertyPulse.
        </p>
        
        <Link href="/properties" className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg flex items-center hover:bg-gray-100 transition">
          <FaSearch className="mr-2" />
          Browse Properties
        </Link>
      </div>
    </div>
  );
};

export default HomeBanner;