require("dotenv").config()
const express = require("express")
const mongoose = require ('mongoose')
const cors = require("cors")

const PORT = process.env.PORT || 3333
const indexRouter = require("./routes")

const DB_URL = process.env.DB_URL
mongoose.connect(DB_URL).then(()=>{
    console.log("database is connected")
})
const app = express()


app.use(cors())
app.use(express.static('public'))
app.use('/', indexRouter)
app.use(express.json())


app.use((error,req,res,next)=>{
    const errMsg = error ? error.toString() : "something went wrong"
    res.status(500).json({msg:'', msg:errMsg})
})

app.listen(PORT,()=>{
    console.log(`app is running on ${PORT}`)
})


