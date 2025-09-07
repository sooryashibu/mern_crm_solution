
import React, { useState } from 'react'
import { api } from '../api'

export default function Register({ onAuthed }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const data = await api('/auth/register', {
        method:'POST',
        body: JSON.stringify({ name, email, password })
      })
      localStorage.setItem('token', data.token)
      onAuthed(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display:'grid', gap:12, maxWidth:360 }}>
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
      <input placeholder="Password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)} type="password" minLength={6} required />
      {error && <div style={{ color:'crimson' }}>{error}</div>}
      <button disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
    </form>
  )
}
