import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PalettesProvider } from './contexts/palette.context';
import { AuthProvider } from './contexts/auth.context';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <PalettesProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </PalettesProvider>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root'),
);
