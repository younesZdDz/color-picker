import { useState } from 'react';

export const useForm = <T>(initialValues: T): [T, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
    const [values, setValues] = useState(initialValues);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((currentValues) => ({
            ...currentValues,
            [e.target.name]: e.target.value,
        }));
    };
    return [values, onChange];
};
