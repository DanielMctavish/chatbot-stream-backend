import IStreamChat from "../../../entities/IStreamChat";
import PrismaStreamOperations from "../../../repositories/database/PrismaStreamOperations";
import IResponseStream from "../../../responses/IResponseStream";
const prismaStream = new PrismaStreamOperations()


const updateStreamById = async (data: IStreamChat, stream_id: string): Promise<IResponseStream> => {

    if (!data) return { status_code: 404, message: "nenhum corpo enviado" }
    if (!stream_id) return { status_code: 404, message: "nenhum id enviado" }

    try {
        await prismaStream.Update(data, stream_id)
        return { status_code: 200, message: data }
    } catch (error: any) {
        return { status_code: 500, message: error.message }
    }


}

export default updateStreamById