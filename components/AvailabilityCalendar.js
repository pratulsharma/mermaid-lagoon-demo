'use client';

import { useState, useMemo } from 'react';

export default function AvailabilityCalendar({ onSelectDateTime, selectedDate, selectedTime }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeDate, setActiveDate] = useState(selectedDate || null);

  // Mock availability - in production this would come from your backend/booking system
  const mockAvailability = useMemo(() => {
    const availability = {};
    const today = new Date();
    
    // Generate availability for next 90 days
    for (let i = 7; i < 90; i++) { // Start from 7 days out (minimum booking notice)
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayOfWeek = date.getDay();
      
      // More availability on weekends
      if (dayOfWeek === 6 || dayOfWeek === 0) { // Saturday or Sunday
        availability[dateStr] = ['09:00', '12:00', '15:00', '18:00'];
      } else if (dayOfWeek === 5) { // Friday
        availability[dateStr] = ['15:00', '18:00'];
      } else {
        // Weekdays - limited availability
        availability[dateStr] = Math.random() > 0.6 ? ['10:00', '14:00'] : [];
      }
      
      // Randomly block some dates (already booked)
      if (Math.random() > 0.85) {
        availability[dateStr] = [];
      }
    }
    
    return availability;
  }, []);

  const timeSlotLabels = {
    '09:00': '9:00 AM',
    '10:00': '10:00 AM',
    '12:00': '12:00 PM',
    '14:00': '2:00 PM',
    '15:00': '3:00 PM',
    '18:00': '6:00 PM'
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateClick = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const availability = mockAvailability[dateStr];
    
    if (availability && availability.length > 0) {
      setActiveDate(dateStr);
    }
  };

  const handleTimeSlotClick = (time) => {
    if (activeDate) {
      onSelectDateTime(activeDate, time);
    }
  };

  const renderCalendar = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} style={{ padding: '12px' }} />);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const availability = mockAvailability[dateStr] || [];
      const isPast = date < today;
      const hasAvailability = availability.length > 0;
      const isSelected = activeDate === dateStr;
      
      let dayStyle = {
        padding: '12px',
        textAlign: 'center',
        borderRadius: '8px',
        cursor: hasAvailability ? 'pointer' : 'not-allowed',
        fontWeight: '600',
        fontSize: '14px',
        transition: 'all 0.2s',
        position: 'relative'
      };
      
      if (isPast) {
        dayStyle.color = '#ccc';
        dayStyle.textDecoration = 'line-through';
      } else if (isSelected) {
        dayStyle.background = '#00a0b8';
        dayStyle.color = 'white';
      } else if (hasAvailability) {
        dayStyle.background = '#e0fbff';
        dayStyle.color = '#006b7d';
      } else {
        dayStyle.background = '#f5f5f5';
        dayStyle.color = '#999';
      }
      
      days.push(
        <div
          key={day}
          style={dayStyle}
          onClick={() => !isPast && handleDateClick(day)}
          onMouseEnter={(e) => {
            if (hasAvailability && !isPast && !isSelected) {
              e.currentTarget.style.background = '#b3ecf5';
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (hasAvailability && !isPast && !isSelected) {
              e.currentTarget.style.background = '#e0fbff';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          {day}
          {hasAvailability && !isPast && (
            <div style={{ 
              position: 'absolute', 
              bottom: '2px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: isSelected ? 'white' : '#00a0b8'
            }} />
          )}
        </div>
      );
    }
    
    return days;
  };

  const availableSlots = activeDate ? (mockAvailability[activeDate] || []) : [];

  return (
    <div>
      {/* Calendar */}
      <div style={{ border: '2px solid #c8a4b1', borderRadius: '12px', padding: '16px', background: 'white' }}>
        {/* Month navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <button
            type="button"
            onClick={previousMonth}
            style={{ 
              padding: '8px 12px', 
              border: 'none', 
              background: '#e0fbff', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#006b7d'
            }}
          >
            ←
          </button>
          <h3 style={{ margin: 0, color: '#006b7d', fontSize: '18px', fontWeight: '700' }}>
            {monthNames[month]} {year}
          </h3>
          <button
            type="button"
            onClick={nextMonth}
            style={{ 
              padding: '8px 12px', 
              border: 'none', 
              background: '#e0fbff', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#006b7d'
            }}
          >
            →
          </button>
        </div>

        {/* Day names */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
          {dayNames.map(day => (
            <div key={day} style={{ textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#666', padding: '8px 4px' }}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {renderCalendar()}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '12px', color: '#666', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#e0fbff' }} />
            <span>Available</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#00a0b8' }} />
            <span>Selected</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#f5f5f5' }} />
            <span>Unavailable</span>
          </div>
        </div>
      </div>

      {/* Time slots */}
      {activeDate && availableSlots.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ marginBottom: '12px', color: '#006b7d', fontSize: '16px' }}>
            Available times for {new Date(activeDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
            {availableSlots.map(time => {
              const isSelected = selectedTime === time && selectedDate === activeDate;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleTimeSlotClick(time)}
                  style={{
                    padding: '12px 16px',
                    border: isSelected ? '2px solid #00a0b8' : '2px solid #c8a4b1',
                    borderRadius: '8px',
                    background: isSelected ? '#00a0b8' : 'white',
                    color: isSelected ? 'white' : '#006b7d',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = '#e0fbff';
                      e.currentTarget.style.borderColor = '#00a0b8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = '#c8a4b1';
                    }
                  }}
                >
                  {timeSlotLabels[time]}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeDate && availableSlots.length === 0 && (
        <div style={{ marginTop: '20px', padding: '20px', background: '#fff0f0', borderRadius: '8px', textAlign: 'center', color: '#cc0000' }}>
          <p style={{ margin: 0, fontSize: '14px' }}>No available time slots for this date. Please select another date.</p>
        </div>
      )}
    </div>
  );
}
