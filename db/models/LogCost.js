import { mongoose } from '../conection.js'

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
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const LogCost = mongoose.model('LogCost', logSchema)

export { LogCost }
