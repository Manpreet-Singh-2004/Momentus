require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require("path");


// Importing Routes
const Home = require('./routes/Home')
const Images = require('./routes/Images')
const About = require('./routes/AboutUs')
const userRoutes = require('./routes/userRoute')


// Express App
const app = express()

// Middleware
app.use(express.json())
// serve uploads as static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})


// Use Routes
app.use('/', Home)
app.use('/aboutus', About)
app.use('/api/images', Images)
app.use('/api/user', userRoutes)

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

