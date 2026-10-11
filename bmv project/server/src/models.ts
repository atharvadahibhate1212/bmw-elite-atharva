import mongoose, { Schema } from 'mongoose'
const VehicleSchema = new Schema({
  name:{type:String,required:true,index:true}, series:{type:String,required:true,index:true},
  year:{type:Number,required:true}, category:{type:String,required:true,index:true}, price:{type:Number,required:true,index:true},
  fuel:{type:String,required:true}, transmission:{type:String,required:true}, drivetrain:{type:String,required:true},
  power:{type:String,required:true}, torque:{type:String,required:true}, acceleration:{type:String,required:true},
  range:{type:String,required:true}, seats:{type:Number,required:true}, image:{type:String,required:true},
  accent:{type:String,default:'#1688f8'}, description:{type:String,required:true}, featured:{type:Boolean,default:false},
  market:{type:String,default:'India — demo'}, sourceUrl:{type:String,default:''}, lastVerifiedAt:{type:Date}
},{timestamps:true})
const BookingSchema = new Schema({
  reference:{type:String,required:true,unique:true,index:true},name:{type:String,required:true},
  email:{type:String,required:true,lowercase:true,trim:true},phone:{type:String,required:true},
  vehicle:{type:String,required:true},date:{type:String,required:true},time:{type:String,required:true},
  message:{type:String,default:''},status:{type:String,enum:['requested','confirmed','cancelled'],default:'requested'}
},{timestamps:true})
export const VehicleModel = mongoose.models.Vehicle || mongoose.model('Vehicle',VehicleSchema)
export const BookingModel = mongoose.models.Booking || mongoose.model('Booking',BookingSchema)
