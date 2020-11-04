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
}

let queries = new Queries()

export { queries }
