import mongoose, { Model, Schema } from 'mongoose'
import { IExpense } from '../../interfaces'

const expenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
    enum: ['food', 'transport', 'entertainment', 'health', 'education', 'other']
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
}, {
  timestamps: true,
})

const Expense: Model<IExpense> = mongoose.models.Expense || mongoose.model('Expense', expenseSchema)

export default Expense