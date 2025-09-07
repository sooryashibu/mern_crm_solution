
import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String },
  notes: { type: String }
}, { timestamps: true })

export default mongoose.model('Customer', customerSchema)
