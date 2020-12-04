import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import config from '../config';
import paletteReducer from '../reducers/palette.reducer';
import { PaletteState, PaletteAction } from '../types';

export const PaletteContext = createContext<PaletteState | null>(null);
export const DispatchContext = createContext<React.Dispatch<PaletteAction> | null>(null);

export const PalettesProvider: React.FC = ({ children }) => {
    const [palettes, dispatch] = useReducer(paletteReducer, []);
    useEffect(() => {
        const fetchPalettes = async () => {
            const res = await axios.get(`${config.API_URI}/api/v1/palettes`, { withCredentials: true });
            console.log(res);
            dispatch({ type: 'SET', palettes: res.data });
        };
        fetchPalettes();
    }, []);
    return (
        <DispatchContext.Provider value={dispatch}>
            <PaletteContext.Provider value={palettes}>{children}</PaletteContext.Provider>
        </DispatchContext.Provider>
    );
};
