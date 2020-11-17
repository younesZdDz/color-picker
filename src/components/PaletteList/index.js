import React, { useState, useContext, useCallback } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import MiniPalette from './MiniPalette';
import styles from './styles';
import { DispatchContext, PaletteContext } from '../../contexts/palette.context';

function PaletteList({ classes, history }) {
    const dispatch = useContext(DispatchContext);
    const palettes = useContext(PaletteContext);

    const [state, setState] = useState({
        openDelDialog: false,
        deletingId: '',
    });

    const openDeleteDialog = useCallback(
        (id) => {
            setState({ openDelDialog: true, deletingId: id });
        },
        [setState],
    );

    const closeDeleteDialog = () => {
        setState({ openDelDialog: false, deletingId: '' });
    };

    const goToPalette = useCallback(
        (id) => {
            history.push(`/palette/${id}`);
        },
        [history],
    );

    const handleDelete = () => {
        dispatch({ type: 'DELETE', id: state.deletingId });
        closeDeleteDialog();
    };

    const { openDelDialog } = state;

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1>Color Picker</h1>
                    <Link to="/palette/new">Create Palette</Link>
                </nav>
                <TransitionGroup className={classes.palettes}>
                    {palettes.map((palette) => (
                        <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                            <MiniPalette
                                key={palette.id}
                                goToPalette={goToPalette}
                                openDeleteDialog={openDeleteDialog}
                                id={palette.id}
                                paletteName={palette.paletteName}
                                emoji={palette.emoji}
                                colors={palette.colors}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
            <Dialog open={openDelDialog} aria-labelledby="delete-dialog-title">
                <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
                <List>
                    <ListItem button onClick={handleDelete}>
                        <ListItemAvatar>
                            <Avatar
                                style={{
                                    backgroundColor: blue[100],
                                    color: blue[600],
                                }}
                            >
                                <CheckIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Delete" />
                    </ListItem>
                    <ListItem button onClick={closeDeleteDialog}>
                        <ListItemAvatar>
                            <Avatar
                                style={{
                                    backgroundColor: red[100],
                                    color: red[600],
                                }}
                            >
                                <CloseIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Cancel" />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}

PaletteList.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaletteList);
