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

        // const authResponse = await fetch("/signin", {
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
