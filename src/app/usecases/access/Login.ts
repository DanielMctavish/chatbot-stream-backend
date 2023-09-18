// import { verifyPassword } from "../../../authentication/Bcrypt"
// import { generatedToken } from "../../../authentication/JWT"


// interface Login {
//     email: string
//     senha: string
// }

// export const loginAdmin = async (data: Login) => {

//     const currentAdm = await AdmRepositorie.findByEmail(data.email)
//     if (!currentAdm) return { status_code: 404, body: { msg: "nenhum adm encontrado" } }

//     const verify = await verifyPassword(data.senha, currentAdm.senha)


//     if (!verify) {
//         return { status_code: 401, body: { msg: "acesso não autorizado" } }
//     } else {
//         const newToken = await generatedToken(currentAdm.email)
//         return { status_code: 200, body: { msg: "acesso admin autorizado!", access: newToken, adm: currentAdm } }
//     }


// }

// export const loginColab = async (data: Login) => {
//     const currentColab = await ColabRepositorie.findByEmail(data.email)
//     if (!currentColab) return { status_code: 404, body: { msg: "nenhum colaborador encontrado" } }

//     const verify = await verifyPassword(data.senha, currentColab.senha)



//     if (!verify) {
//         return { status_code: 401, body: { msg: "acesso não autorizado" } }
//     } else {
//         const newToken = await generatedToken(currentColab.email)
//         return { status_code: 200, body: { msg: "acesso colaborador autorizado!", access: newToken, colab: currentColab } }
//     }
// }

// export const loginClient = async (data: Login) => {

//     const currentClient = await ClientRepositorie.findByEmail(data.email)
//     if (!currentClient) return { status_code: 404, body: { msg: "nenhum usuário encontrado" } }

//     const verify = await verifyPassword(data.senha, currentClient.senha)

//     if (!verify) {
//         return { status_code: 401, body: { msg: "acesso não autorizado" } }
//     } else {
//         const newToken = await generatedToken(currentClient.email)
//         return { status_code: 200, body: { msg: "acesso client autorizado!", access: newToken, client: currentClient } }
//     }
// }

