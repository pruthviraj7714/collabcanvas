import Link from "next/link";

export default function Landing() {
  return (
    <main className="bg-sky-300 flex justify-center items-center min-h-screen text-black">
      <Link href={"/signup"}>Go To Signup</Link>
    </main>
  );
}
