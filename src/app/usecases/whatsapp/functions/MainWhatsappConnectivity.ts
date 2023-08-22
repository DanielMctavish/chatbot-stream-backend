import IOwner from "../../../entities/IOwner";
import IResponseStream from "../../../responses/IResponseStream";
import IWhatsappConnection from "../IWhatsappConnection";
import { checkConnectionStatus } from "./CheckConnectionStatus";
import { createConnection } from "./CreateConnection";
import { desconnect } from "./Desconnect";

class MainWhatsappConnectivity implements IWhatsappConnection {
    async CreateConnection(data: IOwner): Promise<IResponseStream> {
        return createConnection(data)
    }
    async Desconnect(data: IOwner, owner_id: string): Promise<IResponseStream> {
        return desconnect(data, owner_id)
    }
    async CheckConnectionStatus(): Promise<IResponseStream> {
        return checkConnectionStatus()
    }
}

export default MainWhatsappConnectivity