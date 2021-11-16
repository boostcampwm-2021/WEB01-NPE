import NextAuth from "next-auth";
import Provider from "next-auth/providers";
import { getUserIdByUsername, login } from "@src/lib";

export default NextAuth({
  providers: [
    Provider.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    // async signIn(user) {
    //   try {
    //     if (!user) return false;
    //     return true;
    //   } catch {
    //     return false;
    //   }
    // },
    async session(session, user) {
      session.userId = Number(user.sub);
      return session;
    },
  },
});
