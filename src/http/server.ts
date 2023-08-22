import express from "express"
import cors from "cors"


const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())



app.post("/type-number-verification", async (req, res) => {

    res.status(200).json()

})






const PORT = 8945
app.listen(PORT, () => {

    console.log('server running in PORT --> ', PORT);

})