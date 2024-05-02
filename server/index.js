const express = require("express")
const app = express()


PORT = 4000

// middleware
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`)
})