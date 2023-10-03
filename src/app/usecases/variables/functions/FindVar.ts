import PrismaVariablesRepositorie from "../../../repositories/database/PrismaVariablesRepositorie";
import { IVariablesResponse } from "../IVariablesUsecases";

const prismaVariables = new PrismaVariablesRepositorie()

export const findVar = async (variable_id: string): Promise<IVariablesResponse> => {

    return await new Promise(async (resolve, reject) => {
        try {

            const currentVariable = await prismaVariables.Find(variable_id)
            if (!currentVariable) return reject({ status_code: 404, message: 'any variable found' })
            resolve({ status_code: 200, message: currentVariable })

        } catch (error: any) {
            reject({ status_code: 500, message: error.message })
        }
    })

}