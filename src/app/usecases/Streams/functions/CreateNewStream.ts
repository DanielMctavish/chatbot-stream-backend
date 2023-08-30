import IStreamChat from "../../../entities/IStreamChat";
import PrismaOwnerRepositorie from "../../../repositories/database/PrismaOwnerRepositorie";
import PrismaStreamOperations from "../../../repositories/database/PrismaStreamOperations";
import IResponseStream from "../../../responses/IResponseStream";
const prismaStream = new PrismaStreamOperations()
const prismaOwner = new PrismaOwnerRepositorie()


const createNewStream = async (data: IStreamChat): Promise<IResponseStream> => {
    if (!data) return { status_code: 404, message: "nenhum corpo retornado" }

    const currentOwner = await prismaOwner.Find(data.owner_id)
    if (!currentOwner) return { status_code: 404, message: "o usuário proprietário não existe" }

    try {
        await prismaStream.Create(data)
        return { status_code: 200, message: data }
    } catch (error: any) {
        return { status_code: 500, message: error.message }
    }


}

export default createNewStream