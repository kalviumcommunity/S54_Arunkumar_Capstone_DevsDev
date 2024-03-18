// instance for router 
const generalRouter = require('express').Router()
const apiRouter = require('express').Router()

// importing handlers
const { homeHandler, readData } = require('./handler')

// Get req in home
generalRouter.get('/',homeHandler)

// Get request for API 
apiRouter.get( '/data', readData )

module.exports = {
    generalRouter,
    apiRouter,
}