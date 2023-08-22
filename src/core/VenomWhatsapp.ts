import * as Venom from "venom-bot"

const venomConnect = Venom


function start(client: any) {
    client.onMessage(async (message: any) => {

        if (message.body === 'test1' && message.isGroupMsg === false) {
            await client.sendText(message.from, 'Teste whatsapp boot DM')
        }

        if (message.body === 'oi' || message.body === 'olá' || message.body === 'oii' && message.isGroupMsg === false) {
            await client.sendText(message.from, 'Oi, tudo bem? Sou um bot de teste!')
        }

    })
}


export default venomConnect;