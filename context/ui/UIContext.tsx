import { createContext } from 'react';

interface ContextProps {
    sideMenuOpen: boolean;
    formAddingOpen: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    openFormAdding: () => void;
    closeFormAdding: () => void;
}

export const UIContext = createContext({} as ContextProps);
