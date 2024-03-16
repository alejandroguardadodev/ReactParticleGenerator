import {
    OPEN_MODAL,
    CLOSE_MODAL
} from '../types/ModalTypes'

const initialState  = {
    "Sprite_Sheet": false
}

export default function(state = initialState, action) {
    const { type } = action

    switch(type) {
        case OPEN_MODAL:
            return {
                ...state,
                [action.payload]: true,
            }

        case CLOSE_MODAL:
            return {
                ...state,
                [action.payload]: false,
            }

        default:
            return state
    }
}