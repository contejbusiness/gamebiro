import User from "@/schemas/user";
import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.records = sessionUser.record;
      session.user.balance = sessionUser.balance;
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        let userExists = await User.findOne({ email: profile.email });
        console.log(
          "🚀 ~ file: route.js:27 ~ signIn ~ userExists:",
          userExists
        );

        if (!userExists) {
          await User.create({
            email: profile.email,
            balance: 0,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
