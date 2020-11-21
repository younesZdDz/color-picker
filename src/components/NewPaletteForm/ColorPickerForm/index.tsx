import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { Formik } from 'formik';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { BasicColorType } from '../../../types';
import { TextField } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
    paletteIsFull: boolean;
    colors: BasicColorType[];
    addNewColor: (newColor: BasicColorType) => void;
}
interface State {
    currentColor: string;
}
class ColorPickerForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { currentColor: 'teal' };
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
    }

    updateCurrentColor(newColor: { hex: string }) {
        this.setState({ currentColor: newColor.hex });
    }

    render() {
        const { paletteIsFull, classes } = this.props;
        const { currentColor } = this.state;
        return (
            <div className={classes.root}>
                <ChromePicker color={currentColor} onChangeComplete={this.updateCurrentColor} />
                <Formik
                    validateOnChange={false}
                    validateOnBlur={false}
                    initialValues={{ newColorName: '' }}
                    validate={({ newColorName }) => {
                        const errors: {
                            newColorName?: string;
                        } = {};
                        if (!newColorName) {
                            errors.newColorName = 'Enter a color name';
                            return errors;
                        }
                        const isColorNameUnique = this.props.colors.every(
                            ({ name }) => name.toLowerCase() !== newColorName.toLowerCase(),
                        );
                        if (!isColorNameUnique) {
                            errors.newColorName = 'Color name must be unique';
                            return errors;
                        }
                        const isColorUnique = this.props.colors.every(({ color }) => color !== this.state.currentColor);
                        if (!isColorUnique) {
                            errors.newColorName = 'Color already used!';
                            return errors;
                        }
                    }}
                    onSubmit={(
                        values: { newColorName: string },
                        { setSubmitting }: { setSubmitting: (v: boolean) => void },
                    ) => {
                        const newColor = {
                            color: this.state.currentColor,
                            name: values.newColorName,
                        };
                        this.props.addNewColor(newColor);
                        setSubmitting(false);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                error={touched.newColorName && errors.newColorName !== undefined}
                                helperText={errors.newColorName}
                                variant="filled"
                                name="newColorName"
                                className={classes.colorNameInput}
                                placeholder="Color Name"
                                value={values.newColorName}
                                onChange={handleChange}
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
                        </form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default withStyles(styles)(ColorPickerForm);
