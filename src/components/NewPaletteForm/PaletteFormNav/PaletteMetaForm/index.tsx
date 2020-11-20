import React, { useEffect, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker, BaseEmoji } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { PaletteContext } from '../../../../contexts/palette.context';
import { BasicPaletteType } from '../../../../types';

interface Props {
    handleSubmit: (newPalette: BasicPaletteType) => void;
    hideForm: () => void;
}
const PaletteMetaForm: React.FC<Props> = ({ handleSubmit, hideForm }) => {
    const palettes = useContext(PaletteContext);

    const [state, setState] = useState({
        stage: 'form',
        newPaletteName: '',
    });
    useEffect(() => {
        if (palettes) {
            ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
                palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()),
            );
        }
    }, [palettes]);

    const handleChange = (evt: React.ChangeEvent<{ name: string; value: string }>) => {
        setState((s) => ({
            ...s,
            [evt.target.name]: evt.target.value,
        }));
    };

    const showEmojiPicker = () => {
        setState((s) => ({ ...s, stage: 'emoji' }));
    };

    const savePalette = (emoji: BaseEmoji) => {
        const newPalette = {
            paletteName: state.newPaletteName,
            emoji: emoji.native,
        };
        setState((s) => ({ ...s, stage: '' }));
        handleSubmit(newPalette as BasicPaletteType);
    };
    const { newPaletteName, stage } = state;
    return (
        <>
            <Dialog open={stage === 'emoji'} onClose={hideForm}>
                <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
                <Picker title="Pick a Palette Emoji" onSelect={savePalette} />
            </Dialog>
            <Dialog open={stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={showEmojiPicker}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your new beautiful palette. Make sure it&apos;s unique!
                        </DialogContentText>
                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            name="newPaletteName"
                            onChange={handleChange}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['Enter Palette Name', 'Name already used']}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={hideForm} color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </>
    );
};

export default PaletteMetaForm;
