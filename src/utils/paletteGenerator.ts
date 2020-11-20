import chroma from 'chroma-js';
import { PaletteWithLevelsType, BasicPaletteType } from '../types';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function getRange(hexColor: string): [string, string, string] {
    const end = '#fff';
    return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
}

function getScale(hexColor: string, numberOfColors: number): string[] {
    return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors);
}

function generatePalette(starterPalette: BasicPaletteType): PaletteWithLevelsType {
    const newPalette: PaletteWithLevelsType = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {},
    };
    levels.forEach((level) => {
        newPalette.colors[level] = [];
    });
    starterPalette.colors.forEach((color) => {
        const scale = getScale(color.color, 10).reverse();
        scale.forEach((s, i) => {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, '-'),
                hex: s,
                rgb: chroma(s).css(),
                rgba: chroma(s).css().replace('rgb', 'rgba').replace(')', ',1.0)'),
            });
        });
    });

    return newPalette;
}

export { generatePalette };
