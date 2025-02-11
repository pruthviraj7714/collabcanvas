import prisma  from "@repo/db/client";


export async function fetchAllRooms() {
    try {
        const rooms = await prisma.room.findMany({});

        return rooms;
    } catch (error : any) {
        throw new Error(error.message);
    }
} 

export async function fetchRoomPrevShapes(roomId : string) {
    try {
        const shapes = await prisma.shape.findMany({
            where : {
                roomId
            },
        })

        return shapes;
    } catch (error : any) {
        throw new Error(error.message);
    }
}

export async function deleteRoom(roomId : string, userId : string) {
    try {
        await prisma.room.delete({
            where : {
                id : roomId,
                adminId : userId
            }
        })
    } catch (error : any) {
        throw new Error(error.message);
    }
}