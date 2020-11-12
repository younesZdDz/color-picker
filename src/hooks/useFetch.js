const { useState, useEffect } = require('react');

export const useFetch = (url) => {
	const [state, setState] = useState({ loading: false, data: null });
	useEffect(() => {
		setState((currentState) => ({
			loading: true,
			data: currentState.data
		}));
		fetch(url)
			.then((x) => x.text())
			.then((x) => setState({ loading: false, data: x }));
	}, url);
	return state;
};
