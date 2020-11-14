import React, { useContext, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Helmet from 'react-helmet';
import Page from './components/Page/Page';
import { generatePalette } from './utils/paletteGenerator';
import { PaletteContext } from './contexts/palette.context';
import './App.css';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
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
										<Helmet>
											<title>Color-picker</title>
											<meta
												name="description"
												content="List of color palettes"
											/>
										</Helmet>
										<ErrorBoundary>
											<Suspense fallback={<Loading />}>
												<PaletteList
													history={routeProps.history}
												/>
											</Suspense>
										</ErrorBoundary>
									</Page>
								)}
							/>
							<Route
								exact
								path="/palette/new"
								render={(routeProps) => (
									<Page>
										<Helmet>
											<title>
												Create new palette |
												Color-picker
											</title>
											<meta
												name="description"
												content="Create a new palette"
											/>
										</Helmet>
										<ErrorBoundary>
											<Suspense fallback={<Loading />}>
												<PaletteForm
													history={routeProps.history}
												/>
											</Suspense>
										</ErrorBoundary>
									</Page>
								)}
							/>
							<Route
								exact
								path="/palette/:id"
								render={(routeProps) => {
									const palette = generatePalette(
										findPalette(routeProps.match.params.id)
									);
									return (
										<Page>
											<Helmet>
												<title>
													{`${palette.paletteName} | Color-picker`}
												</title>
												<meta
													name="description"
													content={`Color details of ${palette.paletteName}`}
												/>
											</Helmet>
											<ErrorBoundary>
												<Suspense
													fallback={<Loading />}
												>
													<Palette
														palette={palette}
													/>
												</Suspense>
											</ErrorBoundary>
										</Page>
									);
								}}
							/>
							<Route
								exact
								path="/palette/:paletteId/:colorId"
								render={(routeProps) => {
									const palette = generatePalette(
										findPalette(
											routeProps.match.params.paletteId
										)
									);
									return (
										<Page>
											<Helmet>
												<title>
													{`${routeProps.match.params.colorId} | Color-picker`}
												</title>
												<meta
													name="description"
													content={`Variants of color details of ${routeProps.match.params.colorId}`}
												/>
											</Helmet>
											<ErrorBoundary>
												<Suspense
													fallback={<Loading />}
												>
													<ColorPalette
														colorId={
															routeProps.match
																.params.colorId
														}
														palette={palette}
													/>
												</Suspense>
											</ErrorBoundary>
										</Page>
									);
								}}
							/>
							<Route
								render={(routeProps) => (
									<Page>
										<Helmet>
											<title>Color-picker</title>
											<meta
												name="description"
												content="List of color palettes"
											/>
										</Helmet>
										<ErrorBoundary>
											<Suspense fallback={<Loading />}>
												<PaletteList
													history={routeProps.history}
												/>
											</Suspense>
										</ErrorBoundary>
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
