const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			return [...state, action.newPalette];
		case 'DELETE':
			return state.filter((palette) => palette.id !== action.id);
		default:
			return state;
	}
};

export default reducer;
