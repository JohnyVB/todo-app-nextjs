import { FC, ReactNode, useEffect, useReducer } from 'react';
import entriesApi from '../../api/entriesApi';
import { Entry } from '../../interfaces';
import { EntriesContext, EntriesReducer } from './';
import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITAL_STATE: EntriesState = {
    entries: []
}

interface props {
    children: ReactNode
}

export const EntriesProvider: FC<props> = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [state, dispatch] = useReducer(EntriesReducer, ENTRIES_INITAL_STATE);

    const addNewEntry = async (description: string) => {
        try {
            const { data } = await entriesApi.post<Entry>('/entries', { description });
            dispatch({ type: 'Entry - Add-Entry', payload: data });
            enqueueSnackbar('Nueva entrada creada', {
                variant: 'success',
                autoHideDuration: 1500
            });
        } catch (error) {
            console.log({ error });
            enqueueSnackbar('Error al crear la entrada', {
                variant: 'error',
                autoHideDuration: 1500
            });
        }
    }

    const updateEntry = async ({ _id, description, status }: Entry, showNotistack: boolean = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
            dispatch({ type: 'Entry - Updated-Entry', payload: data });
            if (showNotistack) {
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500
                });
            }
        } catch (error) {
            console.log({ error });
            enqueueSnackbar('Error al actualizar la entrada', {
                variant: 'error',
                autoHideDuration: 1500
            });
        }
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: 'Entry - Refresh-Data', payload: data });
    }

    useEffect(() => {
        refreshEntries();
    }, [])

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}