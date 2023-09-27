import { PrismaClient } from "@prisma/client"
import IClient from "../../entities/IClient";
import IClientRepositorie from "../IClientRepositorie";
const prisma = new PrismaClient()

class PrismaClientRepositorie implements IClientRepositorie {
    async AddClient(data: IClient): Promise<IClient | null> {

        const currentNumber = await prisma.client.findFirst({
            where: { phone_number: data.phone_number }
        })

        if (currentNumber) {
            console.log('este número já foi adicionado');
            return null
        } else {
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

    }

    async FindByNumber(number: string): Promise<IClient | null> {
        return await prisma.client.findFirst({
            where: {
                phone_number: number
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