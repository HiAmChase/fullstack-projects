const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config({ path: './config.env' })
const port = process.env.PORT || 5000
const connectDB = require('./db/connect')
const task = require('./routes/task')

app.use(cors())
app.use(express.json())
app.use('/task', task)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log('server is running')
    })
  } catch (error) {
    console.log(error)
  }
}

start()
