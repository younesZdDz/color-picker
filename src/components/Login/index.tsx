import { WithStyles } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';
import React from 'react';
import grey from '@material-ui/core/colors/grey';
import primary from '@material-ui/core/colors/blue';
import logo from '../../assets/logo512.jpg';
import config from '../../config';
const styles = createStyles({
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: grey[200],
    },
    card: {
        borderRadius: '6px',
        overflow: 'hidden',
        width: '20rem',
        height: '15rem',
        margin: '0 auto',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        },
    },
    header: {
        height: '35%',
        background: primary[700],
    },
    avatar: {
        width: '30%',
        height: '100%',
        position: 'relative',
        margin: '0 auto',
    },
    img: {
        display: 'block',
        borderRadius: '50%',
        position: 'absolute',
        bottom: '-42px',
        border: '4px solid white',
        width: '100%',
    },
    cardBody: {
        padding: '30px',
        backgroundColor: 'white',
    },
    action: {
        width: '80%',
        textAlign: 'center',
        margin: '3rem auto 2rem',
    },
    button: {
        padding: '16px 20px 16px 20px',

        margin: 'auto 0',
        background: primary[700],
        borderColor: primary[700],
        color: 'white',
        borderRadius: '100px',
        transition: 'opacity .3s',
        '&:hover': {
            opacity: '0.7',
        },
    },
});

type Props = WithStyles<typeof styles>;
const Login: React.FC<Props> = ({ classes }) => {
    return (
        <div className={classes.root}>
            <div className={classes.card}>
                <div className={classes.header}>
                    <div className={classes.avatar}>
                        <img className={classes.img} src={logo} alt="" />
                    </div>
                </div>
                <div className={classes.cardBody}>
                    <div className={classes.action}>
                        <a href={`${config.API_URI}/api/v1/auth/google`} className={classes.button}>
                            Log in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default withStyles(styles)(Login);
