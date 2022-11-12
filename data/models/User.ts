import mongoose, { Model, Schema } from 'mongoose'
import { IUser } from '../../interfaces'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
  },
}, {
  timestamps: true,
})

const User: Model<IUser> = mongoose.models.User || mongoose.model('User', userSchema)

export default User