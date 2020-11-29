import mongoose from 'mongoose'
import Debug from 'debug'
import {} from 'dotenv/config.js'

const debug = Debug('db-connection')

const db_connect = {
  url_db: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_IP}:${process.env.DB_PORT}/balanceSupervisor?authSource=admin`,
  params: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
}

try {
  mongoose.set('useCreateIndex', true)
  await mongoose.connect(db_connect.url_db, db_connect.params)
  debug('Connected to MongoDB...')
} catch (err) {
  debug('Could not connect to MongoDB...', err.messsage)
  debug(`connectionURL: ${db_connect.url_db}`)
}

export { mongoose }
