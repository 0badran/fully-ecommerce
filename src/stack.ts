import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    home: "/",
    signIn: "/signin",
    signUp: "/signup",
    accountSettings: "/account",
    afterSignIn: "/account",
    afterSignOut: "/",
    afterSignUp: "/account",
    forgotPassword: "/forgot-password",
  },
});
