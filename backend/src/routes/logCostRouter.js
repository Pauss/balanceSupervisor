import express from 'express'
import { auth } from '../middleware/auth.js'
import { validate, LogCost, labels } from '../../db/models/LogCost.js'
import { queries } from '../../db/Queries.js'
import Joi from 'joi'
import { idetifyUserGroup } from '../middleware/identifyUserGroup.js'

let router = express.Router()

router.post('/log', auth, async (req, res) => {
  const { error } = validate(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  let log = req.body

  log.cost = parseFloat(log.cost)

  const newLog = new LogCost(log)

  if (!newLog) return res.status(400).send(error.details[0].message)

  await newLog.save()

  res.send('Success')
})

router.get('/currentLogs', auth, idetifyUserGroup, async (req, res) => {
  console.log(req.user._id)

  console.log(req.user.groupID)

  let total = []

  const fn = (label) => {
    return queries.getCurrentMonthLogs(label, req.user.groupID)
  }

  const requests = labels.map(fn)
  const results = await Promise.all(requests)

  if (!results) return res.status(500).send('Internal Server Error!')

  res.json(results)
})

router.post('/history', auth, idetifyUserGroup, async (req, res) => {
  const schema = Joi.object({
    skip: Joi.number().integer().min(0)
  })

  const result = schema.validate(req.body)
  if (result.error) return res.status(400).send(result.error.details[0].message)

  const results = await queries.getAllLogs(req.body.skip, req.user.groupID)

  if (!results) return res.json({ results: [], message: 'No Data!' })

  let count = await queries.getAllLogsCount(req.user.groupID)

  if (!count) return res.json({ results: [], message: 'No Data!' })

  count = Math.ceil(count / 20)

  res.json({ results, count })
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

  //todo
  res.send('Item deleted!')
})

export { router as logCostRouter }
