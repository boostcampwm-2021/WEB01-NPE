import NextAuth from "next-auth";
import Provider from "next-auth/providers";

export default NextAuth({
  providers: [
    Provider.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session(session, user) {
      session.userId = Number(user.sub);

      return session;
    },
  },
});
