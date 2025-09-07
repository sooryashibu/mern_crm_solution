
import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function Customers() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [form, setForm] = useState({ name:'', email:'', phone:'', notes:'' })
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  async function load() {
    try {
      const data = await api(`/customers${q ? `?q=${encodeURIComponent(q)}`:''}`)
      setItems(data)
    } catch (err) { setError(err.message) }
  }
  useEffect(() => { load() }, [q])

  async function createOrUpdate(e) {
    e.preventDefault()
    setError('')
    try {
      if (editingId) {
        const updated = await api(`/customers/${editingId}`, { method:'PUT', body: JSON.stringify(form) })
        setItems(items => items.map(i => i._id === editingId ? updated : i))
        setEditingId(null)
      } else {
        const created = await api('/customers', { method:'POST', body: JSON.stringify(form) })
        setItems(items => [created, ...items])
      }
      setForm({ name:'', email:'', phone:'', notes:'' })
    } catch (err) { setError(err.message) }
  }

  async function remove(id) {
    if (!confirm('Delete this customer?')) return
    try {
      await api(`/customers/${id}`, { method:'DELETE' })
      setItems(items => items.filter(i => i._id !== id))
    } catch (err) { setError(err.message) }
  }

  function edit(i) {
    setEditingId(i._id)
    setForm({ name:i.name, email:i.email, phone:i.phone||'', notes:i.notes||'' })
  }

  return (
    <div>
      <h2>Customers</h2>
      <div style={{ display:'flex', gap:8, marginBottom:12 }}>
        <input placeholder="Search by name/email..." value={q} onChange={e => setQ(e.target.value)} />
        <button onClick={load}>Refresh</button>
      </div>
      <form onSubmit={createOrUpdate} style={{ display:'grid', gap:8, marginBottom:16, maxWidth:600 }}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} type="email" required />
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
        <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
        <div style={{ display:'flex', gap:8 }}>
          <button type="submit">{editingId ? 'Update' : 'Create'}</button>
          {editingId && <button type="button" onClick={()=>{setEditingId(null); setForm({ name:'', email:'', phone:'', notes:'' })}}>Cancel</button>}
        </div>
      </form>

      {error && <div style={{ color:'crimson', marginBottom:12 }}>{error}</div>}

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Notes</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i._id}>
              <td>{i.name}</td>
              <td>{i.email}</td>
              <td>{i.phone}</td>
              <td>{i.notes}</td>
              <td>
                <button onClick={()=>edit(i)}>Edit</button>
                <button onClick={()=>remove(i._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {!items.length && <tr><td colSpan="5" style={{ textAlign:'center' }}>No customers yet</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
