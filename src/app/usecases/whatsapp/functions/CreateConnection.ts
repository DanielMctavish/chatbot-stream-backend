import IOwner from "../../../entities/IOwner";
import IResponseStream from "../../../responses/IResponseStream";
import PrismaOwnerRepositorie from "../../../repositories/database/PrismaOwnerRepositorie";
import venomConnect from "../../../../core/VenomWhatsapp";


const prismaOwner = new PrismaOwnerRepositorie();


export const createConnection = async (data: IOwner): Promise<IResponseStream> => {
    return new Promise(async (resolve, reject) => {
        // Criar a sessão Venom
        await venomConnect.create({
            session: 'teste-whatasapp bot',
            catchQR(base64Qrimg, asciiQR, attempts, urlCode) {
                console.log('Number of attempts to read the qrcode:', attempts);
                resolve({
                    status_code: 200, message: {
                        msg: 'qr code gerado',
                        QR_CODE: base64Qrimg
                    }
                })
            },

        }).then(client => {
            resolve(
                {
                    status_code: 200, message: {
                        msg: 'conectado!',
                    }
                })

        }).catch((err) => {
            reject({
                status_code: 500,
                message: err.message
            })
        })


    })
}
