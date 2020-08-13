import React from 'react';
import Palette from './components/Palette/Palette';
import seedColors from './constants/seedColors'
import './index.css';

function App() {
  return (
    <div>
      <Palette {...seedColors[4]} />
    </div>
  );
}

export default App;
