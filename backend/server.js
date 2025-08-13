const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();


// Importing Routes
const Home = require('./routes/Home')
const Images = require('./routes/Images')
const About = require('./routes/AboutUs')

// Express App
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})


// Use Routes
app.use('/', Home)
app.use('/aboutus', About)
app.use('/api/images', Images)

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

