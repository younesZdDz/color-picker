import { useState } from 'react';

export const useToggle = (initialValue = false): [boolean, () => void] => {
    const [value, setValue] = useState(initialValue);
    const toggle = () => {
        setValue(!value);
    };
    return [value, toggle];
};
