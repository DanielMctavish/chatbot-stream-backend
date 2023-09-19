import { create, Whatsapp } from 'venom-bot'
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import IStreamChat from '../app/entities/IStreamChat'


class Sender {
    private client: Whatsapp | undefined | null
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

            const senderName = message.sender.name;
            //(`Nome do remetente: ${senderName}`);
            const phoneNumber = message.from;
            //console.log(`Número de telefone do remetente: ${phoneNumber.split('@')[0]}`);

            streamChat.stream_lines_responses?.map(line => {
                if (message.body === line.intent_message && message.isGroupMsg === false) {
                    this.client?.sendText(message.from, line.response_message)
                } else {
                    const welcomeMessage: any = streamChat.welcome_message
                    this.client?.sendText(message.from, welcomeMessage)
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

        const sessionName: any = { session: 'vcodesStream' }

        this.client?.close()

        create(
            sessionName,
            qr,
            status
        ).then((client: any) => {
            start(client)
            //console.log('client! ->', client);
        }).catch((erro: any) => {
            console.log(erro);
        });
    }
}

export default Sender
