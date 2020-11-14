import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
	root: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
};

function Loading({ classes }) {
	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
}
Loading.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Loading);
