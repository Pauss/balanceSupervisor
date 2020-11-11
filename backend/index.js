import express from 'express'
import {} from 'dotenv/config.js'
import Debug from 'debug'
import { logCostRouter } from './src/routes/logCostRouter.js'
import { userRouter } from './src/routes/userRouter.js'
import { authRouter } from './src/routes/auth.js'
import cors from 'cors'
import morgan from 'morgan'
const app = express()

const port = process.env.PORT || 3000

const debug = Debug('root')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ exposedHeaders: '*' }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello to balanceSupervisor')
})

app.use('/api/costs/', logCostRouter)
app.use('/api/users/', userRouter)
app.use('/api/auth/', authRouter)

app.listen(port, () => debug(`Listening on port ${port}...`))
