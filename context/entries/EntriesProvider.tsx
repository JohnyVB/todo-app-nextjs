import { FC, ReactNode, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Entry } from '../../interfaces';
import { EntriesContext, EntriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendiente: Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            createAt: new Date().getTime(),
            status: 'pending'
        },
        {
            _id: uuidv4(),
            description: 'En progreso: Deserunt anim proident veniam enim sunt consectetur adipisicing elit consectetur.',
            createAt: new Date().getTime() - 100000,
            status: 'in-progress'
        },
        {
            _id: uuidv4(),
            description: 'Finalizada: Lorem tempor do pariatur laboris tempor et mollit esse sint dolore.',
            createAt: new Date().getTime() - 1000000,
            status: 'finished'
        },
    ]
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

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry
        }}>
            { children }
        </EntriesContext.Provider>
    )
}