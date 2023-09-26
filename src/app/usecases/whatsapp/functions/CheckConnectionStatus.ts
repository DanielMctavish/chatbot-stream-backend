import IOwner from "../../../entities/IOwner";
import IResponseStream from "../../../responses/IResponseStream";
import PrismaOwnerRepositorie from "../../../repositories/database/PrismaOwnerRepositorie";
import sender from "../../../../core/VenomWhatsapp";

const prismaOwner = new PrismaOwnerRepositorie()

export const checkConnectionStatus = (): Promise<IResponseStream> => {
    //if (!data) return { status_code: 404, message: "nenhum corpo enviado" }

    return new Promise(async (resolve, reject) => {
        const currentStatus = await sender.getStatusSession
        resolve({ status_code: 200, message: currentStatus })
    })

}