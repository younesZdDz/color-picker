import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { BasicPaletteType } from '../../../types';

interface Props extends WithStyles<typeof styles>, BasicPaletteType {
    openDeleteDialog: (id: string) => void;
    goToPalette: (id: string) => void;
}

const MiniPalette: React.FC<Props> = ({ id, paletteName, emoji, colors, classes, openDeleteDialog, goToPalette }) => {
    const deletePalette = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        openDeleteDialog(id);
    };

    const handleClick = () => {
        goToPalette(id);
    };

    const miniColorBoxes = colors.map((color) => (
        <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name} />
    ));
    return (
        <div className={classes.root} onClick={handleClick}>
            <DeleteIcon className={classes.deleteIcon} onClick={deletePalette} />
            <div className={classes.colors}>{miniColorBoxes}</div>
            <h5 className={classes.title}>
                {paletteName} <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    );
};

export default React.memo(withStyles(styles)(MiniPalette));
