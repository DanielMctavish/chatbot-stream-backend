"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const WhatsRoutes_1 = __importDefault(require("./routes/WhatsRoutes"));
const StreamRoutes_1 = __importDefault(require("./routes/StreamRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/whatsapp", WhatsRoutes_1.default);
app.use("/stream", StreamRoutes_1.default);
const PORT = 8945;
app.listen(PORT, () => {
    console.log('server running in PORT --> ', PORT);
});
