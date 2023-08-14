import IStreamChat from "../../entities/IStreamChat";
import IResponseStream from "../../responses/IResponseStream";
import IUsecasesStream from "../IUsecasesStream";
import createNewStream from "./CreateNewStream";
import deleteStreamById from "./DeleteStreamById";
import getStreamById from "./GetStreamById";
import updateStreamById from "./UpdateStreamById";


class MainUsecaseStream implements IUsecasesStream {
    async CreateNewStream(data: IStreamChat): Promise<IResponseStream> {
        return await createNewStream(data)
    }
    async GetStreamById(stream_id: string): Promise<IResponseStream> {
        return await getStreamById(stream_id)
    }
    async UpdateStreamById(data: IStreamChat, stream_id: string): Promise<IResponseStream> {
        return await updateStreamById(data, stream_id)
    }
    async DeleteStreamById(stream_id: string): Promise<IResponseStream> {
        return await deleteStreamById(stream_id)
    }
}

export default MainUsecaseStream