import IOwner from "../../../entities/IOwner";
import IResponseStream from "../../../responses/IResponseStream";
import PrismaOwnerRepositorie from "../../../repositories/database/PrismaOwnerRepositorie";
const prismaOwner = new PrismaOwnerRepositorie()

export const createConnection = async (data: IOwner): Promise<IResponseStream> => {
    if (!data) return { status_code: 404, message: "nenhum corpo enviado" }

    try {
        await prismaOwner.Create(data)
        return { status_code: 200, message: data }
    } catch (error: any) {
        return { status_code: 500, message: error.message }
    }
}