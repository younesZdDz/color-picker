import React, { useCallback, useState } from 'react';
import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';
import ColorBox from './ColorBox';
import PaletteNavBar from './PaletteNavBar';
import PaletteFooter from './PaletteFooter';
import styles from './styles';
import { PaletteWithLevelsType } from '../../types';

interface Props extends WithStyles<typeof styles> {
    palette: PaletteWithLevelsType;
}

const Palette: React.FC<Props> = ({ palette, classes }) => {
    const [format, setFormat] = useState<'hex' | 'rgb' | 'rgba'>('hex');
    const [level, setLevel] = useState(500);

    const changeLevel = useCallback(
        (value: number) => {
            setLevel(value);
        },
        [setLevel],
    );

    const changeFormat = useCallback(
        (value: 'hex' | 'rgb' | 'rgba') => {
            setFormat(value);
        },
        [setFormat],
    );

    const { colors, paletteName, emoji, id } = palette;
    const colorBoxes = colors[level].map((color) => (
        <ColorBox
            key={color.id}
            background={color[format]}
            name={color.name}
            moreUrl={`/palette/${id}/${color.id}`}
            showingFullPalette
        />
    ));

    return (
        <div className={classes.root}>
            <PaletteNavBar
                level={level}
                format={format}
                changeLevel={changeLevel}
                handleChange={changeFormat}
                showingAllColors
            />
            <div className={classes.paletteColors}>{colorBoxes}</div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    );
};

export default withStyles(styles)(Palette);
