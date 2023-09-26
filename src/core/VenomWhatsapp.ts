import { create, Whatsapp } from 'venom-bot'
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
//import IStreamChat from '../app/entities/IStreamChat'
import PrismaStreamOperations from '../app/repositories/database/PrismaStreamOperations'
import { p2p } from '../app/packages/P2P'
import axios from 'axios'

const prismaStream = new PrismaStreamOperations()

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

    //DINÂMICA DE ENVIO E RECEBIMENTO DE MENSAGENS AQUI ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async setStream() {
        this.client?.onMessage(async message => {

            const senderName = message.sender.name;
            //(`Nome do remetente: ${senderName}`);
            const senderImg = message.sender.profilePicThumbObj.img;
            //(`Avatar do remetente: ${senderImg}`);
            const phoneNumber = message.from;
            //console.log(`Número de telefone do remetente: ${phoneNumber.split('@')[0]}`);

            const streamChat = await prismaStream.FindFirstTrue()
            if (!streamChat) return false


            streamChat.stream_lines_responses?.map(async (line: object | any) => {

                if (message.content.split(':')[0] === 'test') {
                    console.log('opção selecionada foi -->', message.content.split(':')[1]);

                    let currentPackage: string = ''
                    await p2p.map((pkg, index) => {
                        if (index === parseInt(message.content.split(':')[1])) currentPackage = pkg.id
                    })

                    await axios.post(`${process.env.API_BASE_URL}/line/test`, {
                        iptv_active: 1,
                        notes: "usuário de teste",
                        p2p_active: 1,
                        package_p2p: currentPackage
                    }, {
                        headers: {
                            Authorization: "Bearer " + process.env.TOKEN
                        }
                    }).then((response) => {
                        console.log('resultado do teste --> ', response.data);
                    }).catch(err => {
                        console.log('erro de requisição --> ', err.message);
                    })

                }

                if (message.body === line.intent_message) {
                    console.log('condição aprovada');

                    if (line.response_message === "#packages") {
                        this.client?.sendText(message.from,
                            `Entendi, vou mandar a lista de pacotes que temos:

                            ${p2p.map(pkg => pkg.name).join('\n')}

                            para criar um teste, digite "test" + o número do pacote: 
                            exemplo: test:1
                            `)
                    }

                } else {
                    const welcomeMessage: any = streamChat.welcome_message
                    this.client?.sendText(message.from, welcomeMessage)
                }

            })

        })
    }
    //DINÂMICA DE ENVIO E RECEBIMENTO DE MENSAGENS AQUI ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


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

const sender = new Sender()

export default sender
