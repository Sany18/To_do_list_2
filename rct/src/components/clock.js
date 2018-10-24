import React from 'react';

function Clock(props) {
  return (
      <h2 id='clock'>Now is {new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()}</h2>
  );
}

export default Clock;