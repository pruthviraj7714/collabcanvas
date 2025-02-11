'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
<div className="flex items-center bg-[#a8a5ff] justify-between p-6">
      <Link href={"/home"}>Excalidraw</Link>
      <div className="flex items-center gap-2">
        <Link href={"/room/create"}>
          <button>Create Room</button>
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("userId"),
              localStorage.removeItem("userToken");
              router.push('/');
          }}
          className="bg-red-500 px-6 py-2 rounded-xl"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
