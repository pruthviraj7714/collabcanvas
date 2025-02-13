"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="flex items-center bg-[#a8a5ff] justify-between p-5">
      <Link href={'/home'} className="flex items-center space-x-2 cursor-pointer">
        <Image
          src="https://i.pinimg.com/736x/f7/2f/18/f72f18067b09f0c0d40172346ff0edd2.jpg"
          alt="CollabCanvas Logo"
          className="rounded-xl"
          width={40}
          height={40}
        />
        <span className="text-xl font-bold">CollabCanvas</span>
      </Link>
      <div className="">
        <button
          onClick={() => {
            localStorage.removeItem("userId"),
              localStorage.removeItem("userToken");
            router.push("/");
          }}
          className="bg-red-500 text-white px-6 py-2 rounded-xl"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
