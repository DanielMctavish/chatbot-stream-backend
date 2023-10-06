import { ILoginRequest, LoginResponse } from "../MainLogin"
import loginInstance from "../MainLogin"


export const loginAdmin = (data: ILoginRequest): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {

        if (!data) reject({ status_code: 404, message: 'empty data' })
        loginInstance.tokenInstance = data.token
        resolve({ status_code: 200, message: `"message":"login realizado" , "access": "${data.token}"` })

    })
}