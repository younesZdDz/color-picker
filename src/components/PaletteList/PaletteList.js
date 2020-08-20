import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import MiniPalette from '../MiniPalette/MiniPalette';
import styles from './styles';

class PaletteList extends Component {
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  render() {
    const { palettes, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette
                key={palette.id}
                {...palette}
                handleClick={() => this.goToPalette(palette.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

PaletteList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  palettes: PropTypes.arrayOf(
    PropTypes.shape({
      paletteName: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
      colors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          color: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaletteList);
