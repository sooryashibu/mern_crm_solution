
import { Router } from 'express'
import Customer from '../models/Customer.js'
import { auth } from '../middleware/auth.js'

const router = Router()

// all routes require auth
router.use(auth)

router.get('/', async (req,res,next)=>{
  try {
    const q = (req.query.q || '').trim()
    const filter = { userId: req.user.id }
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
      ]
    }
    const items = await Customer.find(filter).sort({ createdAt: -1 })
    res.json(items)
  } catch (e) { next(e) }
})

router.post('/', async (req,res,next)=>{
  try {
    const { name, email, phone, notes } = req.body || {}
    if (!name || !email) return res.status(400).json({ message:'Name and email required' })
    const item = await Customer.create({ userId: req.user.id, name, email, phone, notes })
    res.status(201).json(item)
  } catch (e) { next(e) }
})

router.put('/:id', async (req,res,next)=>{
  try {
    const { id } = req.params
    const { name, email, phone, notes } = req.body || {}
    if (!name || !email) return res.status(400).json({ message:'Name and email required' })
    const updated = await Customer.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { name, email, phone, notes },
      { new: true }
    )
    if (!updated) return res.status(404).json({ message:'Not found' })
    res.json(updated)
  } catch (e) { next(e) }
})

router.delete('/:id', async (req,res,next)=>{
  try {
    const { id } = req.params
    const deleted = await Customer.findOneAndDelete({ _id: id, userId: req.user.id })
    if (!deleted) return res.status(404).json({ message:'Not found' })
    res.json({ ok:true })
  } catch (e) { next(e) }
})

export default router
