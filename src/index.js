import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({message: "Task tracker api. Welcome"})
})

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
    console.log("App running on port", PORT)
})

