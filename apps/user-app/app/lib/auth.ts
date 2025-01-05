import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { NextAuthOptions } from "next-auth";
import { z } from "zod";

// zod schema for validation
const CredentialsSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone Number must be at least 10 digits")
    .max(15, "Phone Number must be at most 15 digits"),
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// next auth config
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@gmail.com",
          required: true,
        },
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },

      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        // validate credentials using zod
        const parsedCredentials = CredentialsSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error("Invalid Credentials");
        }

        const { email, phone, password } = parsedCredentials.data;

        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            email,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              phone: existingUser.number,
              email: existingUser.email,
            };
          }
          return null;
        } else {
          try {
            const user = await db.user.create({
              data: {
                email: email,
                number: phone,
                password: hashedPassword,
              },
            });

            return {
              id: user.id.toString(),
              name: user.name,
              email: user.number,
            };
          } catch (e) {
            console.error(e);
          }
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // Manage session callback
    async session({ token, session }: { token: JWT; session: Session }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};
