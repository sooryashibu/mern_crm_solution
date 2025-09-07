
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = Router()

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

router.post('/register', async (req,res,next)=>{
  try {
    const { name, email, password } = req.body || {}
    if (!name || !email || !password) return res.status(400).json({ message:'All fields are required' })
    if (!validEmail(email)) return res.status(400).json({ message:'Invalid email' })
    if (String(password).length < 6) return res.status(400).json({ message:'Password must be at least 6 characters' })

    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ message:'Email already in use' })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret_change_me', { expiresIn: '7d' })
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } })
  } catch (e) { next(e) }
})

router.post('/login', async (req,res,next)=>{
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ message:'Email and password required' })
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message:'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message:'Invalid credentials' })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret_change_me', { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
  } catch (e) { next(e) }
})

export default router
