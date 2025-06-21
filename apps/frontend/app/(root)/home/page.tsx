import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { fetchAllRooms } from "../../../actions/RoomActions";
import RoomCard from "../../../components/RoomCard";

export default async function Home() {
  const rooms = await fetchAllRooms();

  return (
    <div
      className="bg-gradient-to-br from-purple-100 via-white to-indigo-50
 min-h-screen p-8 flex flex-col items-center"
    >
      <h1 className="text-5xl font-extrabold text-[#a8a5ff] mb-10 text-center tracking-wide drop-shadow-lg">
        CollabCanvas Rooms
      </h1>

      {rooms && rooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {rooms.map((room) => (
            <div key={room.id}>
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md">
          No rooms created yet. Be the first to create one!
        </div>
      )}

      <Link
        href="/room/create"
        className="fixed bottom-8 right-8  bg-[#a8a5ff] text-white p-4 px-6 rounded-full shadow-2xl flex items-center gap-2 
          hover:scale-110 hover:shadow-blue-500/50 transition-all duration-300"
      >
        <PlusCircle size={26} />
        <span className="font-medium text-lg">Create Room</span>
      </Link>
    </div>
  );
}
