import express from 'express'
import { auth } from '../middleware/auth.js'
import { validate, LogCost, labels } from '../../db/models/LogCost.js'
import { queries } from '../../db/Queries.js'
import Joi from 'joi'

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

  res.send(results).status(200)
})

router.post('/history', auth, async (req, res) => {
  const schema = Joi.object({
    skip: Joi.number().integer().min(0)
  })

  const result = schema.validate(req.body)
  if (result.error) return res.status(400).send(result.error.details[0].message)

  const results = await queries.getAllLogs(req.body.skip)

  if (!results) return res.send('No Data!')

  let count = await queries.getAllLogsCount()

  if (!count) return res.send('No Data!')

  count = Math.ceil(count / 20)

  res.status(200).send({ results, count })
})

router.delete('/delete-log', auth, async (req, res) => {
  const schema = Joi.object({
    id: Joi.string()
  })

  const result = schema.validate(req.body)

  console.log('result', result)

  if (result.error) return res.status(400).send(result.error.details[0].message)

  const results = await queries.deleteCost(req.body.id)

  console.log(results)

  if (!results) return res.send('Log not found!')

  res.status(200).send('Item deleted!')
})

export { router as logCostRouter }
