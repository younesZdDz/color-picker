import React from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';
import styles from './styles';

const DraggableColorBox = SortableElement(({ name, color, classes, removeColor }) => (
    <div className={classes.root} style={{ backgroundColor: color }}>
        <div className={classes.boxContent}>
            <span> {name}</span>
            <DeleteIcon className={classes.deleteIcon} onClick={removeColor} />
        </div>
    </div>
));

DraggableColorBox.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};
export default withStyles(styles)(DraggableColorBox);
