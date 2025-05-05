'use client';

import React, { useState } from 'react';
import { FaShare, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Property } from '../types';

interface ShareButtonsProps {
  property: Property;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ property }) => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  
  const shareUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://propertypulse.com/properties/${property.id}`;
  
  const shareTitle = `Check out this property: ${property.title}`;
  
  const toggleShareMenu = () => {
    setIsShareMenuOpen(!isShareMenuOpen);
  };
  
  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard');
    setIsShareMenuOpen(false);
  };
  
  const shareSocial = (platform: string) => {
    let url: string;
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`;
        break;
      default:
        return;
    }
    
    window.open(url, '_blank');
    setIsShareMenuOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        onClick={toggleShareMenu}
        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
      >
        <FaShare className="text-primary" />
      </button>
      
      {isShareMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={copyLink}>
              Copy Link
            </li>
            <li 
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" 
              onClick={() => shareSocial('facebook')}
            >
              <FaFacebook className="mr-2 text-blue-600" /> Facebook
            </li>
            <li 
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" 
              onClick={() => shareSocial('twitter')}
            >
              <FaTwitter className="mr-2 text-blue-400" /> Twitter
            </li>
            <li 
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" 
              onClick={() => shareSocial('linkedin')}
            >
              <FaLinkedin className="mr-2 text-blue-700" /> LinkedIn
            </li>
            <li 
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" 
              onClick={() => shareSocial('whatsapp')}
            >
              <FaWhatsapp className="mr-2 text-green-500" /> WhatsApp
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;