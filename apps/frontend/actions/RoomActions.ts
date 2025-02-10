import prisma  from "@repo/db/client";


export async function fetchAllRooms() {
    try {
        const rooms = await prisma.room.findMany({});

        return rooms;
    } catch (error : any) {
        throw new Error(error.message);
    }
} 