import { List, Paper } from "@mui/material";
import { useContext, useMemo, DragEvent } from 'react';
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./";
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui/UIContext';
import sEntryList from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList = ({ status }: Props) => {

    const { isDragging, endDragging } = useContext(UIContext);

    const { entries, updateEntry } = useContext(EntriesContext);

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

    const allowDrop = (event: DragEvent) => {
        event.preventDefault();
    }

    const onDropEntry = (event: DragEvent) => {
        const id = event.dataTransfer.getData('id');
        const entry = entries.find(e => e._id === id)!;
        entry.status = status;
        updateEntry(entry);
        endDragging();
    }

    return (

        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? sEntryList.dragging : ''}
        >
            <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'auto', backgroundColor: 'transparent', padding: '3px 5px' }}>


                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                    {
                        entriesByStatus.map((entry, index) => (
                            <EntryCard key={index} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
