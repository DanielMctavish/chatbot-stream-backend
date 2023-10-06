import express from "express"
import cors from "cors"
import whatsapp_routes from "./routes/WhatsRoutes"
import stream_routes from "./routes/StreamRoutes"
import client_routes from "./routes/ClientRoutes"
import variables_routes from "./routes/VariablesRoutes"
import login_routes from "./routes/AccessRoutes"

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => { res.status(200).send("Arboris_codex/VCodes API whatsapp v1.0") })
app.use("/whatsapp", whatsapp_routes)
app.use("/stream", stream_routes)
app.use("/client", client_routes)
app.use("/variables", variables_routes)
app.use("/access", login_routes)

const PORT = 8945
app.listen(PORT, () => {

    console.log('server running in PORT --> ', PORT);

})