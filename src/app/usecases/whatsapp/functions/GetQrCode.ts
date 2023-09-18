import { sender } from "./CreateConnection";
import IResponseStream from "../../../responses/IResponseStream";


const getQrCode = (): Promise<IResponseStream> => {

    return new Promise(async (resolve, reject) => {
        try {
            const currentQR = await sender.getQrCode
            resolve({ status_code: 200, message: currentQR })
        } catch (error: any) {
            reject({ status_code: 500, error: error.message })
        }
    })
}

export default getQrCode;