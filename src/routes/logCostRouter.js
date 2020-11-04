import express from 'express'

let router = express.Router()

router.get('/', (req, res) => {
  res.send('Log Costs')
})

export { router as logCostRouter }
