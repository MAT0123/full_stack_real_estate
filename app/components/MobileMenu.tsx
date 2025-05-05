'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { FaUser, FaSignOutAlt, FaHome, FaList, FaPlus } from 'react-icons/fa';
import { Session } from 'next-auth';

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string | null;
  session: Session | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, pathname, session }) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-white shadow-lg p-4 absolute top-full left-0 w-full">
      <div className="flex flex-col space-y-4">
        <MobileNavLink href="/" pathname={pathname} icon={<FaHome />}>Home</MobileNavLink>
        <MobileNavLink href="/properties" pathname={pathname} icon={<FaList />}>Properties</MobileNavLink>
        
        {session ? (
          <>
            <MobileNavLink href="/add-property" pathname={pathname} icon={<FaPlus />}>Add Property</MobileNavLink>
            <MobileNavLink href="/profile" pathname={pathname} icon={<FaUser />}>Profile</MobileNavLink>
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center text-red-500 px-4 py-2 rounded-md hover:bg-red-50"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="px-4 py-2 rounded-md hover:bg-gray-100">
              Login
            </Link>
            <Link href="/register" className="bg-primary text-white px-4 py-2 rounded-md">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

interface MobileNavLinkProps {
  href: string;
  pathname: string | null;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, pathname, children, icon }) => {
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href} 
      className={`flex items-center px-4 py-2 rounded-md ${
        isActive 
          ? 'bg-primary/10 text-primary font-medium' 
          : 'hover:bg-gray-100'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </Link>
  );
};

export default MobileMenu;