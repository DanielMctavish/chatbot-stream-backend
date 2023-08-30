import IOwner from "../../entities/IOwner";
import IResponseStream from "../../responses/IResponseStream";


interface IWhatsappConnection {
    CreateConnection(data: IOwner): Promise<IResponseStream>
    CheckConnectionStatus(): Promise<IResponseStream>
    Desconnect(data: IOwner, owner_id: string): Promise<IResponseStream>
    //SelectStream(): Promise<IResponseStream> //stream_id --> function start venom
}

export default IWhatsappConnection