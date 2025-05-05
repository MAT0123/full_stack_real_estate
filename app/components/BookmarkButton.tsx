'use client';

import React, { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface BookmarkButtonProps {
  propertyId: string;
  isBookmarked: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ propertyId, isBookmarked: initialIsBookmarked }) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleBookmarkClick = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, you would make a fetch request to your API
      // For demo purposes, we'll just toggle the state
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsBookmarked(!isBookmarked);
      
      if (!isBookmarked) {
        toast.success('Property added to bookmarks');
      } else {
        toast.success('Property removed from bookmarks');
      }
      
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Failed to update bookmark');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <button
      onClick={handleBookmarkClick}
      disabled={isLoading}
      className={`${
        isBookmarked 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-blue-500 hover:bg-blue-600'
      } text-white px-3 py-2 rounded-md focus:outline-none transition-colors`}
    >
      {isBookmarked ? (
        <>
          <FaBookmark className="inline mr-2" />
          Saved
        </>
      ) : (
        <>
          <FaRegBookmark className="inline mr-2" />
          Save
        </>
      )}
    </button>
  );
};

export default BookmarkButton;