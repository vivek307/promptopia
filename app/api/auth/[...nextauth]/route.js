import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { connectionToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      }).lean()

      session.user.id = sessionUser._id.toString()

      return session
    },
    async signIn({ profile }) {
      try {
        await connectionToDB()

        // Check if user already exists
        const userExists = await User.findOne({ email: profile.email }).lean()

        if (!userExists) {
          await User.create({
            email: profile.email,
            userName: profile.name.replace(" ", ""),
            image: profile.picture
          })
        }

        return true
      } catch (error) {
        console.log(error);
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }