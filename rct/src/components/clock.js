import React from 'react';

function Clock(props) {
  return (
      <h2>Now is {new Date().toString()}</h2>
  );
}

export default Clock;