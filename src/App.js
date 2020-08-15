import React from 'react';
import Palette from './components/Palette/Palette';
import seedColors from './constants/seedColors'
import { generatePalette } from "./utils/paletteGenerator";
import { Route, Switch } from "react-router-dom";
import PaletteList from './components/PaletteList/PaletteList'
import './index.css';

class App extends React.Component {
  findPalette(id) {
    return seedColors.find(function(palette) {
      return palette.id === id;
    });
  }
  render(){
    return (
      <Switch>
        <Route exact path='/' render={() => <PaletteList palettes={seedColors} />} />
        <Route
          exact
          path='/palette/:id'
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
