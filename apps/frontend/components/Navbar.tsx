import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center bg-[#a8a5ff] justify-between p-6">
      <Link href={"/home"}>Excalidraw</Link>
      <div>
        <Link href={"/room/create"}>
          <button>Create Room</button>
        </Link>
      </div>
    </div>
  );
}
