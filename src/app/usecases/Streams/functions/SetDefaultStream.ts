import IResponseStream from "../../../responses/IResponseStream";
import sender from "../../../../core/VenomWhatsapp";

export const setDefaultStream = (message: string): Promise<IResponseStream> => {
    return new Promise(async (resolve, reject) => {

        sender.setDefaultMessage(message);
        sender.setStream()

        if (!message) reject({ status_code: 404, message: 'any message send' })
        resolve({ status_code: 200, message })

    })
}