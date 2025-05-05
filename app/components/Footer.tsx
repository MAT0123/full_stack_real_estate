const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PropertyPulse</h3>
              <p className="mb-4">
                Making property search easy and efficient. Find your dream home with PropertyPulse.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-primary transition">Home</a></li>
                <li><a href="/properties" className="hover:text-primary transition">Properties</a></li>
                <li><a href="/login" className="hover:text-primary transition">Login</a></li>
                <li><a href="/register" className="hover:text-primary transition">Register</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Property Types</h3>
              <ul className="space-y-2">
                <li><a href="/properties?propertyType=Apartment" className="hover:text-primary transition">Apartments</a></li>
                <li><a href="/properties?propertyType=House" className="hover:text-primary transition">Houses</a></li>
                <li><a href="/properties?propertyType=Condo" className="hover:text-primary transition">Condos</a></li>
                <li><a href="/properties?propertyType=Studio" className="hover:text-primary transition">Studios</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="mb-2">100 Dawlish Avenue</p>
              <p className="mb-2">Toronto , Ontario</p>
              <p className="mb-2"> <a href="mailto:matthewaureliustjoa@gmail.com">Email:  matthewaureliustjoa@gmail.com</a></p>
              <p>Phone: (647) 7409186</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p>&copy; {currentYear} PropertyPulse. All rights reserved .</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;