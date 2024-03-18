// instance for router 
const generalRouter = require('express').Router()
const apiRouter = require('express').Router()

// importing handlers
const { homeHandler, readData, createData } = require('./handler')

// Get req in home
generalRouter.get('/',homeHandler)

// Get request for API 
apiRouter.get( '/data', readData )

// Post request for adding data
apiRouter.post( '/data/create', createData )

module.exports = {
    generalRouter,
    apiRouter,
}