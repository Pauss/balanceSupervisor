import express from 'express'
import { authMiddleWare } from '../middleware/auth.js'

let router = express.Router()

router.get('/', authMiddleWare, (req, res) => {
  res.send('Log Costs')
})

export { router as logCostRouter }
