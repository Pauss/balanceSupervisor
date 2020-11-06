import express from 'express'
import { auth } from '../middleware/auth.js'

let router = express.Router()

router.get('/', auth, (req, res) => {
  res.send('Log Costs')
})

export { router as logCostRouter }
