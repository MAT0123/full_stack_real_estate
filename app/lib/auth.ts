import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/db';
import { NextAuthOptions } from 'next-auth';
import { SessionUser } from '../types';
import { JWT } from 'next-auth/jwt';

interface CustomToken extends JWT {
    id?: string;
  }
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Check for email and password
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Check if user exists
        if (!user || !user.hashedPassword) {
          return null;
        }

        // Check if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
        // Pass id to token when signing in
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        // Pass id to session
        if (session.user) {
            // Type assertion for the token and safe assignment
            const tokenId = (token as CustomToken).id;
            if (tokenId) {
              (session.user as SessionUser).id = tokenId;
            }
          }
          return session;
      },
  },
};