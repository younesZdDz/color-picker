import React from 'react';
import Palette from './components/Palette/Palette';
import seedColors from './constants/seedColors'

function App() {
  return (
    <div>
      <Palette {...seedColors[4]} />
    </div>
  );
}

export default App;
