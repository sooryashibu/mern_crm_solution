
import React, { useState } from 'react'
import { api } from '../api'

export default function Login({ onAuthed }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const data = await api('/auth/login', {
        method:'POST',
        body: JSON.stringify({ email, password })
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
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
      <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      {error && <div style={{ color:'crimson' }}>{error}</div>}
      <button disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
    </form>
  )
}
