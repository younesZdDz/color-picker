import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PaletteList from './components/PaletteList';
import Palette from './components/Palette';
import ColorPalette from './components/SingleColorPalette';
import PaletteForm from './components/NewPaletteForm';
import Page from './components/Page/Page';
import { generatePalette } from './utils/paletteGenerator';
import { PaletteContext } from './contexts/palette.context';
import './App.css';

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
										<PaletteList
											history={routeProps.history}
										/>
									</Page>
								)}
							/>
							<Route
								exact
								path="/palette/new"
								render={(routeProps) => (
									<Page>
										<PaletteForm
											history={routeProps.history}
										/>
									</Page>
								)}
							/>
							<Route
								exact
								path="/palette/:id"
								render={(routeProps) => (
									<Page>
										<Palette
											palette={generatePalette(
												findPalette(
													routeProps.match.params.id
												)
											)}
										/>
									</Page>
								)}
							/>
							<Route
								exact
								path="/palette/:paletteId/:colorId"
								render={(routeProps) => (
									<Page>
										<ColorPalette
											colorId={
												routeProps.match.params.colorId
											}
											palette={generatePalette(
												findPalette(
													routeProps.match.params
														.paletteId
												)
											)}
										/>
									</Page>
								)}
							/>
							<Route
								render={(routeProps) => (
									<Page>
										<PaletteList
											history={routeProps.history}
										/>
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
