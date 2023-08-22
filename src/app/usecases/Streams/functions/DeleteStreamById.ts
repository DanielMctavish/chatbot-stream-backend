import PrismaStreamOperations from "../../../repositories/database/PrismaStreamOperations";
import IResponseStream from "../../../responses/IResponseStream";
const prismaStream = new PrismaStreamOperations()


const deleteStreamById = async (stream_id: string): Promise<IResponseStream> => {

    if (!stream_id) return { status_code: 404, message: "nenhum id passado" }

    try {
        const currentStream = await prismaStream.Find(stream_id)
        if (!currentStream) return { status_code: 404, message: 'nenhum fluxo encontrado' }
        return { status_code: 200, message: currentStream }
    } catch (error: any) {
        return { status_code: 500, message: error.message }
    }


}

export default deleteStreamById



