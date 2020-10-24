import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stage: 'form',
			newPaletteName: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.showEmojiPicker = this.showEmojiPicker.bind(this);
		this.savePalette = this.savePalette.bind(this);
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
			this.props.palettes.every(
				({ paletteName }) =>
					paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}

	showEmojiPicker() {
		this.setState({ stage: 'emoji' });
	}

	savePalette(emoji) {
		const newPalette = {
			paletteName: this.state.newPaletteName,
			emoji: emoji.native
		};
		this.setState({ stage: '' });
		this.props.handleSubmit(newPalette);
	}

	render() {
		const { newPaletteName, stage } = this.state;
		const { hideForm } = this.props;

		return (
			<>
				<Dialog open={stage === 'emoji'} onClose={hideForm}>
					<DialogTitle id="form-dialog-title">
						Choose a Palette Emoji
					</DialogTitle>
					<Picker
						title="Pick a Palette Emoji"
						onSelect={this.savePalette}
					/>
				</Dialog>
				<Dialog
					open={stage === 'form'}
					onClose={hideForm}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						Choose a Palette Name
					</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContentText>
								Please enter a name for your new beautiful
								palette. Make sure it&apos;s unique!
							</DialogContentText>
							<TextValidator
								label="Palette Name"
								value={newPaletteName}
								name="newPaletteName"
								onChange={this.handleChange}
								validators={['required', 'isPaletteNameUnique']}
								errorMessages={[
									'Enter Palette Name',
									'Name already used'
								]}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={hideForm} color="primary">
								Cancel
							</Button>
							<Button
								variant="contained"
								color="primary"
								type="submit"
							>
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</>
		);
	}
}

PaletteMetaForm.propTypes = {
	palettes: PropTypes.arrayOf(
		PropTypes.shape({
			paletteName: PropTypes.string.isRequired
		}).isRequired
	),
	handleSubmit: PropTypes.func.isRequired,
	hideForm: PropTypes.func.isRequired
};
export default PaletteMetaForm;
