import IClient from "../entities/IClient";


interface IClientRepositorie {
    AddClient(data: IClient): Promise<IClient | null>
    FindByNumber(number: string): Promise<IClient | null>
    FindAll(): Promise<IClient[]>
    DeleteClient(client_id: string): Promise<IClient>
}

export default IClientRepositorie