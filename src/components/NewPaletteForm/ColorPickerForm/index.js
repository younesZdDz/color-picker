import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './styles';
class ColorPickerForm extends Component {
	constructor(props) {
		super(props);
		this.state = { currentColor: 'teal', newColorName: '' };
		this.updateCurrentColor = this.updateCurrentColor.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			this.props.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule('isColorUnique', () =>
			this.props.colors.every(
				({ color }) => color !== this.state.currentColor
			)
		);
	}

	updateCurrentColor(newColor) {
		this.setState({ currentColor: newColor.hex });
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}

	handleSubmit() {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorName
		};
		this.props.addNewColor(newColor);
		this.setState({ newColorName: '' });
	}

	render() {
		const { paletteIsFull, classes } = this.props;
		const { currentColor, newColorName } = this.state;
		return (
			<div>
				<ChromePicker
					color={currentColor}
					onChangeComplete={this.updateCurrentColor}
				/>
				<ValidatorForm
					onSubmit={this.handleSubmit}
					instantValidate={false}
					// eslint-disable-next-line react/no-string-refs
					ref="form"
				>
					<TextValidator
						value={newColorName}
						name="newColorName"
						className={classes.colorNameInput}
						placeholder="Color Name"
						variant="filled"
						margin="normal"
						onChange={this.handleChange}
						validators={[
							'required',
							'isColorNameUnique',
							'isColorUnique'
						]}
						errorMessages={[
							'Enter a color name',
							'Color name must be unique',
							'Color already used!'
						]}
					/>
					<Button
						variant="contained"
						type="submit"
						color="primary"
						disabled={paletteIsFull}
						className={classes.addColor}
						style={{
							backgroundColor: paletteIsFull
								? 'grey'
								: currentColor
						}}
					>
						{paletteIsFull ? 'Palette Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

ColorPickerForm.propTypes = {
	classes: PropTypes.object.isRequired,
	colors: PropTypes.arrayOf(
		PropTypes.shape({
			color: PropTypes.string.isRequired
		})
	).isRequired,
	paletteIsFull: PropTypes.bool.isRequired,
	addNewColor: PropTypes.func.isRequired
};
export default withStyles(styles)(ColorPickerForm);
