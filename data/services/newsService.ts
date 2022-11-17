import { db } from "../database"
import { New } from "../models"

export const getAllNews = async () => {
  try {
    await db.connect()

    const news = await New.find({}).lean()

    db.disconnect()

    if (!news) {
      return { message: "News not found" }
    }

    return {
      news,
    }
  } catch (error) {
    return { message: "Something went wrong" }
  }
}

export const getAllIds = async () => {
  try {
    await db.connect()

    const news = await New.find({}).lean().select('_id')

    db.disconnect()

    if (!news) {
      return { message: "News not found" }
    }

    return {
      ids: news
    }
  } catch (error) {
    return { message: "Something went wrong" }
  }
}

export const getNewsById = async (_id: string) => {
  try {
    await db.connect()

    const thisNew = await New.findOne({ _id }).lean()

    await db.disconnect()

    if (!thisNew) {
      return { message: "New not found" }
    }

    return {
      thisNew,
    }
  } catch (error) {
    return { message: "Something went wrong" }
  }
}