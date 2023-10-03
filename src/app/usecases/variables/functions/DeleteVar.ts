import PrismaVariablesRepositorie from "../../../repositories/database/PrismaVariablesRepositorie";
import { IVariablesResponse } from "../IVariablesUsecases";

const prismaVariables = new PrismaVariablesRepositorie()

export const deleteVar = async (variable_id: string): Promise<IVariablesResponse> => {

    return await new Promise(async (resolve, reject) => {
        try {

            const currentVariable = await prismaVariables.Delete(variable_id)
            if (!currentVariable) return reject({ status_code: 404, message: 'any variable found' })
            resolve({ status_code: 200, message: 'variable deleted' })

        } catch (error: any) {
            reject({ status_code: 500, message: error.message })
        }
    })

}