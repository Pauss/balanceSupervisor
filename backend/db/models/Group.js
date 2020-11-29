import { mongoose } from '../connection.js'
import Joi from 'joi'

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
    default: 'general'
  }
})

const Group = mongoose.model('Group', groupSchema)

function validateGroup(group) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required()
  })

  return schema.validate(group)
}

export { Group, validateGroup }
