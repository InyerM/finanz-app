import mongoose, { Model, Schema } from 'mongoose'
import { INew } from '../../interfaces'

const newSchema = new Schema({
  author: { type: String, required: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  source: { type: String, required: true },
  image: { type: String, required: false },
  category: { type: String, required: true },
  language: { type: String, required: true },
  country: { type: String, required: true },
  published_at: { type: String, required: true },
}, {
  timestamps: true,
})

const New: Model<INew> = mongoose.models.New || mongoose.model('New', newSchema)

export default New