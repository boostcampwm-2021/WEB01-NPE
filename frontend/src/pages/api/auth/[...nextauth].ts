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
    async signIn(user, account, profile) {
      try {
        const { data } = await login(Number(account.id));
        if (!data) return false;
        user.accessToken = data.login;
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});
