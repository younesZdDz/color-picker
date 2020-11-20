import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
    paletteIsFull: boolean;
    colors: { name: string; color: string }[];
    addNewColor: (newColor: { name: string; color: string }) => void;
}
interface State {
    currentColor: string;
    newColorName: string;
}
class ColorPickerForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { currentColor: 'teal', newColorName: '' };
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value: string) =>
            this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase()),
        );
        ValidatorForm.addValidationRule('isColorUnique', () =>
            this.props.colors.every(({ color }) => color !== this.state.currentColor),
        );
    }

    updateCurrentColor(newColor: { hex: string }) {
        this.setState({ currentColor: newColor.hex });
    }

    handleChange(evt: React.ChangeEvent<{ name: string; value: string }>) {
        this.setState({
            [evt.target.name]: evt.target.value,
        } as Pick<State, keyof State>);
    }

    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName,
        };
        this.props.addNewColor(newColor);
        this.setState({ newColorName: '' });
    }

    render() {
        const { paletteIsFull, classes } = this.props;
        const { currentColor, newColorName } = this.state;
        return (
            <div>
                <ChromePicker color={currentColor} onChangeComplete={this.updateCurrentColor} />
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
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!']}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={paletteIsFull}
                        className={classes.addColor}
                        style={{
                            backgroundColor: paletteIsFull ? 'grey' : currentColor,
                        }}
                    >
                        {paletteIsFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default withStyles(styles)(ColorPickerForm);
