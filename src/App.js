import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PaletteList from './components/PaletteList';
import Palette from './components/Palette';
import ColorPalette from './components/SingleColorPalette';
import PaletteForm from './components/NewPaletteForm';
import Page from './components/Page/Page';
import seedColors from './constants/seedColors';
import { generatePalette } from './utils/paletteGenerator';
import './App.css';

function App() {
	const [palettes, setPalletes] = useState(() => {
		const savedPalettes = JSON.parse(
			window.localStorage.getItem('palettes')
		);
		return savedPalettes || seedColors;
	});

	useEffect(() => {
		syncLocalStorage();
	}, [palettes]);

	const findPalette = (id) => {
		palettes.find((palette) => palette.id === id);
	};

	const savePalette = (newPalette) => {
		setPalletes((p) => [...p, newPalette]);
	};

	const deletePalette = (id) => {
		setPalletes((p) => p.filter((palette) => palette.id !== id));
	};

	const syncLocalStorage = () => {
		// save palettes to local storage
		window.localStorage.setItem('palettes', JSON.stringify(palettes));
	};

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
											palettes={palettes}
											deletePalette={deletePalette}
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
											savePalette={savePalette}
											palettes={palettes}
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
											palettes={palettes}
											deletePalette={deletePalette}
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
