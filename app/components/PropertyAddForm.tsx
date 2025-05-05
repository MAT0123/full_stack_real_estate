'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast , ToastContainer } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

interface PropertyFormData {
  title: string;
  description: string;
  location: string;
  type: string;
  beds: number;
  baths: number;
  squareFeet: number;
  amenities: string[];
  rates: {
    monthly: number;
    weekly: number;
    nightly: number;
  };
  images: string[];
}

const PropertyAddForm: React.FC = () => {
  const router = useRouter();
  
  const [fields, setFields] = useState<PropertyFormData>({
    title: '',
    description: '',
    location: '',
    type: 'Apartment',
    beds: 1,
    baths: 1,
    squareFeet: 0,
    amenities: [],
    rates: {
      monthly: 0,
      weekly: 0,
      nightly: 0
    },
    images: []
  });
  
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested fields (rates)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFields((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof PropertyFormData] as Record<string, any>,
          [child]: Number(value)
        }
      }));
    } else {
      setFields((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    // Add or remove from amenities array
    if (checked) {
      setFields((prev) => ({
        ...prev,
        amenities: [...prev.amenities, value]
      }));
    } else {
      setFields((prev) => ({
        ...prev,
        amenities: prev.amenities.filter((amenity) => amenity !== value)
      }));
    }
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (!files || files.length === 0) return;
    
    const fileArray = Array.from(files);
    
    if (fields.images.length + fileArray.length > 5) {
      toast.error('You can only upload up to 5 images');
      return;
    }
    
    setUploading(true);
    
    // In a real app, you'd upload to Cloudinary or similar
    // For demo, we'll simulate the upload
    setTimeout(() => {
      // Create fake image URLs
      const newImages = fileArray.map((file, index) => 
        `/images/properties/property-${Date.now()}-${index}.jpg`
      );
      
      // Update state with new images
      setFields((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
      
      setUploading(false);
      toast.success('Images uploaded successfully');
    }, 1500);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate
    if (!fields.title || !fields.description || !fields.location) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (fields.images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you'd send this to your API
      // For demo, just simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success('Property added successfully');
      router.push('/profile');
      
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setIsSubmitting(false);
    }
  };
  
  const removeImage = (indexToRemove: number) => {
    setFields((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center text-primary hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>
      
      <h2 className="text-2xl font-semibold mb-6">Add New Property</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={fields.title}
          onChange={handleChange}
          placeholder="e.g. Beautiful Apartment In Downtown"
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={fields.description}
          onChange={handleChange}
          rows={6}
          placeholder="Add an informative description of the property"
          className="border rounded w-full py-2 px-3"
          required
        ></textarea>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="location">
          Location <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={fields.location}
          onChange={handleChange}
          placeholder="e.g. 123 Main St, New York, NY 10030"
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="type">
            Property Type <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            name="type"
            value={fields.type}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required
          >
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Studio">Studio</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="squareFeet">
            Square Feet
          </label>
          <input
            type="number"
            id="squareFeet"
            name="squareFeet"
            value={fields.squareFeet}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="beds">
            Beds <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="beds"
            name="beds"
            value={fields.beds}
            onChange={handleChange}
            min="1"
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="baths">
            Baths <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="baths"
            name="baths"
            value={fields.baths}
            onChange={handleChange}
            min="1"
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
      </div>
      
      <div className="mb-4">
        <span className="block text-gray-700 font-bold mb-2">
          Rates <span className="text-red-500">*</span>
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="rates.monthly" className="block text-gray-700 mb-1">
              Monthly
            </label>
            <input
              type="number"
              id="rates.monthly"
              name="rates.monthly"
              value={fields.rates.monthly}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          
          <div>
            <label htmlFor="rates.weekly" className="block text-gray-700 mb-1">
              Weekly
            </label>
            <input
              type="number"
              id="rates.weekly"
              name="rates.weekly"
              value={fields.rates.weekly}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          
          <div>
            <label htmlFor="rates.nightly" className="block text-gray-700 mb-1">
              Nightly
            </label>
            <input
              type="number"
              id="rates.nightly"
              name="rates.nightly"
              value={fields.rates.nightly}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <span className="block text-gray-700 font-bold mb-2">Amenities</span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Wifi"
                checked={fields.amenities.includes('Wifi')}
                onChange={handleAmenitiesChange}
                className="mr-2"
              />
              Wifi
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Full Kitchen"
                checked={fields.amenities.includes('Full Kitchen')}
                onChange={handleAmenitiesChange}
                className="mr-2"
              />
              Full Kitchen
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Washer & Dryer"
                checked={fields.amenities.includes('Washer & Dryer')}
                onChange={handleAmenitiesChange}
                className="mr-2"
              />
              Washer & Dryer
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Free Parking"
                checked={fields.amenities.includes('Free Parking')}
                onChange={handleAmenitiesChange}
                className="mr-2"
              />
              Free Parking
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Swimming Pool"
                checked={fields.amenities.includes('Swimming Pool')}
                onChange={handleAmenitiesChange}
                className="mr-2"
              />
              Swimming Pool
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Hot Tub"
                checked={fields.amenities.includes('Hot Tub')}
                onChange={handleAmenitiesChange}
                className="mr-2"
              />
              Hot Tub
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Gym/Fitness Center"
                checked={fields.amenities.includes('Gym/Fitness Center')}
                onChange={handleAmenitiesChange}
                className="mr-2"
              />
              Gym/Fitness
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Balcony/Patio"
                checked={fields.amenities.includes('Balcony/Patio')}
                onChange={handleAmenitiesChange}
                className="mr-2"
              />
              Balcony/Patio
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Security System"
                checked={fields.amenities.includes('Security System')}
                onChange={handleAmenitiesChange}
                className="mr-2"
              />
              Security System
            </label>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">
          Images <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          id="images"
          onChange={handleImageUpload}
          accept="image/*"
          multiple
          className="border rounded w-full py-2 px-3"
          disabled={uploading || fields.images.length >= 5}
        />
        <p className="text-gray-500 text-sm mt-2">
          You can upload up to 5 images. Recommended size: 1200x800px
        </p>
        
        {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
        
        {fields.images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {fields.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="rounded-md h-24 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition rounded-md"
                >
                  <span className="text-white font-bold">Remove</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isSubmitting || uploading}
          className="bg-primary text-white py-2 px-4 rounded-md w-full hover:bg-secondary transition"
        >
          {isSubmitting ? 'Submitting...' : 'Add Property'}
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default PropertyAddForm;