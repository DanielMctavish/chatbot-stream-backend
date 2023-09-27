import PrismaClientRepositorie from "../../../repositories/database/PrismaClientRepositorie"
import { ClientResponse } from "./AddClient"

const prismaClient = new PrismaClientRepositorie()

const findByNumber = async (number: string): Promise<ClientResponse> => {

    return new Promise(async (resolve, reject) => {
        try {

            const currentClient = await prismaClient.FindByNumber(number)
            if (currentClient)
                resolve({ status_code: 201, message: currentClient })
            
        } catch (error: any) {
            reject(error.message)
        }
    })
}

export default findByNumber