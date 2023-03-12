import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { DragEvent, useContext } from 'react';
import { Entry } from "../../interfaces";
import { UIContext } from '../../context/ui/UIContext';
import { useRouter } from "next/router";
import { getFormatDate } from '../../utils/dateFunctions';

interface Props {
    entry: Entry
}

export const EntryCard = ({ entry }: Props) => {

    const { startDragging, endDragging } = useContext(UIContext);
    const router = useRouter();

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('id', entry._id);
        startDragging();
    }

    const onDragEnd = () => {
        endDragging();
    }

    const onclick = () => {
        router.push(`/entries/${entry._id}`);
    }

    return (
        <Card
            onClick={onclick}
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant="body2">{getFormatDate(entry.createAt)}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
