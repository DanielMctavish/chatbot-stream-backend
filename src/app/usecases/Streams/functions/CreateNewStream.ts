import IStreamChat from "../../../entities/IStreamChat";
import PrismaStreamOperations from "../../../repositories/database/PrismaStreamOperations";
import IResponseStream from "../../../responses/IResponseStream";
const prismaStream = new PrismaStreamOperations()


const createNewStream = async (data: IStreamChat): Promise<IResponseStream> => {

    if (!data) return { status_code: 404, message: "nenhum corpo retornado" }

    try {
        await prismaStream.Create(data)
        return { status_code: 200, message: data }
    } catch (error: any) {
        return { status_code: 500, message: error.message }
    }


}

export default createNewStream