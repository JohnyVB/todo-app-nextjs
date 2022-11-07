import { FC, ReactNode, useReducer } from 'react';
import { UIContext, UIReducer } from './';

export interface UIState {
    sideMenuOpen: boolean;
    formAddingOpen: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    formAddingOpen: false,
    isDragging: false
}

interface props {
    children: ReactNode
}

export const UIProvider: FC<props> = ({ children }) => {

    const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Siderbar' });
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Siderbar' });
    }

    const openFormAdding = () => {
        dispatch({ type: 'UI - Open FormAdding' });
    }

    const closeFormAdding = () => {
        dispatch({ type: 'UI - Close FormAdding' });
    }

    const startDragging = () => {
        dispatch({ type: 'UI - Start Dragging' });
    }

    const endDragging = () => {
        dispatch({ type: 'UI - End Dragging' });
    }

    return (
        <UIContext.Provider value={{
            ...state,
            openSideMenu,
            closeSideMenu,
            openFormAdding,
            closeFormAdding,
            startDragging,
            endDragging
        }}>
            {children}
        </UIContext.Provider>
    )
}