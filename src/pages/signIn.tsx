import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Footer from "~/components/Footer";
import Logo from "~/components/Logo";
import Button from "~/components/Button";
import { useState } from "react";
import type { NextPage } from "next";
import type { Session } from "next-auth";
import { useSession, signIn } from "next-auth/react";

const SignInPage: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="wrapper mt-[calc(100px_+_3rem)] flex h-full min-h-[70vh] justify-center bg-black text-white">
        <div className="flow mx-auto flex h-fit w-max flex-col items-center border-[1px] border-gray/20 p-12">
          <Logo size="small" />
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-bold">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="bg-gray px-4 py-2 text-black"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="bg-gray px-4 py-2 text-black"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Button
            onClick={() =>
              signIn("credentials", { username: username, password: password })
            }
          >
            <span>sign in</span>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SignInPage;
