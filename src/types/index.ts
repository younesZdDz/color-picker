interface GeneralPaletteType {
    paletteName: string;
    id: string;
    emoji: string;
}

export interface BasicPaletteType extends GeneralPaletteType {
    colors: { name: string; color: string }[];
}
export interface PaletteWithLevelsType extends GeneralPaletteType {
    colors: Record<string, { name: string; id: string; hex: string; rgb: string; rgba: string }[]>;
}
export type PaletteState = BasicPaletteType[];
export type PaletteAction = { type: 'ADD'; newPalette: BasicPaletteType } | { type: 'DELETE'; id: string };

export type Reducer<State, Action> = (prevState: State, action: Action) => State;
