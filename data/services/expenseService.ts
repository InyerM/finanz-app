import { IExpense } from "../../interfaces"
import { db } from "../database"
import { Expense } from "../models"

interface IResponse {
  ok: boolean
  error?: string
  expense?: IExpense
  expenses?: IExpense[]
}

export const getExpenses = async (userId: string): Promise<IResponse> => {
  try {
    await db.connect()

    const expenses = await Expense.find({ userId }).select('name description category amount date createdAt updatedAt')

    await db.disconnect()

    if (!expenses || expenses.length === 0) return { error: 'No expenses found', ok: false }

    return {
      expenses,
      ok: true,
    }
  } catch (error: any) {
    return {
      ok: false,
      error: error.error,
    }
  }
}

export const createExpense = async (userId: string, expense: IExpense): Promise<IResponse> => {
  try {
    await db.connect()

    const newExpense = await Expense.create({ ...expense, userId })

    await db.disconnect()

    if (!newExpense) return { error: 'Error creating expense', ok: false }

    return {
      expense: newExpense,
      ok: true,
    }
  } catch (error: any) {
    return {
      ok: false,
      error: error.error,
    }
  }

}

export const updateExpense = async (expense: IExpense): Promise<IResponse> => {
  try {
    await db.connect()

    const updatedExpense = await Expense.findByIdAndUpdate(expense._id, expense, { new: true })

    await db.disconnect()

    if (!updatedExpense) return { error: 'Error updating expense', ok: false }

    return {
      expense: updatedExpense,
      ok: true,
    }
  } catch (error: any) {
    return {
      ok: false,
      error: error.error,
    }
  }
}

export const deleteExpense = async (_id: string): Promise<IResponse> => {
  try {
    await db.connect()

    const deletedExpense = await Expense.findByIdAndDelete(_id)

    await db.disconnect()

    if (!deletedExpense) return { error: 'Error deleting expense', ok: false }

    return {
      expense: deletedExpense,
      ok: true,
    }

  } catch (error: any) {
    return {
      ok: false,
      error: error.error,
    }
  }
}

export const getExpenseByName = async (name: string, userId: string): Promise<IResponse> => {
  try {
    await db.connect()

    const expense = await Expense.findOne({ name, userId }).select('name description category amount date createdAt updatedAt')

    await db.disconnect()

    if (!expense) return { error: 'No expense found', ok: false }

    return {
      expense,
      ok: true,
    }

  } catch (error: any) {
    return {
      ok: false,
      error: error.error,
    }
  }
}
