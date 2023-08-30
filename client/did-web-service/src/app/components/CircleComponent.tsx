'use client';
import React from 'react';

const CircleComponent = ({ text }) => {
  const circleStyle = {
    width: '39px',
    height: '39px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '16px',
  };

  return (
    <div className="bg-indigo-400 p-2 rounded-sm overflow-hidden" style={circleStyle}>
      {text}
    </div>
  );
};

export default CircleComponent;
