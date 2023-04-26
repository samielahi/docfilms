import Head from "next/head";
import Logo from "~/components/Logo";
import Button from "~/components/Button";
import Image from "next/image";
import Icon from "~/components/Icon";
import { useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { signIn } from "next-auth/react";

const SignInPage: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignIn() {
    // Report error if passing in empty fields
    if (!username.length || !password.length) {
      setError("Username or password cannot be empty.");
      return;
    }

    // Authenticate the credentials and redirect to home page on success
    const res = await signIn("credentials", {
      username: username,
      password: password,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    if (res?.error) {
      setUsername("");
      setPassword("");
      setError("Username or password is invalid.");
    }

    if (res?.url) void router.push(res.url);
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-between overflow-hidden bg-black pt-24 text-white">
        <div className="flow flex h-max w-fit flex-col items-center border-[1px] border-gray/20 p-10 md:w-[500px] md:p-12">
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
                if (error.length) {
                  setError("");
                }
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
                if (error.length) {
                  setError("");
                }
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-2">
            {error.length > 1 && (
              <>
                <Icon name="alert" />
                <span className="text-lg font-bold">{error}</span>
              </>
            )}
          </div>
          <Button onClick={handleSignIn}>
            <span>sign in</span>
          </Button>
        </div>
        <Image
          priority
          src={"/tickets.png"}
          width={1920}
          height={500}
          role="presentation"
          alt=""
        />
      </main>
    </>
  );
};

export default SignInPage;
