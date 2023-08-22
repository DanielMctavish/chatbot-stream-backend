import IOwner from "../../../entities/IOwner";
import IResponseStream from "../../../responses/IResponseStream";
import PrismaOwnerRepositorie from "../../../repositories/database/PrismaOwnerRepositorie";
import venomConnect from "../../../../core/VenomWhatsapp";
const prismaOwner = new PrismaOwnerRepositorie()


export const checkConnectionStatus = async (): Promise<IResponseStream> => {
    //if (!data) return { status_code: 404, message: "nenhum corpo enviado" }

    try {

        await venomConnect.connect({
            session: 'teste-whatasapp bot'
        }).then((client: any) => {
            console.log(client);
        })

        return { status_code: 200, message: 'ok' }

        // prismaOwner.Update(data, owner_id)
    } catch (error: any) {
        return { status_code: 500, message: error.message }
    }
}