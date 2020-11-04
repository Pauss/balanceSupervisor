import { User } from './models/User.js'
import { LogCost } from './models/LogCost.js'
import Debug from 'debug'

const debug = Debug('db-queries')

class Queries {
  async createUser(userInput) {
    try {
      const res = await User.find({ name: userInput })

      if (res.length) {
        const newUser = new User(userInput)

        await newUser.save()
        return true
      }

      return false
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
}

let queries = new Queries()

export { queries }
