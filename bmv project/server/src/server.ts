import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app.js'
import { VehicleModel } from './models.js'
import { seedVehicles } from './seedData.js'
const port=Number(process.env.PORT||4000)
async function start(){
 if(process.env.MONGODB_URI){
  try{
   await mongoose.connect(process.env.MONGODB_URI)
   ;(globalThis as any).__mongoReady=true
   if(await VehicleModel.countDocuments()===0)await VehicleModel.insertMany(seedVehicles.map(({_id,...v})=>v))
   console.log('MongoDB connected and catalogue checked.')
  }catch(e){console.error('MongoDB connection failed; starting in demo-memory mode.',e);(globalThis as any).__mongoReady=false}
 }
 app.listen(port,()=>console.log(`BMW ELITE API listening on http://localhost:${port}`))
}
start()
