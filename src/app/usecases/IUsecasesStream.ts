import IStreamChat from "../entities/IStreamChat"
import IResponseStream from "../responses/IResponseStream"

interface IUsecasesStream {
    CreateNewStream(data: IStreamChat): Promise<IResponseStream>
    GetStreamById(stream_id: string): Promise<IResponseStream>
    UpdateStreamById(data: IStreamChat, stream_id: string): Promise<IResponseStream>
    DeleteStreamById(stream_id: string): Promise<IResponseStream>
}

export default IUsecasesStream