import NextAuth from "next-auth/next";
import EmailProvider from "next-auth/providers/email";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const fbID = process.env.FACEBOOK_ID || "";
const fbSecret = process.env.FACEBOOK_SECRET || "";
const googleID = process.env.GOOGLE_ID || "";
const googleSecret = process.env.GOOGLE_SECRET || "";
const githubID = process.env.GITHUB_ID || "";
const githubSecret = process.env.GITHUB_SECRET || "";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: true,
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL_SERVER_USER,
          serviceClient: process.env.EMAIL_SERVER_CLIENT,
          privateKey: process.env.EMAIL_SERVER_PRIVATE_KEY,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    FacebookProvider({
      clientId: fbID,
      clientSecret: fbSecret,
    }),
    GoogleProvider({
      clientId: googleID,
      clientSecret: googleSecret,
    }),
    GitHubProvider({
      clientId: githubID,
      clientSecret: githubSecret,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.JWT_SECRET,
});
