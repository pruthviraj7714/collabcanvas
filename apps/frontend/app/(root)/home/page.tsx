import Link from "next/link"
import { PlusCircle, Trash2 } from "lucide-react"
import { deleteRoom, fetchAllRooms } from "../../../actions/RoomActions"
import RoomCard from "../../../components/RoomCard"

export default async function Home() {
  const rooms = await fetchAllRooms()
  

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Excalidraw Rooms</h1>

        {rooms && rooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center text-white text-xl">No rooms created yet. Be the first to create one!</div>
        )}

        <Link
          href="/room/create"
          className="fixed bottom-8 right-8 bg-sky-500 text-white p-4 rounded-full shadow-lg hover:bg-sky-600 transition-colors duration-300 flex items-center"
        >
          <PlusCircle size={24} className="mr-2" />
          <span>Create Room</span>
        </Link>
      </div>
    </div>
  )
}

