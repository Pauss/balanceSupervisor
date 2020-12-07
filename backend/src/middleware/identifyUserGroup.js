import { User } from '../../db/models/User.js'
import Debug from 'debug'

const debug = Debug('userGroup-middleware')

async function idetifyUserGroup(req, res, next) {
  let user = await User.findById(req.user._id).populate({
    path: 'groupID',
    select: '_id'
  })

  if (!user) res.status(400).json({ message: 'User not found!' })

  if (user.groupID) req.user.groupID = user.groupID._id
  else debug('User is not member of any group.')

  next()
}

export { idetifyUserGroup }
