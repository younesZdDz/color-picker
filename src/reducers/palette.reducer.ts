import { PaletteState, PaletteAction, Reducer } from '../types';

const reducer: Reducer<PaletteState, PaletteAction> = (state: PaletteState, action: PaletteAction): PaletteState => {
    switch (action.type) {
        case 'SET':
            return [...action.palettes];
        case 'ADD':
            return [...state, action.newPalette];
        case 'DELETE':
            return state.filter((palette) => palette.id !== action.id);
        default:
            return state;
    }
};

export default reducer;
