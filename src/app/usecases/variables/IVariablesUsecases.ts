import IVariable from "../../entities/IVariable";

export interface IVariablesResponse {
    status_code: number
    message: string | object
}

export interface requestParams {
    variable_id: string
}

interface IVariablesUsecases {
    CreateVar(data: IVariable): Promise<IVariablesResponse>
    FindVar(data: any, params: requestParams): Promise<IVariablesResponse>
    ListVar(): Promise<IVariablesResponse>
    UpdateVar(data: IVariable, params: requestParams): Promise<IVariablesResponse>
    DeleteVar(data: any, params: requestParams): Promise<IVariablesResponse>
}

export default IVariablesUsecases