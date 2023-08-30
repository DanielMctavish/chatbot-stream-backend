import express from "express"
import cors from "cors"
import whatsapp_routes from "./routes/WhatsRoutes"
import stream_routes from "./routes/StreamRoutes"

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => { res.status(200).send("Arboris_codex/VCodes API whatsapp v1.0") })
app.use("/whatsapp", whatsapp_routes)
app.use("/stream", stream_routes)

const PORT = 8945
app.listen(PORT, () => {

    console.log('server running in PORT --> ', PORT);

})