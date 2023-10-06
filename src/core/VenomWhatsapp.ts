import { create, Whatsapp } from 'venom-bot'
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
//import IStreamChat from '../app/entities/IStreamChat'
import PrismaStreamOperations from '../app/repositories/database/PrismaStreamOperations'
import PrismaVariablesRepositorie from '../app/repositories/database/PrismaVariablesRepositorie'
import { p2p } from '../app/packages/P2P'
import axios from 'axios'
import dayjs from 'dayjs'
import addClient from '../app/usecases/clients/functions/AddClient'
import loginInstance from '../app/usecases/access/MainLogin'

const prismaStream = new PrismaStreamOperations()
const prismaVariables = new PrismaVariablesRepositorie()

class Sender {
    private client: Whatsapp | undefined | null
    private qrCodeBase64: string | undefined
    private isConnected: boolean | undefined
    private statusSession: string | any
    private welcome_msg_count: number = 0
    private defaultStreamMessage: string = ''

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

    public setDefaultMessage(message: string) {
        this.defaultStreamMessage = message
    }

    //DINÂMICA DE ENVIO E RECEBIMENTO DE MENSAGENS AQUI ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async setStream() {
        this.client?.onMessage(async message => {

            if (this.defaultStreamMessage) {
                this.client?.sendText(message.from, this.defaultStreamMessage)
                return
            }


            const senderName = message.sender.name;
            //(`Nome do remetente: ${senderName}`);
            const senderImg = message.sender.profilePicThumbObj.img;
            //(`Avatar do remetente: ${senderImg}`);
            const phoneNumber = message.from;
            //console.log(`Número de telefone do remetente: ${phoneNumber.split('@')[0]}`);

            const streamChat = await prismaStream.FindFirstTrue()
            if (!streamChat) return false


            streamChat.stream_lines_responses?.map(async (line: object | any) => {

                //VARIABLES RESPONSE...........................................

                const AllVariables = await prismaVariables.FindAll()

                AllVariables.map(async (variable: any) => {

                    // console.log('dentro do map --> ', variable);
                    // console.log('observando response --> ', line.response_message.toUpperCase());
                    // console.log('observando método--> ', variable.request_method);
                    let stringResponse = ''

                    const responsesByFilter = async (response: any) => {

                        if (Array.isArray(response.data)) {
                            await response.data.map((element: any) => {
                                if (element.name) {
                                    stringResponse += element.name + '\n'
                                }
                                if (element.package_name) {
                                    stringResponse += element.package_name + '\n'
                                }
                                if (element.username) {
                                    stringResponse += element.username + '\n'
                                }
                                if (element.password) {
                                    stringResponse += element.username + '\n'
                                }
                            })

                            this.client?.sendText(message.from, stringResponse)
                        } else {
                            if (response.data.name) {
                                stringResponse += response.data.name + '\n'
                            }
                            if (response.data.package_name) {
                                stringResponse += response.data.package_name + '\n'
                            }
                            if (response.data.username) {
                                stringResponse += response.data.username + '\n'
                            }
                            if (response.data.password) {
                                stringResponse += response.data.username + '\n'
                            }

                            this.client?.sendText(message.from, stringResponse)
                        }

                    }

                    if (line.response_message.toUpperCase() === `#${variable.name}` && message.content === line.intent_message) {

                        switch (variable.request_method) {
                            case 'GET':
                                if (variable.api_url)
                                    await axios.get(variable.api_url, {
                                        headers: {
                                            Authorization: "Bearer " + loginInstance.tokenInstance
                                        }
                                    }).then(async (response: any) => {

                                        await responsesByFilter(response)

                                    })
                                break;
                            case 'POST':
                                if (variable.api_url && variable.body_json)
                                    await axios.post(variable.api_url, variable.body_json, {
                                        headers: {
                                            Authorization: "Bearer " + loginInstance.tokenInstance
                                        }
                                    }).then(async (response: any) => {

                                        await responsesByFilter(response)

                                    })
                                break;
                            case 'PATCH':
                                if (variable.api_url && variable.body_json)
                                    await axios.patch(variable.api_url, variable.body_json, {
                                        headers: {
                                            Authorization: "Bearer " + loginInstance.tokenInstance
                                        }
                                    }).then(async (response: any) => {

                                        await responsesByFilter(response)

                                    })
                                break;
                            case 'DELETE':
                                if (variable.api_url)
                                    await axios.delete(variable.api_url, {
                                        headers: {
                                            Authorization: "Bearer " + loginInstance.tokenInstance
                                        }
                                    }).then(async (response: any) => {

                                        await responsesByFilter(response)

                                    })
                                break;
                            case 'PUT':
                                if (variable.api_url && variable.body_json)
                                    await axios.put(variable.api_url, variable.body_json, {
                                        headers: {
                                            Authorization: "Bearer " + loginInstance.tokenInstance
                                        }
                                    }).then(async (response: any) => {

                                        await responsesByFilter(response)

                                    })
                                break;
                            default:

                                break;
                        }

                    } else if (message.content === line.intent_message) {
                        this.client?.sendText(message.from, line.response_message)
                        return
                    }
                })

                //--------------------------------------------------------------------

            })

            //SAIR.......................................................................................
            if (message.content === 'sair') this.welcome_msg_count = 4
            //MENU.......................................................................................
            if (message.content === 'menu') this.welcome_msg_count = 0
            //TESTE P2P...................................................................................
            if (message.content.split(':')[0] === 'teste') {
                console.log('opção selecionada foi -->', message.content.split(':')[1]);
                console.log('buscando pacote -->', p2p[parseInt(message.content.split(':')[1]) - 1].name);


                let currentPackage: string = ''
                await p2p.map((pkg, index) => {
                    if (index === parseInt(message.content.split(':')[1]) - 1) currentPackage = pkg.id
                })

                console.log('id do package --> ', currentPackage);


                await axios.post(`${process.env.API_BASE_URL}/line/test`, {
                    iptv_active: 1,
                    notes: "usuário de teste",
                    p2p_active: 1,
                    package_p2p: currentPackage
                }, {
                    headers: {
                        Authorization: "Bearer " + loginInstance.tokenInstance
                    }
                }).then((response) => {

                    console.log('resultado do teste --> ', response.data);
                    const user = response.data.username;
                    const password = response.data.password;
                    const expiration = response.data.exp_date;

                    const packageSelected = parseInt(message.content.split(':')[1])

                    this.client?.sendText(message.from,
                        `ok! você selecionou o ${p2p[packageSelected - 1].name}

                        aqui estão suas credenciais:

                        usuário: ${user}
                        senha: ${password}

                        esse teste expira em:
                        ${dayjs(expiration).format('DD [de] MMMM [de] YYYY [às] HH:mm')}
                        `)

                }).catch(err => {
                    console.log('erro de requisição --> ', err.message);
                })
                return
            }

            //SE MENSAGEM !== intenção ? WELCOME....................................................
            let verifyLineTrue = 0

            streamChat.stream_lines_responses?.map((line: object | any) => {
                if (message.content === line.intent_message) verifyLineTrue++
            })

            if (this.welcome_msg_count > 2) return false

            if (verifyLineTrue === 0) {
                this.welcome_msg_count++
                const welcomeMessage: any = streamChat.welcome_message

                this.client?.sendText(message.from, welcomeMessage)
            }



            await addClient({
                name: senderName,
                phone_number: phoneNumber.split('@')[0],
                avatar_url: senderImg
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
