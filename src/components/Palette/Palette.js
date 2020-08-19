import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import ColorBox from '../ColorBox/ColorBox';
import NavBar from '../NavBar/NavBar';
import PaletteFooter from '../PaletteFooter/PaletteFooter';

const styles = {
  root: {
    height: '100vh',
  },
  paletteColors: {
    height: '90%',
  },
};
class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: 'hex' };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  changeFormat(value) {
    this.setState({ format: value });
  }

  render() {
    const { palette, classes } = this.props;
    const { colors, paletteName, emoji, id } = palette;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox
        key={color.id}
        background={color[format]}
        name={color.name}
        moreUrl={`/palette/${id}/${color.id}`}
        showingFullPalette
      />
    ));
    return (
      <div className={classes.root}>
        <NavBar
          level={level}
          format={format}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showingAllColors
        />
        <div className={classes.paletteColors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
Palette.propTypes = {
  palette: PropTypes.shape({
    colors: PropTypes.object.isRequired,
    paletteName: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Palette);
