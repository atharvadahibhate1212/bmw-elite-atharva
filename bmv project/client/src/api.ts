import { demoVehicles } from './data'
import type { Vehicle } from './types'
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const r = await fetch(`${API}/vehicles`)
    if (!r.ok) throw new Error('API unavailable')
    const data = await r.json()
    return Array.isArray(data) && data.length ? data : demoVehicles
  } catch { return demoVehicles }
}
export async function createBooking(payload: Record<string,string>) {
  const r = await fetch(`${API}/bookings`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
  const data = await r.json().catch(()=>({}))
  if (!r.ok) throw new Error(data.message || 'Could not submit booking. Start the backend and try again.')
  return data
}
export const money = (n:number) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n)
