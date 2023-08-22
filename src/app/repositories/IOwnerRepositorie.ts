import IOwner from "../entities/IOwner"

interface IOwnerRepositorie {
    Create(data: IOwner): Promise<IOwner>
    Find(stream_id?: string): Promise<IOwner | null>
    Update(data: Partial<IOwner>, stream_id: string): Promise<IOwner | null>
    Delete(stream_id: string): Promise<IOwner | null>
}

export default IOwnerRepositorie