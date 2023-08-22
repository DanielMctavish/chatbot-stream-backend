import { PrismaClient } from "@prisma/client"
import IOwner from "../../entities/IOwner";
import IOwnerRepositorie from "../IOwnerRepositorie";
const prisma = new PrismaClient()

class PrismaOwnerRepositorie implements IOwnerRepositorie {
    async Create(data: IOwner): Promise<IOwner> {
        return await prisma.owner.create({
            data
        })
    }
    async Find(stream_id?: string | undefined): Promise<IOwner | null> {
        return await prisma.owner.findFirst({
            where: { id: stream_id }
        })
    }
    async Update(data: Partial<IOwner>, stream_id: string): Promise<IOwner | null> {
        return await prisma.owner.update({
            where: { id: stream_id },
            data
        })
    }
    async Delete(stream_id: string): Promise<IOwner | null> {
        return await prisma.owner.delete({
            where: { id: stream_id }
        })
    }
}


export default PrismaOwnerRepositorie