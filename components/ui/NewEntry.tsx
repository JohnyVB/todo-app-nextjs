import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);
    const { addNewEntry } = useContext(EntriesContext);
    const { formAddingOpen, openFormAdding, closeFormAdding } = useContext(UIContext)

    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onSave = () => {
        if (inputValue.length === 0) return;
        addNewEntry(inputValue);
        setTouched(false);
        setInputValue('');
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 1 }}>

            {
                formAddingOpen ? (
                    <>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                            error={inputValue.length <= 0 && touched}
                            value={inputValue}
                            onChange={onTextFieldChanged}
                            onBlur={() => setTouched(true)}
                        />

                        <Box display='flex' justifyContent='space-between'>
                            <Button
                                variant="outlined"
                                endIcon={<CancelOutlinedIcon />}
                                onClick={closeFormAdding}
                            >
                                Cancelar
                            </Button>

                            <Button
                                variant="outlined"
                                color="secondary"
                                endIcon={<SaveOutlinedIcon />}
                                onClick={() => {
                                    onSave();
                                    closeFormAdding();
                                }}
                            >
                                Guardar
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Button
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                        fullWidth
                        variant='outlined'
                        onClick={openFormAdding}
                    >
                        Agregar Nueva Tarea
                    </Button>
                )
            }

        </Box>
    )
}
