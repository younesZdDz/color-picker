import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PalettesProvider } from './contexts/palette.context';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <PalettesProvider>
                <App />
            </PalettesProvider>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root'),
);
