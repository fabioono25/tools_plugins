const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose

// DB (mongoose using the promises API from Node)
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb') //port: 27017

// Test
server.get('/', (req, res, next) => res.send('Backend'))

// Server
server.listen(3000)