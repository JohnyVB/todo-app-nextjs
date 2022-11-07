import { UIState } from "./";

type UIActionType = 
    | { type: 'UI - Open Siderbar' }
    | { type: 'UI - Close Siderbar' }
    | { type: 'UI - Open FormAdding' }
    | { type: 'UI - Close FormAdding' }
    | { type: 'UI - Start Dragging' }
    | { type: 'UI - End Dragging' }

export const UIReducer = (state: UIState, action: UIActionType): UIState => {

    switch (action.type) {
        case 'UI - Open Siderbar':
            return {
                ...state,
                sideMenuOpen: true
            }

        case 'UI - Close Siderbar':
            return {
                ...state,
                sideMenuOpen: false
            }

        case 'UI - Open FormAdding':
            return {
                ...state,
                formAddingOpen: true
            }

        case 'UI - Close FormAdding':
            return {
                ...state,
                formAddingOpen: false
            }

        case 'UI - Start Dragging':
            return {
                ...state,
                isDragging: true
            }

        case 'UI - End Dragging':
            return {
                ...state,
                isDragging: false
            }
    
        default:
            return state;
    }
}