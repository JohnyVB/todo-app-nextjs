import { Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material';
import { Layout } from '../../components/layouts/Layout';
import { GetServerSideProps } from 'next'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import { Entry, EntryStatus } from '../../interfaces/entry';
import { ChangeEvent, useMemo, useState, useContext } from 'react';
import { getEntryById } from '../../database/dbEntries';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { useRouter } from 'next/router';
import { getFormatDate } from '../../utils/dateFunctions';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry
}

const EntryPage = ({ entry }: Props) => {

    const [inputValue, setInputValue] = useState<string>(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState<boolean>(false);
    const { updateEntry, deleteEntry } = useContext(EntriesContext);

    const { back } = useRouter();

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChage = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);
    }

    const onSave = () => {
        if (inputValue.trim().length === 0) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry(updatedEntry, true);
    }

    const onDelete = () => {
        deleteEntry(entry);
        back();
    }

    return (
        <Layout>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada:`}
                            subheader={`Creada ${getFormatDate(entry.createAt)}`}
                        />
                        <CardContent>
                            <TextField
                                sx={{ marginBottom: 1 }}
                                fullWidth
                                placeholder='Entrada'
                                autoFocus
                                multiline
                                label='Actualizar entrada'
                                value={inputValue}
                                onChange={onInputValueChange}
                                onBlur={() => setTouched(true)}
                                helperText={isNotValid && 'Ingrese un valor'}
                                error={isNotValid}
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChage}
                                >
                                    {
                                        validStatus.map(option => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={capitalize(option)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                variant='contained'
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
                            >
                                Guardar
                            </Button>
                            <Button
                                endIcon={<BackupTableOutlinedIcon />}
                                variant='contained'
                                color='error'
                                fullWidth
                                onClick={() => back()}
                            >
                                Atras
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'red'
                }}
                onClick={onDelete}
            >
                <DeleteOutlinedIcon />
            </IconButton>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string };
    const entry = await getEntryById(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;
