import PrismaVariablesRepositorie from "../../../repositories/database/PrismaVariablesRepositorie";
import { IVariablesResponse } from "../IVariablesUsecases";

const prismaVariables = new PrismaVariablesRepositorie()

export const listVar = async (): Promise<IVariablesResponse> => {

    return await new Promise(async (resolve, reject) => {
        try {

            const currentVariable = await prismaVariables.FindAll()
            resolve({ status_code: 200, message: currentVariable })

        } catch (error: any) {
            reject({ status_code: 500, message: error.message })
        }
    })

}