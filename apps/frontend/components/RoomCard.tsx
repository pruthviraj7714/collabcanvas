"use client";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RoomCard = ({ room }: { room: any }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const userId = localStorage.getItem("userId");
  const deleteRoom = async () => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/room/delete/${room.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      toast.success(res.data.message);
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message || "Error while deleting room");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="group">
      <div className="bg-[#a8a5ff] rounded-lg p-6 transition-all h-32 w-56 duration-300 transform hover:scale-105 hover:shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-white mb-5 truncate">
            {room.slug}
          </h2>
          {room.adminId === userId && (
           <Trash2
           onClick={(e) => {
             e.preventDefault();
             setIsDeleteDialogOpen(true);
           }}
           className="w-5 h-5 text-red-500 hover:text-red-600 transition-all cursor-pointer"
         />
          )}
        </div>
        <Link
          href={`/room/${room.id}`}
          className="mt-4 text-white transition-colors duration-300"
        >
          Join Room →
        </Link>
      </div>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              room and remove all data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#a8a5ff] hover:bg-[#9491f1]"
              onClick={deleteRoom}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RoomCard;
