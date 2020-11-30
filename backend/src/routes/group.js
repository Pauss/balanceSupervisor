import express from 'express'
import { auth } from '../middleware/auth.js'
import { validateGroup, Group } from '../../db/models/Group.js'
import { User } from '../../db/models/User.js'
import { idetifyUserGroup } from '../middleware/identifyUserGroup.js'

let router = express.Router()

router.post('/create-group', auth, async (req, res) => {
  const { error } = validateGroup(req.body)

  if (error) return res.status(400).json(error.details[0].message)

  let group = req.body

  let result = await Group.findOne({ name: group.name })
  if (result) return res.status(400).json({ message: 'Group already created. Choose different name!' })

  const newGroup = new Group(group)

  if (!newGroup) return res.status(400).json(error.details[0].message)

  //add owner to new group
  newGroup.owner = req.user._id

  await newGroup.save()

  //add groupid to user

  await User.findByIdAndUpdate(req.user._id, { groupID: newGroup._id }, { new: true })

  console.log(newGroup)

  res.json({ message: 'Success' })
})

router.get('/show', auth, async (req, res) => {
  const groups = await Group.find({})

  if (groups.length === 0) return res.json({ message: 'No Data' })

  res.json({ data: groups })
})

router.post('/add-member', auth, async (req, res) => {
  const { groupName, newUser } = req.body
  const userID = req.user._id

  const group = await Group.findOne({ name: groupName })

  //check whether group exists
  if (!group) return res.json({ message: 'Group not found!' })

  //check authorization
  if (group.owner != userID) res.status(401).json({ error: 'Unathorized! Only owner of this group can add/delete members!' })

  //check new user exists in DB
  let checkUser = await User.findOne({ name: newUser })

  if (!checkUser) res.status(400).json({ error: 'User not found!' })

  //check wheter newUser id already a member of this group
  if (String(checkUser._groupID === String(group._id))) return res.json({ message: 'User is already member of this group.' })

  //update new user group
  let user = await User.findByIdAndUpdate(checkUser._id, { groupID: group._id }, { new: true })

  await user.save()

  if (!user.groupID) return res.status(400).json({ message: 'Could not add user to group!' })

  if (String(user.groupID) !== String(group._id))
    return res.json({ message: "Could not add user to the new group! Currently user is member of it's lates group." })

  res.json({ message: 'Success' })
})

//todo - delte member from the group

router.delete('/delete', auth, idetifyUserGroup, async (req, res) => {
  const { groupName } = req.body
})

export { router as groupRouter }
