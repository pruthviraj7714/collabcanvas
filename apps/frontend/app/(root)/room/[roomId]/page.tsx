import { fetchRoomPrevShapes } from "../../../../actions/RoomActions";
import CanvasPage from "../../../../components/CanvasPage";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const roomId = (await params).roomId;
  const shapes = await fetchRoomPrevShapes(roomId);

  return (
    <div>
      <CanvasPage roomId={roomId} shapes={shapes}/>
    </div>
  );
}
