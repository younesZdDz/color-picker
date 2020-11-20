import { useReducer, useEffect } from 'react';
import { Reducer } from '../types';

export const useLocalStorageReducer = <State, Action>(
    key: string,
    defaultValue: State,
    reducer: Reducer<State, Action>,
): [State, React.Dispatch<Action>] => {
    const [value, dispatch] = useReducer(reducer, defaultValue, (defaultVal) => {
        let val: State;
        try {
            val = JSON.parse(window.localStorage.getItem(key) || String(defaultVal));
        } catch (e) {
            val = defaultVal;
        }
        return val;
    });
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, dispatch];
};
