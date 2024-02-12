"use client";
import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { auth, database, ref, set } from "@/firebase";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");

  const [updateProfile, updating] = useUpdateProfile(auth);
  const router = useRouter();
  const [createUserWithEmailAndPassword, loading] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      await updateProfile({
        displayName: displayName,
      });
      // Save user information to Realtime Database
      set(ref(database, "users/" + res?.user?.uid), {
        username: displayName,
        email: email,
        password: password,
        signUpTime: new Date().toISOString(),
      });
      if (typeof window !== "undefined") {
        sessionStorage.setItem("user", "true");
        setEmail("");
        setPassword("");
        setDisplayName("");
        setPasswordAgain("");
        router.push("/");
      }
    } catch (e) {}
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto w-auto"
            src="/service.png"
            alt="Absolute IT"
            width={100}
            height={100}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Re-type Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="passwordAgain"
                  name="passwordAgain"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <Button
                disabled={
                  !email ||
                  !password ||
                  !passwordAgain ||
                  password !== passwordAgain
                }
                onClick={() => handleSignUp()}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                Sign Up
                {updating && loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin ml-2" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
