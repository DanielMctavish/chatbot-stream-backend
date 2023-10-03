import IVariable from "../../../entities/IVariable";
import PrismaVariablesRepositorie from "../../../repositories/database/PrismaVariablesRepositorie";
import { IVariablesResponse } from "../IVariablesUsecases";

const prismaVariables = new PrismaVariablesRepositorie()

export const createVar = async (data: IVariable): Promise<IVariablesResponse> => {

    return await new Promise(async (resolve, reject) => {
        try {
            const currentVariable = await prismaVariables.Create(data)
            resolve({ status_code: 201, message: currentVariable })
        } catch (error: any) {
            reject({ status_code: 500, message: error.message })
        }
    })

}