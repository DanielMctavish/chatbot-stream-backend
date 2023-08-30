import * as Venom from "venom-bot"

const venomConnect = Venom

interface IStreamResponse {
    intent_message: string
    response_message: string
}

export function start(client: any, stream_responses: IStreamResponse[]) {
    client.onMessage(async (message: any) => {

        stream_responses.map(async stream => {
            if (message.body === stream.intent_message && message.isGroupMsg === false) {
                await client.sendText(message.from, stream.response_message)
            }
        })

    })
}


export default venomConnect;