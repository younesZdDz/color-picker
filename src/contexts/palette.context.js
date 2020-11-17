import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorageReducer } from '../hooks/useLocalStorageReducer';
import paletteReducer from '../reducers/palette.reducer';
import seedColors from '../constants/seedColors';

export const PaletteContext = createContext();
export const DispatchContext = createContext();

export function PalettesProvider(props) {
    const [palettes, dispatch] = useLocalStorageReducer('palettes', seedColors, paletteReducer);
    return (
        <DispatchContext.Provider value={dispatch}>
            <PaletteContext.Provider value={palettes}>{props.children}</PaletteContext.Provider>
        </DispatchContext.Provider>
    );
}

PalettesProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
