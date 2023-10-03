import IVariable from "../../../entities/IVariable";
import IVariablesUsecases, { IVariablesResponse, requestParams } from "../IVariablesUsecases";
import { createVar } from "./CreateVar";
import { deleteVar } from "./DeleteVar";
import { findVar } from "./FindVar";
import { listVar } from "./ListVar";
import { updateVar } from "./UpdateVar";

class MainVariables implements IVariablesUsecases {
    CreateVar(data: IVariable): Promise<IVariablesResponse> {
        return createVar(data)
    }
    FindVar(data: any, params: requestParams): Promise<IVariablesResponse> {
        return findVar(params.variable_id)
    }
    ListVar(): Promise<IVariablesResponse> {
        return listVar()
    }
    UpdateVar(data: IVariable, params: requestParams): Promise<IVariablesResponse> {
        return updateVar(data, params.variable_id)
    }
    DeleteVar(data: any, params: requestParams): Promise<IVariablesResponse> {
        return deleteVar(params.variable_id)
    }
}

export default MainVariables