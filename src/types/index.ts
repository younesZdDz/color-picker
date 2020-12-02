interface GeneralPaletteType {
    paletteName: string;
    id: string;
    emoji: string;
}

export interface BasicColorType {
    name: string;
    color: string;
}
export interface ExtendedColorType {
    name: string;
    id: string;
    hex: string;
    rgb: string;
    rgba: string;
}
export type ColorFormat = 'hex' | 'rgb' | 'rgba';
export interface BasicPaletteType extends GeneralPaletteType {
    colors: BasicColorType[];
}
export interface PaletteWithLevelsType extends GeneralPaletteType {
    colors: Record<string, ExtendedColorType[]>;
}
export type PaletteState = BasicPaletteType[];
export type PaletteAction = { type: 'ADD'; newPalette: BasicPaletteType } | { type: 'DELETE'; id: string };

export type Reducer<State, Action> = (prevState: State, action: Action) => State;

export type AuthType = { userId: string; displayName?: string; photo?: string; isAuth: boolean };
