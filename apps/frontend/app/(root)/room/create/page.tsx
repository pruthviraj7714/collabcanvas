"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../../../../config/config";

export default function CreateRoomPage() {
  const [slug, setSlug] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BACKEND_URL}/room`,
        {
          slug,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      router.push("/home");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 via-white to-indigo-50 min-h-screen flex items-center justify-center p-4">
      <div className=" bg-[#a8a5ff] rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Create New Room
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="roomName"
              className="block text-sm font-medium text-white mb-1"
            >
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2  rounded-md focus:outline-none focus:ring-2 "
              placeholder="Enter room name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#6762f6] text-white py-2 px-4 rounded-md hover:bg-[#4d47f0] transition-colors duration-300"
          >
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}
