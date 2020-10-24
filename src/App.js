import React from 'react';
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

class App extends React.Component {
	constructor(props) {
		super(props);
		const savedPalettes = JSON.parse(
			window.localStorage.getItem('palettes')
		);
		this.state = { palettes: savedPalettes || seedColors };
		this.savePalette = this.savePalette.bind(this);
		this.findPalette = this.findPalette.bind(this);
		this.deletePalette = this.deletePalette.bind(this);
	}

	findPalette(id) {
		return this.state.palettes.find((palette) => palette.id === id);
	}

	savePalette(newPalette) {
		this.setState(
			(state) => ({
				palettes: [...state.palettes, newPalette]
			}),
			this.syncLocalStorage
		);
	}

	deletePalette(id) {
		this.setState(
			(state) => ({
				palettes: state.palettes.filter((palette) => palette.id !== id)
			}),
			this.syncLocalStorage
		);
	}

	syncLocalStorage() {
		// save palettes to local storage
		window.localStorage.setItem(
			'palettes',
			JSON.stringify(this.state.palettes)
		);
	}

	render() {
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
												palettes={this.state.palettes}
												deletePalette={
													this.deletePalette
												}
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
												savePalette={this.savePalette}
												palettes={this.state.palettes}
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
													this.findPalette(
														routeProps.match.params
															.id
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
													routeProps.match.params
														.colorId
												}
												palette={generatePalette(
													this.findPalette(
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
												palettes={this.state.palettes}
												deletePalette={
													this.deletePalette
												}
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
}

export default App;
