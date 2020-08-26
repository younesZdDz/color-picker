import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import ColorBox from '../Palette/ColorBox';
import PaletteNavBar from '../Palette/PaletteNavBar';
import PaletteFooter from '../Palette/PaletteFooter';
import styles from './styles';

class ColorPalette extends Component {
  constructor(props) {
    super(props);
    this.shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = { format: 'hex' };
    this.changeFormat = this.changeFormat.bind(this);
  }

  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    const allColors = palette.colors;

    Object.keys(allColors).forEach((c) => {
      shades = shades.concat(
        allColors[c].filter((color) => color.id === colorToFilterBy),
      );
    });
    // return all shades of given color
    return shades.slice(1);
  }

  changeFormat(val) {
    this.setState({ format: val });
  }

  render() {
    const { format } = this.state;
    const { classes } = this.props;
    const { paletteName, emoji, id } = this.props.palette;
    const colorBoxes = this.shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={classes.root}>
        <PaletteNavBar
          handleChange={this.changeFormat}
          showingAllColors={false}
          format={format}
        />
        <div className={classes.paletteColors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`} className={classes.backButton}>
              GO BACK
            </Link>
          </div>
        </div>{' '}
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
ColorPalette.propTypes = {
  palette: PropTypes.shape({
    paletteName: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  colorId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ColorPalette);
