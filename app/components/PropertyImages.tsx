'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface PropertyImagesProps {
  images: string[];
}

const PropertyImages: React.FC<PropertyImagesProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0] || '/images/property-default.jpg');
  
  return (
    <div className="mb-8">
      <div className="mb-4 bg-gray-200 rounded-lg overflow-hidden">
        <Image 
          src={mainImage} 
          alt="Property" 
          width={1200} 
          height={800}
          className="object-cover w-full h-[500px]"
          priority={true}
        />
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`cursor-pointer rounded-md overflow-hidden ${
              image === mainImage ? 'border-2 border-primary' : ''
            }`}
            onClick={() => setMainImage(image)}
          >
            <Image 
              src={image} 
              alt={`Property thumbnail ${index + 1}`}
              width={200}
              height={150}
              className="object-cover w-full h-24"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyImages;