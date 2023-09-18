import IOwner from "../../../entities/IOwner";
import IResponseStream from "../../../responses/IResponseStream";
import IWhatsappConnection, { IParams } from "../IWhatsappConnection";
import { checkConnectionStatus } from "./CheckConnectionStatus";
import { createConnection } from "./CreateConnection";
import { desconnect } from "./Desconnect";
import getQrCode from "./GetQrCode";
import selectStream from "./SelectStream";


class MainWhatsappConnectivity implements IWhatsappConnection {
    CreateConnection(data: IOwner): Promise<IResponseStream> {
        return createConnection(data)
    }
    Desconnect(data: IOwner, owner_id: string): Promise<IResponseStream> {
        return desconnect(data, owner_id)
    }
    CheckConnectionStatus(): Promise<IResponseStream> {
        return checkConnectionStatus()
    }
    GetQrCode(): Promise<IResponseStream> {
        return getQrCode()
    }
    SelectStream(data: any, params: IParams): Promise<IResponseStream> {
        return selectStream(params.stream_id)
    }
}

export default MainWhatsappConnectivity