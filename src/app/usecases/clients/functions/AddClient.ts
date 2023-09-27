import IClient from "../../../entities/IClient";
import PrismaClientRepositorie from "../../../repositories/database/PrismaClientRepositorie";
const prismaClient = new PrismaClientRepositorie()

export interface ClientResponse {
    status_code: number
    message: string | object
}

const addClient = async (data: IClient): Promise<ClientResponse> => {

    return new Promise(async (resolve, reject) => {
        try {

            const currentNewClient = await prismaClient.AddClient(data)
            if (currentNewClient)
                resolve({ status_code: 201, message: currentNewClient })

        } catch (error: any) {
            //console.log('obs error addClient --> ', error);
            reject({ status_code: 500, message: error.message })
        }
    })

}


export default addClient