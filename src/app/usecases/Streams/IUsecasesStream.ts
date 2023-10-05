import IStreamChat from "../../entities/IStreamChat"
import IResponseStream from "../../responses/IResponseStream"
import { IStreamRequest } from "./functions/SetStream"

export interface IRequestStream {
    stream_id: string
}
export interface IDefaultStream {
    message: string
}
interface IUsecasesStream {
    CreateNewStream(data: IStreamChat): Promise<IResponseStream>
    GetStreamById(data: any, params: IRequestStream): Promise<IResponseStream>
    FindAllStreams(owner_id: string): Promise<IResponseStream>
    UpdateStreamById(data: IStreamChat, params: IRequestStream): Promise<IResponseStream>
    SetStream(data: IStreamRequest): Promise<IResponseStream>
    SetDefaultStream(data: IDefaultStream): Promise<IResponseStream>
    DeleteStreamById(data: any, params: IRequestStream): Promise<IResponseStream>
}

export default IUsecasesStream