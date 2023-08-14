
interface IConversation {
    client_message: string
    chatbot_responses: string
}

interface IChat {
    id: string
    client_number: string
    conversation: Array<IConversation>
}