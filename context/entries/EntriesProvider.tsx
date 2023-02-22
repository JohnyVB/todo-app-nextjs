import { FC, ReactNode, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createAt: new Date().getTime(),
            status: 'pending'
        }

        dispatch({ type: 'Entry - Add-Entry', payload: newEntry });
    }

    const updateEntry = (entry: Entry) => {
        dispatch({ type: 'Entry - Updated-Entry', payload: entry });
    }

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