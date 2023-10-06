// import { verifyPassword } from "../../../authentication/Bcrypt"
// import { generatedToken } from "../../../authentication/JWT"

import { loginAdmin } from "./functions/LoginAdmin"

export interface ILoginRequest {
    token: string
}
export interface LoginResponse {
    status_code: number
    message: string
}
class MainLogin {

    public tokenInstance: string = ''

    public LoginAdmin(data: ILoginRequest): Promise<LoginResponse> {

        return loginAdmin(data)

    }

}

const loginInstance = new MainLogin()
export default loginInstance;



