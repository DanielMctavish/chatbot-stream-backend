import IStreamChat from "../../../entities/IStreamChat";
import PrismaStreamOperations from "../../../repositories/database/PrismaStreamOperations";
import IResponseStream from "../../../responses/IResponseStream";
import setStream from "../../Streams/functions/SetStream";
import sender from "../../../../core/VenomWhatsapp";

const prismaStream = new PrismaStreamOperations()

const selectStream = (stream_id: string): Promise<IResponseStream> => {

    return new Promise(async (resolve, reject) => {
        try {

            await setStream({ stream_id, stream_set: true })
            await sender.setStream()

            resolve({ status_code: 200, message: 'stream setado' })

        } catch (error: any) {
            console.log(error.message);
            reject({ status_code: 500, error: error.message })
        }
    })

}

export default selectStream