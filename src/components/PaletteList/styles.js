import sizes from '../../utils/mediaQuery';
import bg from '../../assets/bg.svg';

export default {
    '@global': {
        '.fade-exit': {
            opacity: 1,
        },
        '.fade-exit-active': {
            opacity: 0,
            transition: 'opacity 500ms ease-out',
        },
    },

    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        /* background by SVGBackgrounds.com */
        backgroundImage: `url(${bg})`,
        overflow: 'scroll',
    },
    container: {
        width: '60%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        [sizes.down('xs')]: {
            width: '65%',
        },
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        '& a': {
            color: 'white',
        },
    },
    palettes: {
        width: '100%',
        margin: '0 0 1.5rem 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '2.5rem',
        [sizes.down('md')]: {
            gridTemplateColumns: 'repeat(2, 50%)',
        },
        [sizes.down('xs')]: {
            gridTemplateColumns: 'repeat(1, 100%)',
            gridGap: '1rem',
        },
    },
};
