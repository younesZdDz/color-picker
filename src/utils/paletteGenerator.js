import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
  const newPalette = {
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
function getRange(hexColor) {
  const end = '#fff';
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
}

function getScale(hexColor, numberOfColors) {
  return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors);
}

export { generatePalette };
