import { createContext } from 'react';

interface ContextProps {
    formAddingOpen: boolean;
    isDragging: boolean;
    openFormAdding: () => void;
    closeFormAdding: () => void;
    startDragging: () => void;
    endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
