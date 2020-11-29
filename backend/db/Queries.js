import { User } from './models/User.js'
import { LogCost } from './models/LogCost.js'
import Debug from 'debug'
import bcrypt from 'bcrypt'

const debug = Debug('db-queries')

class Queries {
  async createUser(userInput) {
    try {
      const newUser = new User(userInput)

      const salt = await bcrypt.genSalt(10)
      newUser.password = await bcrypt.hash(newUser.password, salt)

      await newUser.save()
    } catch (err) {
      debug('Error when creating new user.')
    }
  }

  async createLogCost(logCost) {
    try {
      const newLog = new LogCost(logCost)

      await newLog.save()
    } catch (err) {
      debug('Error when creating new logCost.')
    }
  }

  async getCurrentMonthLogs(label, id_user) {
    //TODO - get user group in a middleWare function

    let currentDate = new Date()
    let month = currentDate.getMonth()
    let year = currentDate.getFullYear()

    let startDate = new Date(year, month, 1, 0, 0, 0)

    let user = await User.findById(id_user).populate({
      path: 'groupID',
      select: '_id'
    })

    const group_id = user.groupID._id

    let result = await LogCost.find({ label: label, created: { $gte: startDate, $lte: currentDate } }).populate({
      path: 'userID',
      select: ['name', 'groupID'],
      match: { groupID: { $eq: group_id } }
    })

    result = result.filter((log) => {
      if (log.userID) return log
    })

    return result
  }

  async getAllLogs(skip, id_user) {
    let user = await User.findById(id_user).populate({
      path: 'groupID',
      select: '_id'
    })

    const group_id = user.groupID._id

    let result = await LogCost.find({})
      .sort({ created: -1 })
      .limit(20)
      .skip(skip)
      .populate({ path: 'userID', select: 'name', match: { groupID: { $eq: group_id } } })

    result = result.filter((log) => {
      if (log.userID) return log
    })

    return result
  }

  async getAllLogsCount(id_user) {
    let user = await User.findById(id_user).populate({
      path: 'groupID',
      select: '_id'
    })

    const group_id = user.groupID._id

    let result = await LogCost.find({}).populate({ path: 'userID', select: 'name', match: { groupID: { $eq: group_id } } })

    result = result.filter((log) => {
      if (log.userID) return log
    })

    console.log(result.length)

    return result.length
  }

  async deleteCost(id) {
    try {
      let result = await LogCost.findByIdAndDelete({ _id: id })

      return result
    } catch (err) {
      return 0
    }
  }
}

let queries = new Queries()

export { queries }
