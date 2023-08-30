import IStreamChat from "../../entities/IStreamChat"
import IResponseStream from "../../responses/IResponseStream"

export interface IRequestStream {
    stream_id: string
}
interface IUsecasesStream {
    CreateNewStream(data: IStreamChat): Promise<IResponseStream>
    GetStreamById(data: any, params: IRequestStream): Promise<IResponseStream>
    FindAllStreams(owner_id: string): Promise<IResponseStream>
    UpdateStreamById(data: IStreamChat, params: IRequestStream): Promise<IResponseStream>
    DeleteStreamById(params: IRequestStream): Promise<IResponseStream>
}

export default IUsecasesStream