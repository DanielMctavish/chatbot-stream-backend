import IOwner from "./IOwner"

interface linesResponse {
    id: string
    intent_message: string
    response_message: string
    StreamChat?: IStreamChat
    streamChat_id?: String

}

interface IStreamChat {
    id: string
    owner?: IOwner
    owner_id: string
    welcome_message: string
    stream_lines_responses?: Array<linesResponse>
}

export default IStreamChat