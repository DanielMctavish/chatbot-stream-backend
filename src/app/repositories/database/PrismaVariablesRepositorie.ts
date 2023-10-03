import { PrismaClient } from "@prisma/client"
import IVariable from "../../entities/IVariable";
import IVariableRepositorie from "../IVariablesRepositorie";
const prisma = new PrismaClient()


class PrismaVariablesRepositorie implements IVariableRepositorie {

    async Create(data: IVariable): Promise<IVariable> {
        return await prisma.variables.create({
            data
        })
    }

    async Find(variable_id: string): Promise<IVariable | null> {
        return await prisma.variables.findFirst({
            where: {
                id: variable_id
            }
        })
    }

    async FindAll(): Promise<IVariable[]> {
        return await prisma.variables.findMany()
    }

    async Update(data: Partial<IVariable>, variable_id: string): Promise<IVariable | null> {
        return await prisma.variables.update({
            where: { id: variable_id },
            data
        })
    }

    async Delete(variable_id: string): Promise<IVariable | null> {
        return await prisma.variables.delete({
            where: {
                id: variable_id
            }
        })
    }

}

export default PrismaVariablesRepositorie;