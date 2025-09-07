
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import customerRoutes from './routes/customers.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_crm'
const PORT = process.env.PORT || 4000
await mongoose.connect(MONGO_URI, { dbName: 'mern_crm' })
console.log('MongoDB connected')

app.get('/', (req,res)=>res.json({ ok:true, message:'MERN CRM API' }))
app.use('/api/auth', authRoutes)
app.use('/api/customers', customerRoutes)

app.use((req,res)=>res.status(404).json({ message:'Not Found' }))
app.use((err,req,res,next)=>{
  console.error(err)
  res.status(err.status||500).json({ message: err.message || 'Server error' })
})

app.listen(PORT, ()=> console.log(`API running on http://localhost:${PORT}`))
