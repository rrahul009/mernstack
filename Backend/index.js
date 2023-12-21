const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const cors=require('cors')
const userRoutes=require('./Routes/userRoutes')

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("database connected successfuly")
})
app.use(express.json())
app.use(cors())
app.use('/api/client',userRoutes)
app.listen(process.env.PORT, () => {
    console.log(`Server is running on the http://localhost${process.env.PORT} `)
})