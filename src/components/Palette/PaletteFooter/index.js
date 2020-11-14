import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from './styles';

function PaletteFooter({ paletteName, emoji, classes }) {
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
	classes: PropTypes.object.isRequired
};
export default React.memo(withStyles(styles)(PaletteFooter));
