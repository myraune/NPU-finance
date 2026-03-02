import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";
import { isFounder, getFounderName } from "./founders";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // Allow any Google account to sign in
      const email = profile?.email;
      if (!email) return false;
      return true;
    },

    async jwt({ token, account, profile }) {
      // On first sign-in, upsert the user in our DB and attach role + id
      if (account && profile) {
        const email = profile.email as string;
        const googleId = profile.sub;
        const founder = isFounder(email);

        const user = await prisma.user.upsert({
          where: { email },
          update: {
            oauthId: googleId ?? undefined,
            name: founder ? getFounderName(email) : (profile.name ?? email),
          },
          create: {
            email,
            oauthId: googleId ?? null,
            name: founder ? getFounderName(email) : (profile.name ?? email),
            role: founder ? "ADMIN" : "MEMBER",
          },
        });

        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        (session.user as { id?: string; role?: string }).id = token.id as string;
        (session.user as { id?: string; role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
});
