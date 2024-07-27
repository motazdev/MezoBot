import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.

  {
    callbacks: {
      authorized: async ({ req }) => {
        if (
          req.cookies.get("next-auth.session-token")?.value ||
          req.cookies.get("__Secure-next-auth.session-token")?.value
        ) {
          return true;
        }
        return false;
      },
    },
  }
);

export const config = {
  matcher: ["/guild/:path*", "/dashboard"],
};
