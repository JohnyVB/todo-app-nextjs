import { List, Paper } from "@mui/material";
import { FC, useContext, useMemo, DragEvent } from 'react';
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./";
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui/UIContext';
import sEntryList from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

    const { isDragging } = useContext(UIContext);
    
    const { entries } = useContext(EntriesContext);

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

    const allowDrop = ( event: DragEvent ) => {
        event.preventDefault();
    }

    const onDropEntry = ( event: DragEvent ) => {
        const id = event.dataTransfer.getData('id');
        console.log(id);
    }

    return (
        // TODO: Aqui haremos Drop
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? sEntryList.dragging : ''}
        >
            <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'auto', backgroundColor: 'transparent', padding: '3px 5px' }}>

                {/* TODO: Cambiara dependiendo si estoy haciendo un drag o no */}
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                    {
                        entriesByStatus.map( (entry, index) => (
                            <EntryCard key={index} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
