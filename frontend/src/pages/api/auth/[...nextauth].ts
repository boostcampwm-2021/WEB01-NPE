import NextAuth from "next-auth";
import Provider from "next-auth/providers";
import sign from "jwt-encode";
import { registerIfNotExists } from "@src/lib";

export default NextAuth({
  providers: [
    Provider.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn(u, a, profile: Record<string, unknown>) {
      const userId = profile.id as number;
      const username = profile.login as string;
      const profileUrl = profile.avatar_url as string;
      const socialUrl = profile.html_url as string;

      await registerIfNotExists(userId, username, profileUrl, socialUrl);
      return true;
    },
    async session(session, user) {
      session.userId = Number(user.sub);
      session.accessToken = sign(
        session,
        process.env.NEXT_PUBLIC_JWT_KEY as string
      );

      return session;
    },
  },
});
