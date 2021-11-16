import NextAuth from "next-auth";
import Provider from "next-auth/providers";
import { login } from "@src/lib";

export default NextAuth({
  providers: [
    Provider.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account) {
      try {
        if (!user) return false;
        const { data } = await login(
          Number(account.id),
          user.name as string,
          user.image as string,
          `https://github.com/${user.name}`
        );
        if (!data) return false;
        user.accessToken = data.login;
        return true;
      } catch {
        return false;
      }
    },
    async jwt(token, user) {
      if (user) token.accessToken = user.accessToken;
      return token;
    },
    async session(session, user) {
      if (user) session.accessToken = user.accessToken;
      return session;
    },
  },
});
