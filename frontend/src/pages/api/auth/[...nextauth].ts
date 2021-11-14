import NextAuth from "next-auth";
import Provider from "next-auth/providers";
import { signToken } from "@src/lib/token";

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
        const sign = await (await signToken(account.id)).data;
        user.accessToken = sign.signToken;

        return true;
      } catch {
        return false;
      }
    },
  },
});
