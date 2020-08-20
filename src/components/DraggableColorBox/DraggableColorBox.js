import React from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
  },
};

function DraggableColorBox(props) {
  return (
    <div
      className={props.classes.root}
      style={{ backgroundColor: props.color }}
    >
      {props.name}
    </div>
  );
}
DraggableColorBox.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default withStyles(styles)(DraggableColorBox);
