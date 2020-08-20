import React from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import styles from './styles';

function MiniPalette(props) {
  const { classes, paletteName, emoji, colors } = props;
  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}
MiniPalette.propTypes = {
  classes: PropTypes.object.isRequired,
  paletteName: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(MiniPalette);
