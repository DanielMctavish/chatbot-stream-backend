import express from "express"
import cors from "cors"
import * as Venom from "venom-bot"

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

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

app.post("/type-number-verification", async (req, res) => {

    res.status(200).json()

})






const PORT = 8945
app.listen(PORT, () => {

    console.log('server running in PORT --> ', PORT);

})