import IOwner from "../../../entities/IOwner";
import IResponseStream from "../../../responses/IResponseStream";
import PrismaOwnerRepositorie from "../../../repositories/database/PrismaOwnerRepositorie";
import venomConnect from "../../../../core/VenomWhatsapp";
const prismaOwner = new PrismaOwnerRepositorie()


export const desconnect = async (data: IOwner, owner_id: string): Promise<IResponseStream> => {
    //if (!data) return { status_code: 404, message: "nenhum corpo enviado" }

    try {

      



        // prismaOwner.Update(data, owner_id)
        return { status_code: 200, message: data }
    } catch (error: any) {
        return { status_code: 500, message: error.message }
    }
}