import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
import notFoundImage from '../../assets/something-lost.png';
const styles = createStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '40%',
        height: 'auto',
    },
});
type Props = WithStyles<typeof styles>;

const NotFound: React.FC<Props> = ({ classes }) => {
    return (
        <div className={classes.root}>
            <img className={classes.image} src={notFoundImage} alt="Not found" />
            <h1>Oops, looks like the page is lost</h1>
            <p>This is not a fault, just an accident that was not intentional.</p>
        </div>
    );
};

export default withStyles(styles)(NotFound);
