import React from 'react';
import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';

import styles from './styles';

interface Props extends WithStyles<typeof styles> {
    paletteName: string;
    emoji: string;
}
const PaletteFooter: React.FC<Props> = ({ paletteName, emoji, classes }) => {
    return (
        <footer className={classes.root}>
            {paletteName}
            <span className={classes.emoji}>{emoji}</span>
        </footer>
    );
};

export default React.memo(withStyles(styles)(PaletteFooter));
