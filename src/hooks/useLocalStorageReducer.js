import { useReducer, useEffect } from 'react';

export function useLocalStorageReducer(key, defaultValue = [], reducer) {
	const [value, dispatch] = useReducer(
		reducer,
		defaultValue,
		(defaultVal) => {
			let val;
			try {
				val = JSON.parse(
					window.localStorage.getItem(key) || String(defaultVal)
				);
			} catch (e) {
				val = defaultVal;
			}
			return val;
		}
	);
	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);
	return [value, dispatch];
}
