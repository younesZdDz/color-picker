import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';
import ColorBox from '../Palette/ColorBox';
import PaletteNavBar from '../Palette/PaletteNavBar';
import PaletteFooter from '../Palette/PaletteFooter';
import styles from './styles';
import { PaletteWithLevelsType } from '../../types';

interface Props extends WithStyles<typeof styles> {
    palette: PaletteWithLevelsType;
    colorId: string;
}

const ColorPalette: React.FC<Props> = ({ palette, colorId, classes }) => {
    const [format, setFormat] = useState<'hex' | 'rgb' | 'rgba'>('hex');
    const gatherShades = (inPalette: PaletteWithLevelsType, colorToFilterBy: string) => {
        let shades: {
            name: string;
            id: string;
            hex: string;
            rgb: string;
            rgba: string;
        }[] = [];
        const allColors = inPalette.colors;

        Object.keys(allColors).forEach((c) => {
            shades = shades.concat(allColors[c].filter((color) => color.id === colorToFilterBy));
        });
        // return all shades of given color
        return shades.slice(1);
    };
    const changeFormat = (val: 'hex' | 'rgb' | 'rgba') => {
        setFormat(val);
    };
    const shades = gatherShades(palette, colorId);
    const { paletteName, emoji, id } = palette;
    const colorBoxes = shades.map((color) => (
        <ColorBox key={color.name} name={color.name} background={color[format]} showingFullPalette={false} />
    ));
    return (
        <div className={classes.root}>
            <PaletteNavBar handleChange={changeFormat} showingAllColors={false} format={format} />
            <div className={classes.paletteColors}>
                {colorBoxes}
                <div className={classes.goBack}>
                    <Link to={`/palette/${id}`} className={classes.backButton}>
                        GO BACK
                    </Link>
                </div>
            </div>{' '}
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    );
};

export default withStyles(styles)(ColorPalette);
