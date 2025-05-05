import React from 'react';
import { FaHome, FaMoneyBillWave, FaSearchLocation, FaUserCheck } from 'react-icons/fa';

interface InfoBoxProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 border rounded-lg text-center hover:bg-gray-50 transition">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const InfoBoxes: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose PropertyPulse?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoBox 
            icon={<FaHome className="text-4xl text-primary" />}
            title="Wide Range of Properties"
            description="From apartments to family homes, we have properties to suit every need and budget."
          />
          
          <InfoBox 
            icon={<FaMoneyBillWave className="text-4xl text-primary" />}
            title="Best Value Rentals"
            description="We offer competitive prices on all our rental properties for the best value."
          />
          
          <InfoBox 
            icon={<FaSearchLocation className="text-4xl text-primary" />}
            title="Easy Property Search"
            description="Our user-friendly platform makes finding the perfect property fast and simple."
          />
          
          <InfoBox 
            icon={<FaUserCheck className="text-4xl text-primary" />}
            title="Verified Listings"
            description="All our property listings are verified to ensure accuracy and quality."
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;