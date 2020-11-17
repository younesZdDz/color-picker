import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useContext, useCallback } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import seedColors from '../../constants/seedColors';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import DraggableColorList from './DraggableColorList';
import styles from './styles';
import { DispatchContext, PaletteContext } from '../../contexts/palette.context';

const defaultProps = {
    maxColors: 20,
};

function NewPaletteForm({ classes, maxColors, history }) {
    const dispatch = useContext(DispatchContext);
    const palettes = useContext(PaletteContext);

    const [open, setOpen] = useState(true);
    const [colors, setColors] = useState(seedColors[0].colors);

    const handleDrawerOpen = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const addNewColor = (newColor) => {
        setColors((c) => [...c, newColor]);
    };

    const handleSubmit = useCallback(
        (newPalette) => {
            // eslint-disable-next-line no-param-reassign
            newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
            // eslint-disable-next-line no-param-reassign
            newPalette.colors = colors;
            dispatch({ type: 'ADD', newPalette });
            history.push('/');
        },
        [colors, dispatch, history],
    );

    const removeColor = (colorName) => {
        setColors((c) => c.filter((color) => color.name !== colorName));
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setColors((c) => arrayMove(c, oldIndex, newIndex));
    };

    const clearColors = () => {
        setColors([]);
    };

    const addRandomColor = () => {
        const allColors = palettes.map((p) => p.colors).flat();
        let rand;
        let randomColor;
        let isDuplicateColor = true;
        while (isDuplicateColor) {
            rand = Math.floor(Math.random() * allColors.length);
            randomColor = allColors[rand];
            isDuplicateColor = colors.some(
                // eslint-disable-next-line no-loop-func
                (color) => color.name === randomColor.name,
            );
        }
        setColors((c) => [...c, randomColor]);
    };

    const paletteIsFull = colors.length >= maxColors;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <PaletteFormNav open={open} handleSubmit={handleSubmit} handleDrawerOpen={handleDrawerOpen} />
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <div className={classes.container}>
                    <Typography variant="h4" gutterBottom>
                        Design Your Palette
                    </Typography>
                    <div className={classes.buttons}>
                        <Button variant="contained" color="secondary" onClick={clearColors} className={classes.button}>
                            Clear Palette
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.button}
                            color="primary"
                            onClick={addRandomColor}
                            disabled={paletteIsFull}
                        >
                            Random Color
                        </Button>
                    </div>
                    <ColorPickerForm paletteIsFull={paletteIsFull} addNewColor={addNewColor} colors={colors} />
                </div>
            </Drawer>
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList
                    colors={colors}
                    removeColor={removeColor}
                    axis="xy"
                    onSortEnd={onSortEnd}
                    distance={20}
                />
            </main>{' '}
        </div>
    );
}

NewPaletteForm.defaultProps = defaultProps;
NewPaletteForm.propTypes = {
    classes: PropTypes.object.isRequired,
    maxColors: PropTypes.number,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
