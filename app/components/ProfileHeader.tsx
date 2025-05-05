import React from 'react';
import Image from 'next/image';
import { FaUser, FaEnvelope, FaHome } from 'react-icons/fa';
import { SessionUser } from '../types';

interface ProfileHeaderProps {
  user: SessionUser;
  propertiesCount: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, propertiesCount }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || 'User'}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-400 text-4xl" />
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <FaEnvelope />
            <span>{user.email}</span>
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <FaHome />
            <span>{propertiesCount} {propertiesCount === 1 ? 'Property' : 'Properties'} Listed</span>
          </div>
          
          <div className="mt-4 py-2 px-4 bg-blue-50 rounded-lg text-blue-700">
            <p>Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;