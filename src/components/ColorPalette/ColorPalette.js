import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  goBack: {
    backgroundColor: 'black',
    position: 'relative',

    width: '20%',
    height: '50%',
    margin: '0 auto',
    display: 'inline-block',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    '&:hover button': {
      opacity: 1,
    },
  },
  backButton: {
    height: '30px',
    width: '100px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginTop: '-15px',
    marginLeft: '-50px',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    color: 'white',
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: 'none',
  },
};

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

    Object.keys(allColors).forEach(c => {
      shades = shades.concat(
        allColors[c].filter(color => color.id === colorToFilterBy),
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
    const { palette, classes } = this.props;
    const { paletteName, emoji, id } = palette;
    const colorBoxes = this.shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={classes.root}>
        <NavBar
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
