import IOwner from "../../entities/IOwner";
import IResponseStream from "../../responses/IResponseStream";


interface IWhatsappConnection {
    CreateConnection(data: IOwner): Promise<IResponseStream>
    Desconnect(data: IOwner, owner_id: string): Promise<IResponseStream>
}

export default IWhatsappConnection