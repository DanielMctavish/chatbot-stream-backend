import IVariable from "../entities/IVariable"


interface IVariableRepositorie {
    Create(data: IVariable): Promise<IVariable>
    Find(variable_id: string): Promise<IVariable | null>
    FindAll(): Promise<IVariable[]>
    Update(data: Partial<IVariable>, variable_id: string): Promise<IVariable | null>
    Delete(variable_id: string): Promise<IVariable | null>
}

export default IVariableRepositorie