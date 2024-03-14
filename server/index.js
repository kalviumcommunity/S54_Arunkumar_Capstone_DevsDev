// importing express
const express = require('express')

// importing cors
const cors = require('cors')

// importing routers
const { generalRouter, apiRouter } = require('./route')

// importing dotenv
const dotenv = require('dotenv').config()

// creating instance of an express
const app = express()

// port
const port = process.env.PORT || 4000

// Middleware - json
app.use(express.json())

// Middleware - cors
app.use(cors())

// Middleware Router 
app.use('/',generalRouter)
app.use('/api',apiRouter)

// listening port
app.listen(port,()=>{
    console.log(`The server is running on http://localhost:${port}/`)
})