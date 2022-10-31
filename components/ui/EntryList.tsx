import { List, Paper } from "@mui/material";
import { FC, useContext, useMemo } from 'react';
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./";
import { EntriesContext } from '../../context/entries';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
    
    const { entries } = useContext(EntriesContext);

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

    return (
        // TODO: Aqui haremos Drop
        <div>
            <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '3px 5px' }}>

                {/* TODO: Cambiara dependiendo si estoy haciendo un drag o no */}
                <List sx={{ opacity: 1 }}>
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
