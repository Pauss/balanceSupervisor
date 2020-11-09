import express from 'express'
import { User, validateAuth } from '../../db/models/User.js'
import _ from 'lodash'
import bcrypt from 'bcrypt'

let router = express.Router()

router.get('/', (req, res) => {
  res.send('Users')
})

router.post('/', async (req, res) => {
  const { error } = validateAuth(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid name or password')

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid name or password')

  const token = user.generateAuthToken()

  res.header('x-auth-token', token).send(_.pick(user, ['email']))
})

export { router as authRouter }
