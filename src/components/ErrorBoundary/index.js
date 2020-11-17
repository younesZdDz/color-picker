/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import errorImage from '../../assets/500.svg';

const styles = {
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorImage: {
        width: '20%',
        height: 'auto',
    },
};

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error,
            errorInfo,
        });
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            const { classes } = this.props;
            // Error path
            return (
                <div className={classes.root}>
                    <img className={classes.errorImage} src={errorImage} alt="Unexpected error" />
                    <h2>Ooops ... something went wrong!</h2>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}
ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ErrorBoundary);
