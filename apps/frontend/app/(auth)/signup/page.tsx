"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const SignUpPage = () => {
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      await axios.post(`${BACKEND_URL}/user/signup`, data);

      router.push('/login')      
    } catch (error: any) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <input type="text" name="email" placeholder="Enter email" className="border p-2 text-black" />
        <input type="text" name="username" placeholder="Enter username" className="border p-2 text-black" />
        <input type="password" name="password" placeholder="Enter password" className="border p-2 text-black" />
        <button type="submit" className="bg-blue-500 text-white p-2">Signup</button>
      </form>
    </div>
  );
};

export default SignUpPage;
