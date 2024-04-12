// instance for router 
const generalRouter = require('express').Router()
const apiRouter = require('express').Router()

// importing handlers
const { homeHandler, readData, createData, updateData, readSingleData, updatePfp, saveData, createUser, deleteData, savedData } = require('./handler')

// Get req in home
generalRouter.get('/',homeHandler)

// Get request for API 
apiRouter.get( '/data', readData )

// Get request for saved page 
apiRouter.get( '/data/saved/:userId', savedData )

// Get request for single data 
apiRouter.get( '/data/postdetails/:id', readSingleData )

// Post request for adding data
apiRouter.post( '/data/create', createData )

// Post request for adding data
apiRouter.post( '/data/create/user', createUser )

// Post request for adding data
apiRouter.post( '/data/save', saveData )

// Put request for Updating data
apiRouter.put( '/data/update/:id',updateData )

// Put request for Updating data
apiRouter.patch( '/data/update/pfp/:id',updatePfp )

// Delete request for deleting data
apiRouter.delete( '/data/delete', deleteData )

module.exports = {
    generalRouter,
    apiRouter,
}