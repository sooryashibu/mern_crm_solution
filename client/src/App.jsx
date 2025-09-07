
import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Customers from './components/Customers'

export default function App() {
  const [view, setView] = useState(localStorage.getItem('token') ? 'customers' : 'login')
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!localStorage.getItem('token')) setView('login')
  }, [])

  function onAuthed(u) {
    setUser(u)
    setView('customers')
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    setView('login')
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 980, margin: '0 auto', padding: 16 }}>
      <Navbar view={view} setView={setView} onLogout={logout} user={user} />
      <div style={{ marginTop: 24 }}>
        {view === 'login' && <Login onAuthed={onAuthed} />}
        {view === 'register' && <Register onAuthed={onAuthed} />}
        {view === 'customers' && <Customers />}
      </div>
    </div>
  )
}
