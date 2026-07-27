'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_PASSWORD = 'mermaid2026';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  return (
    <main style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(24,183,189,.08), rgba(232,214,248,.08))'}}>
      <div style={{width: '100%', maxWidth: '400px', padding: '40px', background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,.1)'}}>
        <h1 style={{color: '#073d63', marginBottom: '8px', fontSize: '24px'}}>Admin Login</h1>
        <p style={{color: '#627984', marginBottom: '32px'}}>Mermaidalay Dashboard</p>
        <form onSubmit={handleLogin}>
          <label style={{display: 'block', marginBottom: '16px'}}>
            <span style={{display: 'block', color: '#073d63', fontWeight: '600', marginBottom: '8px'}}>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box'}}
            />
          </label>
          {error && <p style={{color: '#e96eaa', marginBottom: '16px', fontSize: '14px'}}>{error}</p>}
          <button type="submit" style={{width: '100%', padding: '12px', background: '#e96eaa', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '16px'}}>
            Login
          </button>
        </form>
        <p style={{textAlign: 'center', color: '#999', fontSize: '12px', marginTop: '24px'}}>Demo password: mermaid2026</p>
      </div>
    </main>
  );
}
