'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const ProfileMenu: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  if (!session) return null;
  
  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border-2 border-primary"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            {session.user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-semibold">{session.user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
          </div>
          
          <Link 
            href="/profile" 
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <FaUser className="mr-2 text-primary" />
            My Profile
          </Link>
          
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;