import Link from "next/link";
import { fetchAllRooms } from "../../../actions/RoomActions";

export default async function Home() {
  const rooms = await fetchAllRooms();

  return (
    <div className="bg-slate-800 min-h-screen flex justify-center items-center">
      {rooms && rooms.length > 0 ? (
        <div className="grid grid-cols-4 gap-5">
          {rooms.map((r) => (
            <Link href={`/room/${r.id}`} key={r.id} className="h-20 w-20 bg-sky-400 flex justify-center items-center text-white">{r.slug}</Link>
          ))}
        </div>
      ) : (
        <div>No rooms created</div>
      )}
    </div>
  );
}
