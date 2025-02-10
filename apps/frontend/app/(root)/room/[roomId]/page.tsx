import CanvasPage from "../../../../components/CanvasPage";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const roomId = (await params).roomId;
  return (
    <div>
      <CanvasPage roomId={roomId} />
    </div>
  );
}
