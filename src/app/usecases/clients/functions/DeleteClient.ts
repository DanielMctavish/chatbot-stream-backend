import PrismaClientRepositorie from "../../../repositories/database/PrismaClientRepositorie";
import { ClientResponse } from "./AddClient";
const prismaClient = new PrismaClientRepositorie()

const deleteClient = async (client_id: string): Promise<ClientResponse> => {

    return new Promise(async (resolve, reject) => {
        try {
            const deletedClient = await prismaClient.DeleteClient(client_id)
            resolve({ status_code: 201, message: deletedClient })
        } catch (error: any) {
            reject({ status_code: 500, message: error.message })
        }
    })

}


export default deleteClient