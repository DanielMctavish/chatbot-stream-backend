import { PrismaClient } from "@prisma/client"
import IStreamChat from "../../entities/IStreamChat";
import { IStreamChatRepositorie } from "../IStreamChatRepositorie";
const prisma = new PrismaClient()

class PrismaStreamOperations implements IStreamChatRepositorie {
    async Create(data: IStreamChat): Promise<IStreamChat> {
        const {
            owner_id,
            stream_lines_responses,
            welcome_message
        } = data
        return await prisma.streamChat.create({
            data: {
                owner_id,
                welcome_message,
                stream_lines_responses: {
                    create: stream_lines_responses
                }
            }
        })
    }
    async Find(stream_id: string): Promise<IStreamChat | null> {
        return await prisma.streamChat.findFirst({
            where: {
                id: stream_id
            }
        })
    }

    async Update(data: Partial<IStreamChat>, stream_id: string): Promise<IStreamChat | null> {
        const {
            owner_id,
            stream_lines_responses,
            welcome_message
        } = data;

        const updateData: any = {
            welcome_message,
        };

        if (stream_lines_responses) {
            const linesResponsesUpdateData = stream_lines_responses.map(response => ({
                where: { id: response.id },
                data: {
                    conditional_message: response.intent_message,
                    response_message: response.response_message,
                    StreamChat: response.StreamChat
                }
            }));
            updateData.stream_lines_responses = {
                upsert: linesResponsesUpdateData,
            };
        }

        return await prisma.streamChat.update({
            where: { id: stream_id },
            data: updateData,
        });
    }


    async Delete(stream_id: string): Promise<IStreamChat | null> {
        return await prisma.streamChat.delete({
            where: { id: stream_id }
        })
    }
}

export default PrismaStreamOperations;