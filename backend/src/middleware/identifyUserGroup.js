import { User } from '../../db/models/User.js'

async function idetifyUserGroup(req, res, next) {
  let user = await User.findById(req.user._id).populate({
    path: 'groupID',
    select: '_id'
  })

  if (!user) res.status(400).json({ message: 'User not found!' })

  req.user.groupID = user.groupID._id

  next()
}

export { idetifyUserGroup }
