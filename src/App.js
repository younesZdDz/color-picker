import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './components/Palette/Palette';
import seedColors from './constants/seedColors';
import { generatePalette } from './utils/paletteGenerator';
import PaletteList from './components/PaletteList/PaletteList';
import ColorPalette from './components/ColorPalette/ColorPalette';
import PaletteForm from './components/PaletteForm/PaletteForm';
import './index.css';

class App extends React.Component {
  findPalette(id) {
    return seedColors.find(palette => palette.id === id);
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => (
            <PaletteList palettes={seedColors} {...routeProps} />
          )}
        />
        <Route exact path="/palette/new" render={() => <PaletteForm />} />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id),
              )}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <ColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId),
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
