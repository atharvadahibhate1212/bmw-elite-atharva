import 'dotenv/config'
import mongoose from 'mongoose'
import { VehicleModel } from './models.js'
import { seedVehicles } from './seedData.js'
if(!process.env.MONGODB_URI){console.error('Set MONGODB_URI in server/.env before running the seed script.');process.exit(1)}
await mongoose.connect(process.env.MONGODB_URI)
await VehicleModel.deleteMany({})
await VehicleModel.insertMany(seedVehicles.map(({_id,...v})=>v))
console.log(`Seeded ${seedVehicles.length} illustrative vehicle records.`)
await mongoose.disconnect()
