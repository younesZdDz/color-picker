import React, { useState } from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import 'rc-slider/assets/index.css';
import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';

import styles from './styles';

interface Props extends WithStyles<typeof styles> {
    format: string;
    handleChange: (value: 'hex' | 'rgb' | 'rgba') => void;
    showingAllColors: boolean;
    level?: number;
    changeLevel?: (value: number) => void;
}
const NavBar: React.FC<Props> = ({ format, level, changeLevel, handleChange, showingAllColors, classes }) => {
    const [open, setOpen] = useState(false);

    const handleFormatChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setOpen(true);
        const value = e.target.value;
        if (value === 'hex' || value === 'rgb' || value === 'rgba') {
            handleChange(value);
        }
    };

    const closeSnackbar = () => {
        setOpen(false);
    };

    return (
        <header className={classes.root}>
            <div className={classes.logo}>
                <Link to="/">Color-Picker</Link>
            </div>
            {showingAllColors && (
                <div>
                    <span>Level: {level}</span>
                    <div className={classes.slider}>
                        <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
                    </div>
                </div>
            )}
            <div className={classes.selectContainer}>
                <Select value={format} onChange={handleFormatChange}>
                    <MenuItem value="hex">HEX - #ffffff</MenuItem>
                    <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                </Select>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={open}
                autoHideDuration={3000}
                message={<span id="message-id">Format Changed To {format.toUpperCase()}</span>}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                action={[
                    <IconButton onClick={closeSnackbar} color="inherit" key="close" aria-label="close">
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </header>
    );
};

export default React.memo(withStyles(styles)(NavBar));
