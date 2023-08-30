import PrismaStreamOperations from "../../../repositories/database/PrismaStreamOperations";
import IResponseStream from "../../../responses/IResponseStream";
const prismaStream = new PrismaStreamOperations()

const findAllStreams = async (owner_id: string): Promise<IResponseStream> => {

    if (!owner_id) return { status_code: 404, message: "nenhum proprietário encontrado" }

    try {
        const currentStreams = await prismaStream.FindAll(owner_id)
        if (!currentStreams) return { status_code: 404, message: 'nenhum fluxo encontrado' }

        return { status_code: 200, message: currentStreams }
    } catch (error: any) {
        return { status_code: 500, message: error.message }
    }

}

export default findAllStreams