import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: 'white',
    height: '4vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: '1.5rem',
    margin: '0 1rem',
  },
};

function PaletteFooter(props) {
  const { paletteName, emoji, classes } = props;
  return (
    <footer className={classes.root}>
      {paletteName}
      <span className={classes.emoji}>{emoji}</span>
    </footer>
  );
}
PaletteFooter.propTypes = {
  paletteName: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PaletteFooter);
