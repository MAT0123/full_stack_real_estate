'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import ProfileMenu from './ProfileMenu';
import MobileMenu from './MobileMenu';

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-10 transition-all ${
      scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <FaHome className="text-primary text-3xl mr-2" />
          <span className={`text-xl font-bold ${scrolled ? 'text-gray-800' : 'text-white'}`}>
            PropertyPulse
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <NavLink href="/" pathname={pathname} scrolled={scrolled}>Home</NavLink>
          <NavLink href="/properties" pathname={pathname} scrolled={scrolled}>Properties</NavLink>
          
          {session ? (
            <>
              <NavLink href="/add-property" pathname={pathname} scrolled={scrolled}>Add Property</NavLink>
              <ProfileMenu />
            </>
          ) : (
            <div className='space-x-8 flex items-center '>
                <div>
                <NavLink href="/login" pathname={pathname} scrolled={scrolled}>Login</NavLink>
                </div>
             
              <div>
              <NavLink 
                href="/register" 
                pathname={pathname} scrolled={scrolled}
                
              >
                
                Register
              </NavLink>
            </div>
              
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-primary focus:outline-none"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} pathname={pathname} session={session} />
    </nav>
  );
};

// Navigation Link component
interface NavLinkProps {
  href: string;
  pathname: string | null;
  children: React.ReactNode;
  scrolled: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, pathname, children, scrolled }) => {
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href} 
      className={`${
        isActive 
          ? 'text-primary font-semibold' 
          : scrolled 
            ? 'text-gray-800 hover:text-primary' 
            : 'text-white hover:text-primary'
      } transition-colors`}
    >
      {children}
    </Link>
  );
};

export default Navbar;