// instance for router 
const generalRouter = require('express').Router()
const apiRouter = require('express').Router()

// importing handlers
const { homeHandler } = require('./handler')

// Get req in home
generalRouter.get('/',homeHandler)

module.exports = {
    generalRouter,
    apiRouter,
}