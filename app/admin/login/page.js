'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Invalid credentials');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(24,183,189,.08), rgba(232,214,248,.08))'}}>
      <div style={{width: '100%', maxWidth: '420px', padding: '40px', background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,.1)'}}>
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <img src="/images/mermaidalay-mermaid-emblem.png" alt="Mermaidalay" style={{width: '60px', height: '60px', margin: '0 auto 16px'}} />
          <h1 style={{color: '#073d63', marginBottom: '8px', fontSize: '24px', fontWeight: 700}}>Admin Login</h1>
          <p style={{color: '#627984', margin: 0}}>Mermaidalay Dashboard</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <label style={{display: 'block', marginBottom: '20px'}}>
            <span style={{display: 'block', color: '#073d63', fontWeight: '600', marginBottom: '8px', fontSize: '14px'}}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@mermaidalay.com"
              required
              style={{width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box', transition: 'border-color 0.2s'}}
              onFocus={(e) => e.target.style.borderColor = '#00a0b8'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </label>
          
          <label style={{display: 'block', marginBottom: '24px'}}>
            <span style={{display: 'block', color: '#073d63', fontWeight: '600', marginBottom: '8px', fontSize: '14px'}}>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box', transition: 'border-color 0.2s'}}
              onFocus={(e) => e.target.style.borderColor = '#00a0b8'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </label>
          
          {error && (
            <div style={{padding: '12px', background: '#ffebee', border: '1px solid #ef5350', borderRadius: '8px', marginBottom: '20px'}}>
              <p style={{color: '#c62828', margin: 0, fontSize: '14px'}}>⚠️ {error}</p>
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%', 
              padding: '14px', 
              background: loading ? '#ccc' : '#00a0b8', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: '600', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              fontSize: '16px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => !loading && (e.target.style.background = '#008a9f')}
            onMouseOut={(e) => !loading && (e.target.style.background = '#00a0b8')}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div style={{marginTop: '24px', padding: '16px', background: '#f5f5f5', borderRadius: '8px'}}>
          <p style={{margin: 0, fontSize: '12px', color: '#666', lineHeight: '1.5'}}>
            <strong>First time setup?</strong><br />
            Follow the <a href="/FIREBASE-SETUP.md" style={{color: '#00a0b8', textDecoration: 'none'}}>Firebase Setup Guide</a> to create your admin account.
          </p>
        </div>
        
        <p style={{textAlign: 'center', color: '#999', fontSize: '12px', marginTop: '24px'}}>
          <a href="/" style={{color: '#00a0b8', textDecoration: 'none'}}>← Back to website</a>
        </p>
      </div>
    </main>
  );
}
