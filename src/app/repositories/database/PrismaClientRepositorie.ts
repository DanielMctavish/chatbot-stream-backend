import { PrismaClient } from "@prisma/client"
import IClient from "../../entities/IClient";
import IClientRepositorie from "../IClientRepositorie";
const prisma = new PrismaClient()

class PrismaClientRepositorie implements IClientRepositorie {
    async AddClient(data: IClient): Promise<IClient> {
        return await prisma.client.create({
            data: {
                avatar_url: data.avatar_url,
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                password: data.password
            }
        })
    }
    async DeleteClient(client_id: string): Promise<IClient> {
        return await prisma.client.delete({
            where: { id: client_id }
        })
    }
}

export default PrismaClientRepositorie