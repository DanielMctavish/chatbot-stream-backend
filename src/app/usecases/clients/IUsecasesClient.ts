import IClient from "../../entities/IClient";
import { ClientResponse } from "./functions/AddClient";

interface IUsecasesClient {
    AddClient(data: IClient): Promise<ClientResponse>
    DeleteClient(data: any, params: object): Promise<ClientResponse>
}

export default IUsecasesClient;