import IOwner from "../../../entities/IOwner";
import IResponseStream from "../../../responses/IResponseStream";
import PrismaOwnerRepositorie from "../../../repositories/database/PrismaOwnerRepositorie";
import Sender from "../../../../core/VenomWhatsapp";


const prismaOwner = new PrismaOwnerRepositorie();
export const sender = new Sender()


export const createConnection = async (data: IOwner): Promise<IResponseStream> => {
    return new Promise(async (resolve, reject) => {
        // Criar a sessão Venom
        try {
            await sender.initialize()
            resolve({ status_code: 200, message: 'conexão iniciada!' })
        } catch (error: any) {
            reject({ status_code: 500, error: error.message })
        }


    })
}
