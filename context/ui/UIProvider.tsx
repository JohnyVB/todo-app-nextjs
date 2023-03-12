import { FC, ReactNode, useReducer } from 'react';
import { UIContext, UIReducer } from './';

export interface UIState {
    formAddingOpen: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    formAddingOpen: false,
    isDragging: false
}

interface Props {
    children: ReactNode
}

export const UIProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

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
            openFormAdding,
            closeFormAdding,
            startDragging,
            endDragging
        }}>
            {children}
        </UIContext.Provider>
    )
}