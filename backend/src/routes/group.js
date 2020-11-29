import express from 'express'
import { auth } from '../middleware/auth.js'
import { validateGroup, Group } from '../../db/models/Group.js'
import { User } from '../../db/models/User.js'

let router = express.Router()

router.post('/create-group', auth, async (req, res) => {
  const { error } = validateGroup(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  let group = req.body

  const newGroup = new Group(group)

  if (!newGroup) return res.status(400).send(error.details[0].message)

  await newGroup.save()

  res.json({ message: 'Success' })
})

router.get('/show', auth, async (req, res) => {
  const groups = await Group.find({})

  if (groups.length === 0) return res.json({ message: 'No Data' })

  res.json({ data: groups })
})

router.post('/add-member', auth, async (req, res) => {
  const { groupName } = req.body
  const userID = req.user._id

  const group = await Group.findOne({ name: groupName })

  if (group.length === 0) return res.json({ message: 'Group not found!' })

  console.log(group)

  let user = await User.findByIdAndUpdate(userID, { name: 'test', groupID: group._id }, { new: true })

  if (!user.groupID) return res.json({ message: 'Could not set group_id to user!' })

  res.json({ message: 'Success' })
})

export { router as groupRouter }
