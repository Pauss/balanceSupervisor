import express from 'express'
import { User, validate } from '../../db/models/User.js'
import { queries } from '../../db/Queries.js'
import _ from 'lodash'
import { auth } from '../middleware/auth.js'

let router = express.Router()

router.get('/', (req, res) => {
  res.send('Users')
})

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  res.send(user)
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('User already registered.')

  user = new User(_.pick(req.body, ['name', 'email', 'password']))

  await queries.createUser(user)

  const token = user.generateAuthToken()

  res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']))
})

export { router as userRouter }
