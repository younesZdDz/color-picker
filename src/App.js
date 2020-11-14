import React, { useContext, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from './components/Page/Page';
import { generatePalette } from './utils/paletteGenerator';
import { PaletteContext } from './contexts/palette.context';
import './App.css';
import Loading from './components/Loading';
const PaletteList = React.lazy(() => import('./components/PaletteList'));
const Palette = React.lazy(() => import('./components/Palette'));
const PaletteForm = React.lazy(() => import('./components/NewPaletteForm'));
const ColorPalette = React.lazy(() =>
	import('./components/SingleColorPalette')
);

function App() {
	const palettes = useContext(PaletteContext);

	const findPalette = (id) => palettes.find((palette) => palette.id === id);

	return (
		<Route
			render={({ location }) => (
				<TransitionGroup>
					<CSSTransition
						key={location.key}
						classNames="page"
						timeout={500}
					>
						<Switch location={location}>
							<Route
								exact
								path="/"
								render={(routeProps) => (
									<Page>
										<Suspense fallback={<Loading />}>
											<PaletteList
												history={routeProps.history}
											/>
										</Suspense>
									</Page>
								)}
							/>
							<Route
								exact
								path="/palette/new"
								render={(routeProps) => (
									<Page>
										<Suspense fallback={<Loading />}>
											<PaletteForm
												history={routeProps.history}
											/>
										</Suspense>
									</Page>
								)}
							/>
							<Route
								exact
								path="/palette/:id"
								render={(routeProps) => (
									<Page>
										<Suspense fallback={<Loading />}>
											<Palette
												palette={generatePalette(
													findPalette(
														routeProps.match.params
															.id
													)
												)}
											/>
										</Suspense>
									</Page>
								)}
							/>
							<Route
								exact
								path="/palette/:paletteId/:colorId"
								render={(routeProps) => (
									<Page>
										<Suspense fallback={<Loading />}>
											<ColorPalette
												colorId={
													routeProps.match.params
														.colorId
												}
												palette={generatePalette(
													findPalette(
														routeProps.match.params
															.paletteId
													)
												)}
											/>
										</Suspense>
									</Page>
								)}
							/>
							<Route
								render={(routeProps) => (
									<Page>
										<Suspense fallback={<Loading />}>
											<PaletteList
												history={routeProps.history}
											/>
										</Suspense>
									</Page>
								)}
							/>
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			)}
		/>
	);
}

export default App;
