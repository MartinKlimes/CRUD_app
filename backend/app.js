const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const url = process.env.MONGODB_URL

const app = express();

app.use(cors());

mongoose.connect(url, {useNewUrlParser: true})
const con = mongoose.connection

con.on('open', () => {
    console.log('Connected...')
})

app.use(express.json())

const itemRouter = require('./routes/items')
app.use('/items', itemRouter)

app.listen(9000, () => {
    console.log('Server started')
})
