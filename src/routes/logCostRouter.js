import express from 'express'
import { auth } from '../middleware/auth.js'
import { validate, LogCost, labels } from '../../db/models/LogCost.js'
import { queries } from '../../db/Queries.js'

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

router.get('/currentLogs', auth, async (req, res) => {
  let total = []

  const fn = (label) => {
    return queries.getCurrentMonthLogs(label)
  }

  const requests = labels.map(fn)
  const results = await Promise.all(requests)

  if (!results) return res.status(500).send('Internal Server Error!')

  total = results.map((result, index) => {
    let totalCost = 0
    result.forEach((log) => {
      totalCost += log.cost
    })
    return totalCost
  })

  res.send(total).status(200)
})

export { router as logCostRouter }
