import React, { createContext, useState } from 'react';
import { AuthType } from '../types';
const initialValue = { userId: '', isAuth: false };
export const AuthContext = createContext<AuthType>(initialValue);
export const SetAuthContext = createContext<React.Dispatch<React.SetStateAction<AuthType>> | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
    const [auth, SetAuth] = useState<AuthType>(initialValue);

    return (
        <SetAuthContext.Provider value={SetAuth}>
            <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
        </SetAuthContext.Provider>
    );
};
