import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { FC, DragEvent, useContext } from 'react';
import { Entry } from "../../interfaces";
import { UIContext } from '../../context/ui/UIContext';

interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext);

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('id', entry._id);
        startDragging();
        // TODO: modificar el estado, para indicar que esta haciendo drag
    }

    const onDragEnd = () => {
        endDragging();
    }

    return (
        <Card
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant="body2">hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
