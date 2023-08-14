import IStreamChat from "../entities/IStreamChat";

export interface IStreamChatRepositorie {
    Create(data: IStreamChat): Promise<IStreamChat>
    Find(stream_id: string): Promise<IStreamChat | null>
    Update(data: Partial<IStreamChat>, stream_id: string): Promise<IStreamChat | null>
    Delete(stream_id: string): Promise<IStreamChat | null>
}