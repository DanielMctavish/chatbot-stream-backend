import PrismaStreamOperations from "../../../repositories/database/PrismaStreamOperations";
import IResponseStream from "../../../responses/IResponseStream";
import { sender } from "./CreateConnection";

const prismaStream = new PrismaStreamOperations()

const selectStream = (stream_id: string): Promise<IResponseStream> => {

    return new Promise(async (resolve, reject) => {
        try {

            const selectedStream = await prismaStream.Find(stream_id)
            await sender.setStream(selectedStream)

            resolve({ status_code: 200, message: selectedStream })

        } catch (error: any) {
            reject({ status_code: 500, error: error.message })
        }
    })

}

export default selectStream