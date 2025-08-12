const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();


// Express App
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})


mongoose.connect(process.env.MONGOURI)
    .then(() =>{
        app.listen(process.env.PORT, () =>{
            console.log('Connected to DB and Listening on port ', process.env.PORT)
            console.log('http://localhost:4000/')
        })
    })
    .catch((error) =>{
        console.log(error)
    })

