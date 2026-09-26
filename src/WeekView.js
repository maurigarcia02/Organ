
import React from 'react';
import './WeekView.css'; // Add styles for the week view

const WeekView = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="week-view">
      {daysOfWeek.map((day, index) => (
        <div key={index} className="day">
          <h3>{day}</h3>
          <div className="events">
            {/* Placeholder for events */}
            <p>No events</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekView;