import { createStyles } from '@material-ui/core';
import sizes from '../../utils/mediaQuery';

export default createStyles({
    root: {
        height: '100vh',
    },
    paletteColors: {
        height: '90%',
    },
    goBack: {
        backgroundColor: 'black',
        position: 'relative',

        width: '20%',
        height: '50%',
        margin: '0 auto',
        display: 'inline-block',
        cursor: 'pointer',
        marginBottom: '-3.5px',
        button: {
            opacity: 1,
        },
        [sizes.down('lg')]: {
            width: '25%',
            height: '33.3333%',
        },
        [sizes.down('md')]: {
            width: '50%',
            height: '20%',
        },
        [sizes.down('xs')]: {
            width: '100%',
            height: '10%',
        },
    },
    backButton: {
        height: '30px',
        width: '100px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        marginTop: '-15px',
        marginLeft: '-50px',
        textAlign: 'center',
        outline: 'none',
        background: 'rgba(255, 255, 255, 0.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        color: 'white',
        textTransform: 'uppercase',
        border: 'none',
        textDecoration: 'none',
    },
});
