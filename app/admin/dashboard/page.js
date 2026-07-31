'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getAllBookings, updateBookingStatus } from '../../../lib/bookingService';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, paid, completed
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadBookings();
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  async function loadBookings() {
    const data = await getAllBookings();
    setBookings(data);
  }

  async function handleStatusChange(bookingId, newStatus) {
    const result = await updateBookingStatus(bookingId, newStatus);
    if (result.success) {
      loadBookings(); // Reload bookings
    } else {
      alert('Failed to update status: ' + result.error);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  if (loading) {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
        <p>Loading...</p>
      </div>
    );
  }

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    paid: bookings.filter(b => b.status === 'paid').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  return (
    <div style={{minHeight: '100vh', background: '#f5f5f5'}}>
      {/* Header */}
      <header style={{background: 'white', borderBottom: '1px solid #e0e0e0', padding: '16px 32px'}}>
        <div style={{maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <img src="/images/mermaidalay-mermaid-emblem.png" alt="Mermaidalay" style={{width: '40px', height: '40px'}} />
            <div>
              <h1 style={{margin: 0, fontSize: '20px', fontWeight: 600}}>Admin Dashboard</h1>
              <p style={{margin: 0, fontSize: '13px', color: '#666'}}>{user?.email}</p>
            </div>
          </div>
          <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
            <button 
              onClick={loadBookings}
              style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '6px', background: 'white', cursor: 'pointer'}}
            >
              🔄 Refresh
            </button>
            <a 
              href="/"
              style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '6px', background: 'white', textDecoration: 'none', color: '#333'}}
            >
              🏠 Home
            </a>
            <button 
              onClick={handleLogout}
              style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '6px', background: 'white', cursor: 'pointer'}}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main style={{maxWidth: '1400px', margin: '0 auto', padding: '32px'}}>
        {/* Stats Cards */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px'}}>
          <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '14px', color: '#666', marginBottom: '8px'}}>Total Bookings</div>
            <div style={{fontSize: '32px', fontWeight: 'bold', color: '#00a0b8'}}>{stats.total}</div>
          </div>
          <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '14px', color: '#666', marginBottom: '8px'}}>Pending</div>
            <div style={{fontSize: '32px', fontWeight: 'bold', color: '#ff9800'}}>{stats.pending}</div>
          </div>
          <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '14px', color: '#666', marginBottom: '8px'}}>Confirmed</div>
            <div style={{fontSize: '32px', fontWeight: 'bold', color: '#2196f3'}}>{stats.confirmed}</div>
          </div>
          <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '14px', color: '#666', marginBottom: '8px'}}>Paid</div>
            <div style={{fontSize: '32px', fontWeight: 'bold', color: '#4caf50'}}>{stats.paid}</div>
          </div>
          <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '14px', color: '#666', marginBottom: '8px'}}>Completed</div>
            <div style={{fontSize: '32px', fontWeight: 'bold', color: '#9c27b0'}}>{stats.completed}</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{background: 'white', padding: '16px 24px', borderRadius: '12px', marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
          {['all', 'pending', 'confirmed', 'paid', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: 'none',
                background: filter === status ? '#00a0b8' : '#f0f0f0',
                color: filter === status ? 'white' : '#333',
                cursor: 'pointer',
                fontWeight: 500,
                textTransform: 'capitalize'
              }}
            >
              {status} ({status === 'all' ? stats.total : stats[status]})
            </button>
          ))}
        </div>

        {/* Bookings Table */}
        <div style={{background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
          {filteredBookings.length === 0 ? (
            <div style={{padding: '60px 20px', textAlign: 'center', color: '#999'}}>
              <div style={{fontSize: '48px', marginBottom: '16px'}}>📋</div>
              <p>No bookings found</p>
            </div>
          ) : (
            <div style={{overflowX: 'auto'}}>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{background: '#f9f9f9', borderBottom: '2px solid #e0e0e0'}}>
                    <th style={{padding: '16px', textAlign: 'left', fontWeight: 600, fontSize: '14px'}}>Booking #</th>
                    <th style={{padding: '16px', textAlign: 'left', fontWeight: 600, fontSize: '14px'}}>Customer</th>
                    <th style={{padding: '16px', textAlign: 'left', fontWeight: 600, fontSize: '14px'}}>Event Date</th>
                    <th style={{padding: '16px', textAlign: 'left', fontWeight: 600, fontSize: '14px'}}>Time</th>
                    <th style={{padding: '16px', textAlign: 'left', fontWeight: 600, fontSize: '14px'}}>Package</th>
                    <th style={{padding: '16px', textAlign: 'left', fontWeight: 600, fontSize: '14px'}}>Total</th>
                    <th style={{padding: '16px', textAlign: 'left', fontWeight: 600, fontSize: '14px'}}>Status</th>
                    <th style={{padding: '16px', textAlign: 'left', fontWeight: 600, fontSize: '14px'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} style={{borderBottom: '1px solid #f0f0f0'}}>
                      <td style={{padding: '16px', fontSize: '13px', fontWeight: 600, color: '#00a0b8'}}>
                        {booking.bookingNumber}
                      </td>
                      <td style={{padding: '16px'}}>
                        <div style={{fontSize: '14px', fontWeight: 500}}>{booking.name}</div>
                        <div style={{fontSize: '12px', color: '#666'}}>{booking.email}</div>
                        {booking.phone && <div style={{fontSize: '12px', color: '#666'}}>{booking.phone}</div>}
                      </td>
                      <td style={{padding: '16px', fontSize: '14px'}}>
                        {new Date(booking.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td style={{padding: '16px', fontSize: '14px'}}>{booking.eventTime}</td>
                      <td style={{padding: '16px'}}>
                        <div style={{fontSize: '14px', fontWeight: 500}}>{booking.packageName}</div>
                        {booking.addOns && booking.addOns.length > 0 && (
                          <div style={{fontSize: '12px', color: '#666'}}>+{booking.addOns.length} add-on(s)</div>
                        )}
                      </td>
                      <td style={{padding: '16px', fontSize: '16px', fontWeight: 600}}>
                        ${booking.total?.toLocaleString()}
                      </td>
                      <td style={{padding: '16px'}}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 600,
                          background: 
                            booking.status === 'pending' ? '#fff3e0' :
                            booking.status === 'confirmed' ? '#e3f2fd' :
                            booking.status === 'paid' ? '#e8f5e9' :
                            booking.status === 'completed' ? '#f3e5f5' :
                            '#f5f5f5',
                          color:
                            booking.status === 'pending' ? '#f57c00' :
                            booking.status === 'confirmed' ? '#1976d2' :
                            booking.status === 'paid' ? '#388e3c' :
                            booking.status === 'completed' ? '#7b1fa2' :
                            '#666'
                        }}>
                          {booking.status}
                        </span>
                      </td>
                      <td style={{padding: '16px'}}>
                        <select 
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: '1px solid #ddd',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="paid">Paid</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
