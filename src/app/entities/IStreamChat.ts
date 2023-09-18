import IOwner from "./IOwner"

interface linesResponse {
    id: string
    intent_message: string
    response_message: string
    StreamChat?: IStreamChat
    streamChat_id?: String | null
}

interface IStreamChat {
    id: string
    stream_set: boolean
    owner?: IOwner
    owner_id: string
    stream_title: string
    welcome_message: string
    stream_lines_responses?: Array<linesResponse>
}

export default IStreamChat