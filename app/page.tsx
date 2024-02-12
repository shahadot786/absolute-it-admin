"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");

  if (!user && !userSession) {
    router.push("/signin");
  }

  return (
    <div className="p-8">
      <div className="text-white">
        <Image
          className=""
          src="/avatar.png"
          alt="Avatar"
          width={50}
          height={50}
        />
        <p>Username: {user?.displayName}</p>
        <p>Email: {user?.email}</p>
      </div>
      <Button
        className="m-4"
        variant="destructive"
        onClick={() => {
          signOut(auth);
          sessionStorage.removeItem("user");
        }}
      >
        Log out
      </Button>
    </div>
  );
}
