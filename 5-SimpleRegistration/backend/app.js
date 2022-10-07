const express = require('express')
//const restful = require('node-restful')
// const server = express()
//const mongoose = restful.mongoose
const mongoose = require('mongoose')

// DB (mongoose using the promises API from Node)
// mongoose.Promise = global.Promise
mongoose
  .connect('mongodb://db/mydb') //port: 27017
  .then(() => {
      const server = express()

      // Test
      server.get('/', (req, res, next) => res.send('Backend'))

      // Server
      server.listen(3000, () => {
        console.warn('Server has started!')
      })
  })