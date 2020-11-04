import Joi from 'joi'
import { mongoose } from '../connection.js'

const logSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    min: 3,
    max: 50
  },
  cost: {
    type: Number,
    required: true
  },
  created: { type: Date, default: Date.now },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const LogCost = mongoose.model('LogCost', logSchema)

function validateLog(logCost) {
  const schema = {
    label: Joi.string().min(5).max(50).required(),
    cost: Joi.Number().required()
  }

  return Joi.validate(logCost, schema)
}

export { LogCost, validateLog as validate }
