import Joi from 'joi'
import { mongoose } from '../connection.js'

const logSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
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
const labels = ['food', 'house-bills', 'car-diesel', 'medicines', 'clothes', 'others']

function validateLog(logCost) {
  const schema = Joi.object({
    label: Joi.any().valid('food', 'house-bills', 'car-diesel', 'medicines', 'clothes', 'others').required(),
    cost: Joi.number().required(),
    userID: Joi.required()
  })

  return schema.validate(logCost)
}

export { LogCost, validateLog as validate, labels }
