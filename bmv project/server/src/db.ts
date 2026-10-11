import mongoose from 'mongoose'
import { VehicleModel } from './models.js'
import { seedVehicles } from './seedData.js'

let connectionPromise: Promise<typeof mongoose> | null = null

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not configured')
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI)
      .then(async (db) => {
        if (await VehicleModel.countDocuments() === 0) {
          await VehicleModel.insertMany(
            seedVehicles.map(({ _id, ...vehicle }) => vehicle)
          )
        }
        return db
      })
      .catch((error) => {
        connectionPromise = null
        throw error
      })
  }

  return connectionPromise
}
