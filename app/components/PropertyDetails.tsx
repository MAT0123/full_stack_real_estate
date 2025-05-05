import React from 'react';
import { FaBed, FaBath, FaRuler, FaMapMarker, FaTag, FaClock } from 'react-icons/fa';
import { formatDate, formatPrice } from '../lib/utils';
import { Property } from '../types';

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between pb-4 border-b">
        <div>
          <h3 className="text-2xl font-bold">{property.title}</h3>
          <div className="flex items-center text-gray-600 mt-2">
            <FaMapMarker className="mr-2 text-primary" />
            <p>{property.location}</p>
          </div>
        </div>
        <div>
          <span className="bg-primary text-white px-3 py-1 rounded-md">
            {property.type}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        <div className="flex items-center">
          <FaBed className="text-primary text-xl mr-2" />
          <div>
            <p className="font-bold">{property.beds}</p>
            <p className="text-gray-600 text-sm">Beds</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <FaBath className="text-primary text-xl mr-2" />
          <div>
            <p className="font-bold">{property.baths}</p>
            <p className="text-gray-600 text-sm">Baths</p>
          </div>
        </div>
        
        {property.squareFeet && (
          <div className="flex items-center">
            <FaRuler className="text-primary text-xl mr-2" />
            <div>
              <p className="font-bold">{property.squareFeet}</p>
              <p className="text-gray-600 text-sm">SqFt</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center">
          <FaClock className="text-primary text-xl mr-2" />
          <div>
            <p className="font-bold">{formatDate(property.createdAt)}</p>
            <p className="text-gray-600 text-sm">Listed</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Description</h3>
        <p className="text-gray-600 leading-7 whitespace-pre-wrap">{property.description}</p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Rental Rates</h3>
        <div className="bg-blue-50 p-4 rounded-md flex flex-col md:flex-row justify-around">
          <div className="text-center mb-4 md:mb-0">
            <p className="text-gray-600">Monthly</p>
            <p className="text-2xl font-bold text-primary">
              {formatPrice((property.rates as any).monthly)}
            </p>
          </div>
          
          {(property.rates as any).weekly && (
            <div className="text-center mb-4 md:mb-0">
              <p className="text-gray-600">Weekly</p>
              <p className="text-2xl font-bold text-primary">
                {formatPrice((property.rates as any).weekly)}
              </p>
            </div>
          )}
          
          {(property.rates as any).nightly && (
            <div className="text-center">
              <p className="text-gray-600">Nightly</p>
              <p className="text-2xl font-bold text-primary">
                {formatPrice((property.rates as any).nightly)}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {property.amenities.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Amenities</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {property.amenities.map((amenity, index) => (
              <li key={index} className="flex items-center">
                <FaTag className="text-primary mr-2" />
                {amenity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;