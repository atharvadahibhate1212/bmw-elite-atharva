import mongoose from 'mongoose'
import { connectDatabase } from './db.js'
import express from 'express'
import cors from 'cors'
import { z } from 'zod'
import { VehicleModel, BookingModel } from './models.js'
import { seedVehicles } from './seedData.js'
import type { VehicleRecord } from './types.js'

const app = express()
app.use(cors({origin: process.env.CLIENT_ORIGIN?.split(',') || 'http://localhost:5173'}))
app.use(express.json({limit:'1mb'}))
app.use(async (_req, res, next) => {
  if (!process.env.MONGODB_URI) {
    return next()
  }

  try {
    await connectDatabase()
    next()
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    res.status(503).json({
      message: 'Database is temporarily unavailable.'
    })
  }
})
let memoryVehicles: VehicleRecord[] = [...seedVehicles]
const memoryBookings: any[] = []
const useDb = () => mongoose.connection.readyState === 1
app.get('/api/health',(_req,res)=>res.json({ok:true,service:'BMW ELITE API',database:useDb()?'mongodb':'demo-memory'}))

app.get('/api/vehicles',async(req,res,next)=>{
  try{
    const q=String(req.query.q||'').trim()
    const category=String(req.query.category||'').trim()
    const min=req.query.minPrice===undefined?undefined:Number(req.query.minPrice)
    const max=req.query.maxPrice===undefined?undefined:Number(req.query.maxPrice)
    if(useDb()){
      const filter:any={}
      if(q)filter.$or=[{name:{$regex:q,$options:'i'}},{series:{$regex:q,$options:'i'}},{fuel:{$regex:q,$options:'i'}}]
      if(category&&category!=='All')filter.$or=[...(filter.$or||[]),{category},{series:category}]
      if(Number.isFinite(min)||Number.isFinite(max))filter.price={...(Number.isFinite(min)?{$gte:min}:{}),...(Number.isFinite(max)?{$lte:max}:{})}
      const rows=await VehicleModel.find(filter).sort({featured:-1,price:1}).limit(100).lean()
      return res.json(rows.map((v:any)=>({...v,_id:String(v._id)})))
    }
    let rows=[...memoryVehicles]
    if(q)rows=rows.filter(v=>`${v.name} ${v.series} ${v.fuel}`.toLowerCase().includes(q.toLowerCase()))
    if(category&&category!=='All')rows=rows.filter(v=>v.category===category||v.series===category)
    if(Number.isFinite(min))rows=rows.filter(v=>v.price>=min!)
    if(Number.isFinite(max))rows=rows.filter(v=>v.price<=max!)
    res.json(rows)
  }catch(e){next(e)}
})
app.get('/api/vehicles/featured',async(_req,res,next)=>{try{if(useDb())return res.json(await VehicleModel.find({featured:true}).limit(8).lean());res.json(memoryVehicles.filter(v=>v.featured))}catch(e){next(e)}})
app.get('/api/vehicles/:id',async(req,res,next)=>{try{let v:any;if(useDb())v=await VehicleModel.findById(req.params.id).lean();else v=memoryVehicles.find(x=>x._id===req.params.id);if(!v)return res.status(404).json({message:'Vehicle not found'});res.json(v)}catch(e){next(e)}})

const bookingSchema=z.object({
 name:z.string().trim().min(2).max(100),email:z.string().trim().email().max(180),
 phone:z.string().trim().min(8).max(24),vehicle:z.string().trim().min(2).max(120),
 date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),time:z.string().min(3).max(30),
 message:z.string().max(1000).optional().default('')
})
app.post('/api/bookings',async(req,res,next)=>{
 try{
  const parsed=bookingSchema.safeParse(req.body)
  if(!parsed.success)return res.status(400).json({message:'Please check the form fields.',issues:parsed.error.issues})
  const d=new Date(`${parsed.data.date}T00:00:00`)
  const today=new Date();today.setHours(0,0,0,0)
  if(Number.isNaN(d.getTime())||d<today)return res.status(400).json({message:'Choose today or a future date.'})
  const reference=`BMWE-${Date.now().toString(36).toUpperCase()}`
  const booking={...parsed.data,reference,status:'requested'}
  if(useDb()){
    const conflict=await BookingModel.findOne({date:booking.date,time:booking.time,vehicle:booking.vehicle,status:{$ne:'cancelled'}})
    if(conflict)return res.status(409).json({message:'That model/time slot already has a request. Please choose another slot.'})
    await BookingModel.create(booking)
  }else{
    const conflict=memoryBookings.find(b=>b.date===booking.date&&b.time===booking.time&&b.vehicle===booking.vehicle&&b.status!=='cancelled')
    if(conflict)return res.status(409).json({message:'That model/time slot already has a request. Please choose another slot.'})
    memoryBookings.push({...booking,createdAt:new Date().toISOString()})
  }
  res.status(201).json({message:'Booking request received',reference,status:'requested'})
 }catch(e){next(e)}
})
app.get('/api/bookings',async(_req,res,next)=>{try{if(useDb())return res.json(await BookingModel.find().sort({createdAt:-1}).limit(200).lean());res.json(memoryBookings)}catch(e){next(e)}})
app.get('/api/admin/stats',async(_req,res,next)=>{try{const bookings=useDb()?await BookingModel.countDocuments():memoryBookings.length;const vehicles=useDb()?await VehicleModel.countDocuments():memoryVehicles.length;res.json({vehicles,bookings,pendingBookings:useDb()?await BookingModel.countDocuments({status:'requested'}):memoryBookings.filter(b=>b.status==='requested').length,mode:useDb()?'mongodb':'demo-memory'})}catch(e){next(e)}})

app.use((err:any,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{console.error('API error:',err?.message||err);res.status(500).json({message:'Unexpected server error. Check the API logs.'})})
export default app
