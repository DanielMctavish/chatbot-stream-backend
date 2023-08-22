import * as Venom from "venom-bot"


Venom.create({
    session: 'teste-whatasapp bot' //name of session
}).then(async (client) => {
    await start(client)
}).catch((erro) => {
    console.log(erro);
});



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