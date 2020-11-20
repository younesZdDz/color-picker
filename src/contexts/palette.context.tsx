import React, { createContext } from 'react';
import { useLocalStorageReducer } from '../hooks/useLocalStorageReducer';
import paletteReducer from '../reducers/palette.reducer';
import seedColors from '../constants/seedColors';
import { PaletteState, PaletteAction } from '../types';

export const PaletteContext = createContext<PaletteState | null>(null);
export const DispatchContext = createContext<React.Dispatch<PaletteAction> | null>(null);

export const PalettesProvider: React.FC = ({ children }) => {
    const [palettes, dispatch] = useLocalStorageReducer('palettes', seedColors, paletteReducer);
    return (
        <DispatchContext.Provider value={dispatch}>
            <PaletteContext.Provider value={palettes}>{children}</PaletteContext.Provider>
        </DispatchContext.Provider>
    );
};
