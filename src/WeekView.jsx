import React, { useState, useEffect } from 'react';
import './WeekView.css';

const WeekView = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [events, setEvents] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  useEffect(() => {
    // Fetch events from the backend
    fetch('https://organ-backend.onrender.com/events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error('Failed to fetch events:', err));
  }, []);

  useEffect(() => {
    // Save events to the backend whenever they change
    fetch('http://localhost:3001/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(events),
    }).catch((err) => console.error('Failed to save events:', err));
  }, [events]);

  const handleMouseDown = (day, time) => {
    setDragging(true);
    setDragStart(time);
    setCurrentDay(day);
  };

  const handleMouseUp = (time) => {
    if (dragging && dragStart !== null && currentDay !== null) {
      const newEvent = {
        day: currentDay,
        start: dragStart,
        end: time,
      };
      setEvents([...events, newEvent]); // Add new event
    }
    setDragging(false);
    setDragStart(null);
    setCurrentDay(null);
  };

  const renderEvents = (day) => {
    return events
      .filter((event) => event.day === day)
      .map((event, index) => (
        <div key={index} className="event" style={{ top: `${event.start * 2}px`, height: `${(event.end - event.start) * 2}px` }}>
          Event
        </div>
      ));
  };

  return (
    <div className="week-view">
      {daysOfWeek.map((day, dayIndex) => (
        <div key={dayIndex} className="day">
          <h3>{day}</h3>
          <div
            className="day-grid"
            onMouseDown={(e) => handleMouseDown(day, Math.floor(e.nativeEvent.offsetY / 2))}
            onMouseUp={(e) => handleMouseUp(Math.floor(e.nativeEvent.offsetY / 2))}
          >
            {renderEvents(day)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekView;