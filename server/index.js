// importing express
const express = require('express')

// importing cors
const cors = require('cors')

// importing routers
const { generalRouter, apiRouter } = require('./route')
const { mongoConnect } = require('./mongoConnect/mongoConnect')

// importing dotenv
const dotenv = require('dotenv').config()

// creating instance of an express
const app = express()

// port
const port = process.env.PORT || 4000

// Middleware - json
app.use(express.json())

// allow requests from specific origins
const corsOptions = {
    origin: ['http://localhost:5173', 'https://devsdev.vercel.app'], // Add the known websites here
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
// Middleware - cors
app.use(cors(corsOptions));

// Middleware Router 
app.use('/',generalRouter)
app.use('/api',apiRouter)

// listening port
app.listen(port,()=>{
    console.log(`The server is running on http://localhost:${port}/`)
})

// connecting database 
mongoConnect()