import React, { Component, ErrorInfo } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';

const styles = createStyles({
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
});

interface Props extends WithStyles<typeof styles> {
    errorImage: string;
}

interface State {
    error: Error | null;
    errorInfo: ErrorInfo | null;
}
class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error,
            errorInfo,
        });
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            const { classes, errorImage } = this.props;
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

export default withStyles(styles)(ErrorBoundary);
