import express from 'express'
import { auth } from '../middleware/auth.js'
import { validate, LogCost } from '../../db/models/LogCost.js'

let router = express.Router()

router.post('/log', auth, async (req, res) => {
  const { error } = validate(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  let log = req.body

  log.cost = parseFloat(log.cost)

  const newLog = new LogCost(log)

  if (!newLog) return res.status(400).send(error.details[0].message)

  await newLog.save()

  res.status(200).send('Success')
})

export { router as logCostRouter }
