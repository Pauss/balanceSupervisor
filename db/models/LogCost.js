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
  const schema = Joi.object({
    label: Joi.string().min(3).max(50).required(),
    cost: Joi.number().required(),
    userID: Joi.required()
  })

  return schema.validate(logCost)
}

export { LogCost, validateLog as validate }
