const { useState } = require('react');

export function useToggle(initialValue = false) {
	const [value, setValue] = useState(initialValue);
	const toggle = () => {
		setValue(!value);
	};
	return [value, toggle];
}
