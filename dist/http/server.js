"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const WhatsRoutes_1 = __importDefault(require("./routes/WhatsRoutes"));
const StreamRoutes_1 = __importDefault(require("./routes/StreamRoutes"));
const ClientRoutes_1 = __importDefault(require("./routes/ClientRoutes"));
const VariablesRoutes_1 = __importDefault(require("./routes/VariablesRoutes"));
const AccessRoutes_1 = __importDefault(require("./routes/AccessRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://v-codes-chatbot-feature.vercel.app/');
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST,PATCH, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.get("/", (req, res) => { res.status(200).send("Arboris_codex/VCodes API whatsapp v1.0"); });
app.use("/whatsapp", WhatsRoutes_1.default);
app.use("/stream", StreamRoutes_1.default);
app.use("/client", ClientRoutes_1.default);
app.use("/variables", VariablesRoutes_1.default);
app.use("/access", AccessRoutes_1.default);
const PORT = 443;
app.listen(PORT, () => {
    console.log('server running in PORT --> ', PORT);
});
