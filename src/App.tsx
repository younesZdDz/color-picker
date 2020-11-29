import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from './components/Page/Page';
import { generatePalette } from './utils/paletteGenerator';
import { PaletteContext } from './contexts/palette.context';
import Loading from './components/Loading';
import { BasicPaletteType } from './types';
const PaletteList = React.lazy(() => import('./components/PaletteList'));
const Palette = React.lazy(() => import('./components/Palette'));
const PaletteForm = React.lazy(() => import('./components/NewPaletteForm'));
const ColorPalette = React.lazy(() => import('./components/SingleColorPalette'));
import './App.css';
import errorImage from './assets/500.svg';
import NotFound from './components/NotFound';
import Login from './components/Login';

const App: React.FC = () => {
    const palettes = useContext(PaletteContext);

    const findPalette = (id: string): BasicPaletteType | undefined => {
        if (!palettes) {
            return;
        }
        return palettes.find((palette) => palette.id === id);
    };

    return (
        <Route
            render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames="page" timeout={500}>
                        <Switch location={location}>
                            <Route
                                exact
                                path="/auth"
                                render={() => (
                                    <Page
                                        title="Color-picker login"
                                        description="login to Color-picker"
                                        fallback={<Loading />}
                                        errorImage={errorImage}
                                        requireLogin={false}
                                    >
                                        <Login />
                                    </Page>
                                )}
                            />
                            <Route
                                exact
                                path="/"
                                render={(routeProps) => (
                                    <Page
                                        title="Color-picker"
                                        description="List of color palettes"
                                        fallback={<Loading />}
                                        errorImage={errorImage}
                                        requireLogin={true}
                                    >
                                        <PaletteList history={routeProps.history} />
                                    </Page>
                                )}
                            />
                            <Route
                                exact
                                path="/palette/new"
                                render={(routeProps) => (
                                    <Page
                                        title="Create new palette | Color-picker"
                                        description="Create a new palette"
                                        fallback={<Loading />}
                                        errorImage={errorImage}
                                        requireLogin={true}
                                    >
                                        <PaletteForm history={routeProps.history} />
                                    </Page>
                                )}
                            />
                            <Route
                                exact
                                path="/palette/:id"
                                render={(routeProps) => {
                                    const basicPalette = findPalette(routeProps.match.params.id);
                                    if (basicPalette) {
                                        const palette = generatePalette(basicPalette);
                                        return (
                                            <Page
                                                title={`${palette.paletteName} | Color-picker`}
                                                description={`Color details of ${palette.paletteName}`}
                                                fallback={<Loading />}
                                                errorImage={errorImage}
                                                requireLogin={true}
                                            >
                                                <Palette palette={palette} />
                                            </Page>
                                        );
                                    }
                                }}
                            />
                            <Route
                                exact
                                path="/palette/:paletteId/:colorId"
                                render={(routeProps) => {
                                    const basicPalette = findPalette(routeProps.match.params.paletteId);
                                    if (basicPalette) {
                                        const palette = generatePalette(basicPalette);
                                        return (
                                            <Page
                                                title={`${routeProps.match.params.colorId} | Color-picker`}
                                                description={`Variants of color details of ${routeProps.match.params.colorId}`}
                                                fallback={<Loading />}
                                                errorImage={errorImage}
                                                requireLogin={true}
                                            >
                                                <ColorPalette
                                                    colorId={routeProps.match.params.colorId}
                                                    palette={palette}
                                                />
                                            </Page>
                                        );
                                    }
                                }}
                            />
                            <Route
                                render={() => (
                                    <Page
                                        title="Oop, something lost"
                                        description="Page not found"
                                        fallback={<Loading />}
                                        errorImage={errorImage}
                                        requireLogin={false}
                                    >
                                        <NotFound />
                                    </Page>
                                )}
                            />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )}
        />
    );
};

export default App;
