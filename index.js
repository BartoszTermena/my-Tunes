const express = require('express')
const mongoose = require('mongoose')
const songs = require('./routes/songs')
const path = require('path')

const app = express()
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

if(process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening at ${PORT}`))