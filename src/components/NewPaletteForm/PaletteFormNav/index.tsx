import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles';
import { BasicPaletteType } from '../../../types';

interface Props extends WithStyles<typeof styles> {
    open: boolean;
    handleSubmit: (newPalette: BasicPaletteType) => void;
    handleDrawerOpen: () => void;
}
const PaletteFormNav: React.FC<Props> = ({ classes, open, handleSubmit, handleDrawerOpen }) => {
    const [formShowing, setFormShowing] = useState(false);

    const showForm = () => {
        setFormShowing(true);
    };

    const hideForm = () => {
        setFormShowing(false);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar disableGutters={!open}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Create A Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Link to="/">
                        <Button variant="contained" color="secondary" className={classes.button}>
                            Go Back
                        </Button>
                    </Link>
                    <Button variant="contained" color="primary" onClick={showForm} className={classes.button}>
                        Save
                    </Button>
                </div>
            </AppBar>
            {formShowing && <PaletteMetaForm handleSubmit={handleSubmit} hideForm={hideForm} />}
        </div>
    );
};

export default React.memo(withStyles(styles, { withTheme: true })(PaletteFormNav));
