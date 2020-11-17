import { useState } from 'react';

export const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const onChange = (e) => {
        setValues((currentValues) => ({
            ...currentValues,
            [e.target.name]: e.target.value,
        }));
    };
    return [values, onChange];
};
