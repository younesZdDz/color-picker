import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MiniPalette from '../MiniPalette/MiniPalette';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './styles';

class PaletteList extends Component {
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  render() {
    const { palettes, classes, deletePalette } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                <MiniPalette
                  key={palette.id}
                  {...palette}
                  handleClick={() => this.goToPalette(palette.id)}
                  handleDelete={deletePalette}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
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
