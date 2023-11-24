require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const PORT= process.env.PORT
const DB_URL = process.env.DB_URL
const indexRouter = require('./routes')

mongoose.connect(DB_URL).then(()=>{
    console.log("database connected..")
})


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('Public'));

app.use('/', indexRouter)

app.use((err,re,res,next)=>{
    const errMsg = err ? err.toString() : "something went wrong";
    res.status(500).json({data:"", msg:errMsg}) 
})

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`)
})