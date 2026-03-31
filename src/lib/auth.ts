import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const providers: NextAuthOptions['providers'] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
  }),
];

if (!process.env.GOOGLE_CLIENT_ID) {
  providers.push(
    CredentialsProvider({
      id: 'dev-bypass',
      name: 'Developer',
      credentials: {},
      authorize: () => ({ id: 'dev', name: 'Developer', email: 'dev@purple.ai' }),
    })
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  callbacks: {
    signIn: ({ account, profile }) => {
      if (account?.provider === 'dev-bypass') return true;
      return profile?.email?.endsWith('@purple.ai') ?? false;
    },
    session: ({ session }) => {
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};
