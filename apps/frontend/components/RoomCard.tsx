"use client";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/config";

const RoomCard = ({ room }: { room: any }) => {
  const deleteRoom = async (e :any) => {
e.preventDefault();
    try {
      await axios.delete(`${BACKEND_URL}/room/delete/${room.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Link href={`/room/${room.id}`} key={room.id} className="group">
      <div className="bg-slate-700 rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-white mb-2 truncate">
            {room.slug}
          </h2>
          <Trash2
            onClick={deleteRoom}
            className="text-red-400 cursor-pointer"
          />
        </div>
        <div className="mt-4 text-sky-400 group-hover:text-sky-300 transition-colors duration-300">
          Join Room →
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
