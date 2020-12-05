import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { AuthContext, SetAuthContext } from '../../../contexts/auth.context';
import axios from 'axios';
import config from '../../../config';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            color: 'white',
            '& a': {
                color: 'white',
                textDecoration: 'none',
            },
        },
        createButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            fontWeight: 'bold',
        },
    }),
);

const NavBar: React.FC = () => {
    const auth = useContext(AuthContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const setAuth = useContext(SetAuthContext);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = async () => {
        if (setAuth) {
            setAuth({ userId: '', isAuth: false });
            await axios.get(`${config.API_URI}/api/v1/auth/logout`, { withCredentials: true });
        }
    };
    return (
        <nav className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Color Picker
                    </Typography>

                    <div>
                        <Button className={classes.createButton} variant="contained" color="primary">
                            <Link to="/palette/new">Create Palette</Link>
                        </Button>

                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            {auth && auth.photo ? <Avatar alt="Profile photo" src={auth.photo} /> : <AccountCircle />}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                {auth && auth.displayName ? auth.displayName : 'user'}
                            </MenuItem>
                            <MenuItem onClick={logout}>logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </nav>
    );
};
export default NavBar;
