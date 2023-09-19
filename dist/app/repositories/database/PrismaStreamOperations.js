"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PrismaStreamOperations {
    Create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log('dentro da operação create >> ', data);
            const { owner_id, stream_lines_responses, welcome_message, stream_title, stream_set } = data;
            return yield prisma.streamChat.create({
                data: {
                    owner_id,
                    welcome_message,
                    stream_title,
                    stream_set,
                    stream_lines_responses: {
                        create: stream_lines_responses
                    }
                }
            });
        });
    }
    Find(stream_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.streamChat.findFirst({
                where: {
                    id: stream_id
                },
                include: { stream_lines_responses: true }
            });
        });
    }
    FindAll(owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.streamChat.findMany({
                where: {
                    owner_id,
                }, include: {
                    stream_lines_responses: true
                }
            });
        });
    }
    Update(data, stream_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { owner_id, stream_lines_responses, welcome_message, stream_set } = data;
            const updateData = {
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
            return yield prisma.streamChat.update({
                where: { id: stream_id },
                data: updateData,
            });
        });
    }
    UpdateSet(set, stream_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.streamChat.updateMany({ data: { stream_set: false } });
            return yield prisma.streamChat.update({
                where: { id: stream_id },
                data: {
                    stream_set: set
                }
            });
        });
    }
    Delete(stream_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.streamChat.delete({
                where: { id: stream_id }
            });
        });
    }
}
exports.default = PrismaStreamOperations;
