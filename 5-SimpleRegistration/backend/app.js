const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Client = require('./client.model')
const cors = require('cors')

mongoose
  .connect('mongodb://db/mydb') //port: 27017
  .then(() => {
      const server = express()

      // Middlewares
      server.use(bodyParser.urlencoded({extended: true}))
      server.use(bodyParser.json())
      server.use(cors())

      // Test
      //server.get('/', (req, res, next) => res.send('Backend'))
      require("./app/routes/turorial.routes")(server);

      // Server
      server.listen(3000, () => {
        console.warn('Server has started!')
      })
  })

// const express = require('express')
// const restful = require('node-restful')
// const server = express()
// const mongoose = restful.mongoose
// const bodyParser = require('body-parser')
// const cors = require('cors')

// // Database
// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://db/mydb')

// // Middlewares
// server.use(bodyParser.urlencoded({extended:true}))
// server.use(bodyParser.json())
// server.use(cors())

// // ODM
// const Client = restful.model('Client', {
//     name: { type: String, required: true }
// })

// // Rest API
// Client.methods(['get', 'post', 'put', 'delete'])
// Client.updateOptions({new: true, runValidators: true})

// // Routes
// Client.register(server, '/clients')

// // Start Server
// server.listen(3000)