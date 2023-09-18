import IOwner from "../../entities/IOwner";
import IResponseStream from "../../responses/IResponseStream";


export interface IParams {
    stream_id: string
}

interface IWhatsappConnection {
    CreateConnection(data: IOwner): Promise<IResponseStream>
    CheckConnectionStatus(): Promise<IResponseStream>
    Desconnect(data: IOwner, owner_id: string): Promise<IResponseStream>
    GetQrCode(): Promise<IResponseStream>
    SelectStream(data: any, params: IParams): Promise<IResponseStream> //stream_id --> function start venom
}

export default IWhatsappConnection