const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const songs = require('./routes/songs')

const app = express()
app.use(cors())
app.use(express.json())

const mongoDB = `mongodb+srv://user:4qcit6iAs8LRXOzM@cluster0-lo20j.mongodb.net/test?retryWrites=true`
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true })
.then(() => {
    console.log("MongoDB connected...")
})
.catch(err => {
    console.log(Err)
})
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.use('/songs', songs)

const PORT = 8080

app.listen(PORT, () => console.log(`Listening at ${PORT}`))