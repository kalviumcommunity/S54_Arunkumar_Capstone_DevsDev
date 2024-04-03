// instance for router 
const generalRouter = require('express').Router()
const apiRouter = require('express').Router()

// importing handlers
const { homeHandler, readData, createData, updateData, readSingleData } = require('./handler')

// Get req in home
generalRouter.get('/',homeHandler)

// Get request for API 
apiRouter.get( '/data', readData )

// Get request for single data 
apiRouter.get( '/data/postdetails/:id', readSingleData )

// Post request for adding data
apiRouter.post( '/data/create', createData )

// Put request for Updating data
apiRouter.put( '/data/update/:id',updateData )

module.exports = {
    generalRouter,
    apiRouter,
}