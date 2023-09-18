import { create, Whatsapp, Message, SocketState } from 'venom-bot'
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import IStreamChat from '../app/entities/IStreamChat'


class Sender {
    private client: Whatsapp | undefined
    private qrCodeBase64: string | undefined
    private isConnected: boolean | undefined
    private statusSession: string | any


    public get getConnection(): boolean {
        return !this.isConnected ? false : true
    }

    public get getQrCode(): string {
        //console.log('observando qrCodeBase64 --> ', this.qrCodeBase64);
        return this.qrCodeBase64 ? this.qrCodeBase64 : ""
    }

    public get getStatusSession(): string {
        //console.log('observando o status --> ', this.statusSession);
        return this.statusSession
    }

    async setStream(streamChat: IStreamChat) {
        this.client?.onMessage(async message => {

            streamChat.stream_lines_responses?.map(line => {
                if (message.body === line.intent_message && message.isGroupMsg === false) {
                    this.client?.sendText(message.from, line.response_message)
                }
            })

        })
    }


    async sendText(to: string, body: string) {
        //5581996797276@c.us

        if (!isValidPhoneNumber(to, 'BR')) {
            throw new Error('invalid national number')
        }

        if (!this.isConnected) {
            throw new Error('desconnected!')
        }

        let phoneNumber = parsePhoneNumber(to, 'BR').format('E.164')



        phoneNumber = phoneNumber.includes("@c.us")
            ? phoneNumber : `${phoneNumber.replace("+", "")}@c.us`;



        await this.client?.sendText(phoneNumber, body)
    }

    initialize() {
        const qr = (base64Qr: string) => {
            this.qrCodeBase64 = base64Qr
        }

        const status = (statusSession: string) => {
            this.statusSession = statusSession
            this.isConnected = ["isLogged", "qrReadSuccess", "chatsAvailable", "successChat"].includes(statusSession)
        }

        const start = (client: Whatsapp) => {
            this.client = client
        }

        create('session-bot', qr, status).then((client) => {
            start(client)
        }).catch(err => {
            console.log(err);

        })
    }
}

export default Sender
