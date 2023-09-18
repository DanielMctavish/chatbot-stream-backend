import PrismaStreamOperations from "../../../repositories/database/PrismaStreamOperations"
import IResponseStream from "../../../responses/IResponseStream"
const prismaStream = new PrismaStreamOperations()

export interface IStreamRequest {
    stream_set: boolean,
    stream_id: string
}

const setStream = async (data: IStreamRequest): Promise<IResponseStream> => {

    return new Promise(async (resolve, reject) => {
        try {
            const currentStream = await prismaStream.UpdateSet(data.stream_set, data.stream_id)
            resolve({ status_code: 200, message: 'stream setado', body: currentStream })
        } catch (error: object | unknown | any) {
            reject({ status_code: 500, message: error.message })
        }
    })
}


export default setStream;