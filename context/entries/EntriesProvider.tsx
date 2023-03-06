import { FC, ReactNode, useEffect, useReducer } from 'react';
import entriesApi from '../../api/entriesApi';
import { Entry } from '../../interfaces';
import { EntriesContext, EntriesReducer } from './';

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
    const [state, dispatch] = useReducer(EntriesReducer, ENTRIES_INITAL_STATE);

    const addNewEntry = async (description: string) => {
        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: 'Entry - Add-Entry', payload: data });
    }

    const updateEntry = async ({ _id, description, status }: Entry) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
            dispatch({ type: 'Entry - Updated-Entry', payload: data });
        } catch (error) {
            console.log({ error });
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