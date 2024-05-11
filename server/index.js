const express = require("express")
const app = express()
const connecDb = require("./dbConnection")
const cors = require("cors")
const router = require("../server/route/router")

require("dotenv").config()

connecDb()


PORT = 4000

// middleware
app.use(cors(
    {
        origin: "http://localhost:3000"
    }
))
app.use(express.json())
app.use("/",router)


app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`)
})