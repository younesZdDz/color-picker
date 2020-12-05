import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthType } from '../types';
import config from '../config';

export const AuthContext = createContext<AuthType | null>(null);
export const SetAuthContext = createContext<React.Dispatch<React.SetStateAction<AuthType | null>> | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = useState<AuthType | null>(null);
    useEffect(() => {
        const fetchAuth = async () => {
            const res = await axios.get(`${config.API_URI}/api/v1/auth/current_user`, { withCredentials: true });
            if (res.data) {
                if (setAuth) {
                    setAuth({ ...res.data, isAuth: true });
                }
            } else {
                setAuth({ userId: '', isAuth: false });
            }
        };
        fetchAuth();
    }, []);
    return (
        <SetAuthContext.Provider value={setAuth}>
            <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
        </SetAuthContext.Provider>
    );
};
