import React from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.5)',
    },
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '10px',
    color: 'rgba(0, 0, 0, 0.5)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out',
  },
};

function DraggableColorBox(props) {
  const { classes, handleClick, name, color } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span> {name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  );
}
DraggableColorBox.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default withStyles(styles)(DraggableColorBox);
