import { createContext } from 'react';

interface ContextProps {
    sideMenuOpen: boolean;
    formAddingOpen: boolean;
    isDragging: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    openFormAdding: () => void;
    closeFormAdding: () => void;
    startDragging: () => void;
    endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
