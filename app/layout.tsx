import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthProvider from './components/AuthProvider';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Find The Perfect Rental',
  description:
    'Find your dream rental property. PropertyPulse offers a variety of properties for every need',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={poppins.className}>
      <AuthProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ToastContainer />
      </AuthProvider>
    </body>
  </html>
  );
}
