import IStreamChat from "../../../entities/IStreamChat";
import IResponseStream from "../../../responses/IResponseStream";
import IUsecasesStream, { IRequestStream } from "../IUsecasesStream";
import createNewStream from "./CreateNewStream";
import deleteStreamById from "./DeleteStreamById";
import findAllStreams from "./FindAllStreams";
import getStreamById from "./GetStreamById";
import updateStreamById from "./UpdateStreamById";


class MainUsecaseStream implements IUsecasesStream {
    async CreateNewStream(data: IStreamChat): Promise<IResponseStream> {
        return await createNewStream(data)
    }
    async GetStreamById(data: any, params: IRequestStream): Promise<IResponseStream> {
        return await getStreamById(params.stream_id)
    }
    async FindAllStreams(owner_id: string): Promise<IResponseStream> {
        return await findAllStreams(owner_id)
    }
    async UpdateStreamById(data: IStreamChat, params: IRequestStream): Promise<IResponseStream> {
        return await updateStreamById(data, params.stream_id)
    }
    async DeleteStreamById(params: IRequestStream): Promise<IResponseStream> {
        return await deleteStreamById(params.stream_id)
    }
}

export default MainUsecaseStream