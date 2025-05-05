// prisma/seed.ts
import { PrismaClient } from '../app/generated/prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.bookmark.deleteMany({});
  await prisma.property.deleteMany({});
  await prisma.user.deleteMany({});

  // Create users
  const password = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      hashedPassword: password,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      hashedPassword: password,
    },
  });

  console.log('Created users:', { user1, user2 });

  // Create properties
  const property1 = await prisma.property.create({
    data: {
      userId: user1.id,
      title: 'Modern Downtown Apartment',
      description: 'A beautiful modern apartment in the heart of downtown. Features include stainless steel appliances, hardwood floors, and a balcony with city views.',
      location: '123 Main St, New York, NY 10001',
      type: 'Apartment',
      squareFeet: 850,
      beds: 2,
      baths: 2,
      rates: {
        monthly: 2500,
        weekly: 700,
        nightly: 150
      },
      amenities: ['Wifi', 'Full Kitchen', 'Washer & Dryer', 'Free Parking', 'Gym/Fitness Center', 'Balcony/Patio'],
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'
      ],
      featured: true,
    },
  });

  const property2 = await prisma.property.create({
    data: {
      userId: user1.id,
      title: 'Cozy Studio in Brooklyn',
      description: 'Charming and comfortable studio apartment in a trendy Brooklyn neighborhood. Perfect for single travelers or couples.',
      location: '456 Park Ave, Brooklyn, NY 11215',
      type: 'Studio',
      squareFeet: 500,
      beds: 1,
      baths: 1,
      rates: {
        monthly: 1800,
        weekly: 500,
        nightly: 120
      },
      amenities: ['Wifi', 'Full Kitchen', 'Free Parking'],
      images: [
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0',
        'https://images.unsplash.com/photo-1560185127-6ed189bf02f4'
      ],
      featured: false,
    },
  });

  const property3 = await prisma.property.create({
    data: {
      userId: user2.id,
      title: 'Luxury Condo with Ocean View',
      description: 'Stunning luxury condo with breathtaking ocean views. High-end finishes throughout, gourmet kitchen, and private terrace.',
      location: '789 Ocean Dr, Miami, FL 33139',
      type: 'Condo',
      squareFeet: 1200,
      beds: 3,
      baths: 2,
      rates: {
        monthly: 3500,
        weekly: 900,
        nightly: 200
      },
      amenities: ['Wifi', 'Full Kitchen', 'Washer & Dryer', 'Swimming Pool', 'Hot Tub', 'Balcony/Patio', 'Free Parking', 'Security System'],
      images: [
        'https://images.unsplash.com/photo-1565182999561-f05dd7aefa5c',
        'https://images.unsplash.com/photo-1440778303588-435521a205bc',
        'https://images.unsplash.com/photo-1560185007-5f0bb1866cab'
      ],
      featured: true,
    },
  });

  const property4 = await prisma.property.create({
    data: {
      userId: user2.id,
      title: 'Suburban Family Home',
      description: 'Spacious family home in a quiet suburban neighborhood. Large backyard, modern kitchen, and close to schools and parks.',
      location: '101 Oak St, Austin, TX 78701',
      type: 'House',
      squareFeet: 2000,
      beds: 4,
      baths: 3,
      rates: {
        monthly: 3000,
        weekly: 800,
        nightly: 180
      },
      amenities: ['Wifi', 'Full Kitchen', 'Washer & Dryer', 'Free Parking', 'Balcony/Patio'],
      images: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be'
      ],
      featured: false,
    },
  });

  const property5 = await prisma.property.create({
    data: {
      userId: user1.id,
      title: 'Chic Loft in SoHo',
      description: 'Industrial-chic loft in the heart of SoHo. High ceilings, exposed brick, and designer furnishings.',
      location: '555 Broadway, New York, NY 10012',
      type: 'Loft',
      squareFeet: 1100,
      beds: 2,
      baths: 2,
      rates: {
        monthly: 4000,
        weekly: 1100,
        nightly: 250
      },
      amenities: ['Wifi', 'Full Kitchen', 'Washer & Dryer', 'Security System'],
      images: [
        'https://images.unsplash.com/photo-1536376072261-38c75010e6c9',
        'https://images.unsplash.com/photo-1560448204-61dc36dc98c8'
      ],
      featured: true,
    },
  });

  console.log('Created properties:', { property1, property2, property3, property4, property5 });

  // Create bookmarks
  const bookmark1 = await prisma.bookmark.create({
    data: {
      userId: user1.id,
      propertyId: property3.id,
    },
  });

  const bookmark2 = await prisma.bookmark.create({
    data: {
      userId: user2.id,
      propertyId: property1.id,
    },
  });

  const bookmark3 = await prisma.bookmark.create({
    data: {
      userId: user2.id,
      propertyId: property5.id,
    },
  });

  console.log('Created bookmarks:', { bookmark1, bookmark2, bookmark3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });