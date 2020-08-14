import React from 'react';
import Palette from './components/Palette/Palette';
import seedColors from './constants/seedColors'
import { generatePalette } from "./utils/paletteGenerator";
import './index.css';

function App() {
  return (
    <div>
      <Palette palette={generatePalette(seedColors[4])} />
    </div>
  );
}

export default App;
