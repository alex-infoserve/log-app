const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')

//!custom script
require('dotenv').config()
const logs = require('./api/logs')
const middlewares = require('./middlewares')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()
app.use(helmet())
app.use(morgan('common'))
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
)
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Hello'
  })
})

app.use('/api/logs', logs)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

const port = process.env.PORT || 1337
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
