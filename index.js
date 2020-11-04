import express from 'express'
import {} from 'dotenv/config.js'
import Debug from 'debug'
import { logCostRouter } from './src/routes/logCost.js'

const app = express()

const port = process.env.PORT || 3000

const debug = Debug('root')

app.get('/', (req, res) => {
  res.send('Hello to balanceSupervisor')
})

app.use('/costs/', logCostRouter)

app.listen(port, () => debug(`Listening on port ${port}...`))
