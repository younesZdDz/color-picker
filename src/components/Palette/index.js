import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import ColorBox from './ColorBox';
import PaletteNavBar from './PaletteNavBar';
import PaletteFooter from './PaletteFooter';
import styles from './styles';

function Palette({ palette, classes }) {
	const [format, setFormat] = useState('hex');
	const [level, setLevel] = useState(500);

	const changeLevel = useCallback(
		(value) => {
			setLevel(value);
		},
		[setLevel]
	);

	const changeFormat = useCallback(
		(value) => {
			setFormat(value);
		},
		[setFormat]
	);

	const { colors, paletteName, emoji, id } = palette;
	const colorBoxes = colors[level].map((color) => (
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
			<PaletteNavBar
				level={level}
				format={format}
				changeLevel={changeLevel}
				handleChange={changeFormat}
				showingAllColors
			/>
			<div className={classes.paletteColors}>{colorBoxes}</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	);
}
Palette.propTypes = {
	palette: PropTypes.shape({
		colors: PropTypes.object.isRequired,
		paletteName: PropTypes.string.isRequired,
		emoji: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired
	}).isRequired,
	classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Palette);
