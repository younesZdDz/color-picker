import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';
import styles from './styles';
import { WithStyles } from '@material-ui/core';
import { BasicColorType } from '../../../../types';

interface Props extends WithStyles<typeof styles>, BasicColorType {
    removeColor: () => void;
}
const colorBox: React.FC<Props> = ({ name, color, classes, removeColor }) => (
    <div className={classes.root} style={{ backgroundColor: color }}>
        <div className={classes.boxContent}>
            <span> {name}</span>
            <DeleteIcon className={classes.deleteIcon} onClick={removeColor} />
        </div>
    </div>
);
const DraggableColorBox = SortableElement(colorBox);

export default withStyles(styles)(DraggableColorBox);
