import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "librarian@docfilms.org",
        },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (
          credentials?.username === "sami" &&
          credentials.password === "password"
        ) {
          return user;
        } else {
          return null;
        }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
        // const authResponse = await fetch("/users/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(credentials),
        // });

        // if (!authResponse.ok) {
        //   return null;
        // }

        // const user = await authResponse.json();

        // return user;
      },
    }),
  ],
});
