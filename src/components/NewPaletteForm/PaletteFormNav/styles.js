import { DRAWER_WIDTH } from '../../../constants/styles';
import sizes from '../../../utils/mediaQuery';

export default (theme) => ({
    root: {
        display: 'flex',
    },
    hide: {
        display: 'none',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '64px',
        alignItems: 'center',
    },
    appBarShift: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    navBtns: {
        marginRight: '1rem',
        '& a': {
            textDecoration: 'none',
        },
        [sizes.down('xs')]: {
            marginRight: '0.5rem',
        },
    },
    button: {
        margin: '0 0.5rem',
        [sizes.down('xs')]: {
            margin: '0 0.2rem',
            padding: '0.3rem',
        },
    },
});
