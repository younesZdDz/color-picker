import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles';

class MiniPalette extends PureComponent {
  constructor(props) {
    super(props);
    this.deletePalette = this.deletePalette.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  deletePalette(e) {
    e.stopPropagation();
    this.props.openDialog(this.props.id);
  }
  handleClick() {
    this.props.goToPalette(this.props.id);
  }
  render() {
    const { classes, paletteName, emoji, colors } = this.props;
    const miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    ));
    return (
      <div className={classes.root} onClick={this.handleClick}>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={this.deletePalette}
        />
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}
MiniPalette.propTypes = {
  classes: PropTypes.object.isRequired,
  paletteName: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(MiniPalette);
