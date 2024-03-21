// instance for router 
const generalRouter = require('express').Router()
const apiRouter = require('express').Router()

// importing handlers
const { homeHandler, readData, createData, updateData } = require('./handler')

// Get req in home
generalRouter.get('/',homeHandler)

// Get request for API 
apiRouter.get( '/data', readData )

// Post request for adding data
apiRouter.post( '/data/create', createData )

// Put request for Updating data
apiRouter.put( '/data/update/:id',updateData )

module.exports = {
    generalRouter,
    apiRouter,
}