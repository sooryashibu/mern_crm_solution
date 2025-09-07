
import React from 'react'

export default function Navbar({ view, setView, onLogout, user }) {
  const authed = !!localStorage.getItem('token')
  return (
    <header style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0' }}>
      <h1 style={{ fontSize: 20 }}>MERN CRM</h1>
      <nav style={{ display:'flex', gap:12 }}>
        {!authed && (
          <>
            <button onClick={() => setView('login')}>Login</button>
            <button onClick={() => setView('register')}>Register</button>
          </>
        )}
        {authed && (
          <>
            <span>Hi{user?.name ? `, ${user.name}` : ''}</span>
            <button onClick={() => setView('customers')}>Customers</button>
            <button onClick={onLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  )
}
