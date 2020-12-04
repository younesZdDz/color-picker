import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames';
import React, { useState, useContext, useCallback } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import seedColors from '../../constants/seedColors';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import DraggableColorList from './DraggableColorList';
import styles from './styles';
import { DispatchContext, PaletteContext } from '../../contexts/palette.context';
import { WithStyles } from '@material-ui/core';
import { History } from 'history';
import { BasicPaletteType } from '../../types';
import config from '../../config';
import axios from 'axios';

interface Props extends WithStyles<typeof styles> {
    history: History;
    maxColors?: number;
}
const NewPaletteForm: React.FC<Props> = ({ classes, maxColors = 20, history }) => {
    const dispatch = useContext(DispatchContext);
    const palettes = useContext(PaletteContext);

    const [open, setOpen] = useState(true);
    const [colors, setColors] = useState(seedColors.colors);

    const handleDrawerOpen = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const addNewColor = (newColor: { name: string; color: string }) => {
        setColors((c) => [...c, newColor]);
    };

    const handleSubmit = useCallback(
        async (newPalette: BasicPaletteType) => {
            // eslint-disable-next-line no-param-reassign
            // newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
            // eslint-disable-next-line no-param-reassign
            newPalette.colors = colors;
            const res = await axios.post(`${config.API_URI}/api/v1/palettes/add`, newPalette, {
                withCredentials: true,
            });
            newPalette.id = res.data.id;
            dispatch && dispatch({ type: 'ADD', newPalette });
            history.push('/');
        },
        [colors, dispatch, history],
    );

    const removeColor = (colorName: string) => {
        setColors((c) => c.filter((color) => color.name !== colorName));
    };

    const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
        setColors((c) => arrayMove(c, oldIndex, newIndex));
    };

    const clearColors = () => {
        setColors([]);
    };

    const addRandomColor = () => {
        if (palettes) {
            const allColors = palettes.map((p) => p.colors).flat();
            let rand;
            let randomColor: {
                name: string;
                color: string;
            };
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
        }
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
};

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
