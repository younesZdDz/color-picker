import React, { useState } from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import 'rc-slider/assets/index.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from './styles';

function NavBar({
	handleChange,
	format,
	level,
	changeLevel,
	showingAllColors,
	classes
}) {
	const [open, setOpen] = useState(false);

	const handleFormatChange = (e) => {
		setOpen(true);
		handleChange(e.target.value);
	};

	const closeSnackbar = () => {
		setOpen(false);
	};

	return (
		<header className={classes.root}>
			<div className={classes.logo}>
				<Link to="/">Color-Picker</Link>
			</div>
			{showingAllColors && (
				<div>
					<span>Level: {level}</span>
					<div className={classes.slider}>
						<Slider
							defaultValue={level}
							min={100}
							max={900}
							step={100}
							onAfterChange={changeLevel}
						/>
					</div>
				</div>
			)}
			<div className={classes.selectContainer}>
				<Select value={format} onChange={handleFormatChange}>
					<MenuItem value="hex">HEX - #ffffff</MenuItem>
					<MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
					<MenuItem value="rgba">
						RGBA - rgba(255,255,255,1.0)
					</MenuItem>
				</Select>
			</div>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				open={open}
				autoHideDuration={3000}
				message={
					<span id="message-id">
						Format Changed To {format.toUpperCase()}
					</span>
				}
				ContentProps={{
					'aria-describedby': 'message-id'
				}}
				action={[
					<IconButton
						onClick={closeSnackbar}
						color="inherit"
						key="close"
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
				]}
			/>
		</header>
	);
}
NavBar.propTypes = {
	handleChange: PropTypes.func.isRequired,
	format: PropTypes.oneOf(['hex', 'rgb', 'rgba']).isRequired,
	level: PropTypes.number,
	changeLevel: PropTypes.func,
	showingAllColors: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired
};
export default React.memo(withStyles(styles)(NavBar));
