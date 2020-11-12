import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles';

function PaletteFormNav({ classes, open, handleSubmit, handleDrawerOpen }) {
	const [formShowing, setFormShowing] = useState(false);

	const showForm = () => {
		setFormShowing(true);
	};

	const hideForm = () => {
		setFormShowing(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				color="default"
				className={classNames(classes.appBar, {
					[classes.appBarShift]: open
				})}
			>
				<Toolbar disableGutters={!open}>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={handleDrawerOpen}
						className={classNames(
							classes.menuButton,
							open && classes.hide
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" noWrap>
						Create A Palette
					</Typography>
				</Toolbar>
				<div className={classes.navBtns}>
					<Link to="/">
						<Button
							variant="contained"
							color="secondary"
							className={classes.button}
						>
							Go Back
						</Button>
					</Link>
					<Button
						variant="contained"
						color="primary"
						onClick={showForm}
						className={classes.button}
					>
						Save
					</Button>
				</div>
			</AppBar>
			{formShowing && (
				<PaletteMetaForm
					handleSubmit={handleSubmit}
					hideForm={hideForm}
				/>
			)}
		</div>
	);
}

PaletteFormNav.propTypes = {
	classes: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleDrawerOpen: PropTypes.func.isRequired
};
export default withStyles(styles, { withTheme: true })(PaletteFormNav);
