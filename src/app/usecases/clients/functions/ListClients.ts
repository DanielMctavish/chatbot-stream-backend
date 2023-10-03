import IClient from "../../../entities/IClient"
import PrismaClientRepositorie from "../../../repositories/database/PrismaClientRepositorie"
import { ClientResponse } from "./AddClient"
const prismaClient = new PrismaClientRepositorie()

const listClients = async (): Promise<ClientResponse> => {

    return new Promise(async (resolve, reject) => {
        try {

            const currentClients = await prismaClient.FindAll()
            console.log('dentro do client find -->', currentClients);

            resolve({ status_code: 200, message: currentClients })

        } catch (error: object | any) {
            reject({ status_code: 500, message: error.message })
        }
    })

}

export default listClients