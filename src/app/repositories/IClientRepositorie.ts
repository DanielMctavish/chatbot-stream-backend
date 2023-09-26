import IClient from "../entities/IClient";


interface IClientRepositorie {
    AddClient(data: IClient): Promise<IClient>
    DeleteClient(client_id:string): Promise<IClient>
}

export default IClientRepositorie