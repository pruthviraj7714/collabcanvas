"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../../../../config/config";

export default function CreateRoomPage() {
  const [slug, setSlug] = useState("");
  const router = useRouter();
  const createRoom = async () => {
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
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col">
        <input
          onChange={(e) => setSlug(e.target.value)}
          type="text"
          placeholder="Enter slug"
        />
        <button onClick={createRoom}>Create Room</button>
      </div>
    </div>
  );
}
