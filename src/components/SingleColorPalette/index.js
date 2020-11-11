import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import ColorBox from '../Palette/ColorBox';
import PaletteNavBar from '../Palette/PaletteNavBar';
import PaletteFooter from '../Palette/PaletteFooter';
import styles from './styles';

function ColorPalette({ palette, colorId, classes }) {
	const [format, setFormat] = useState('hex');
	const gatherShades = (inPalette, colorToFilterBy) => {
		let shades = [];
		const allColors = inPalette.colors;

		Object.keys(allColors).forEach((c) => {
			shades = shades.concat(
				allColors[c].filter((color) => color.id === colorToFilterBy)
			);
		});
		// return all shades of given color
		return shades.slice(1);
	};
	const changeFormat = (val) => {
		setFormat(val);
	};
	const shades = gatherShades(palette, colorId);
	const { paletteName, emoji, id } = palette;
	const colorBoxes = shades.map((color) => (
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
				handleChange={changeFormat}
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
ColorPalette.propTypes = {
	palette: PropTypes.shape({
		paletteName: PropTypes.string.isRequired,
		emoji: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired
	}).isRequired,
	colorId: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ColorPalette);
