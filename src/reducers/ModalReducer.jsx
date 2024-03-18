import {
    OPEN_MODAL,
    CLOSE_MODAL
} from '../types/ModalTypes'

const initModalValue = {
    open: false,
    onClose: null,
    label: ''
}

const initialState  = {
    "Sprite_Sheet": {
        ...initModalValue
    }
}

export default function(state = initialState, action) {
    const { type } = action

    switch(type) {
        case OPEN_MODAL:
            const { modal_title, modal_data } = action.payload

            return {
                ...state,
                [modal_title]: {
                    open: true,
                    ...modal_data
                },
            }

        case CLOSE_MODAL:
            return {
                ...state,
                [action.payload]: {
                    ...initModalValue
                },
            }

        default:
            return state
    }
}