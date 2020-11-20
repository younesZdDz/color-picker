import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};
type Props = WithStyles<typeof styles>;

const Loading: React.FC<Props> = ({ classes }) => {
    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
};

export default withStyles(styles)(Loading);
