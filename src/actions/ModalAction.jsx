import {
    OPEN_MODAL,
    CLOSE_MODAL
} from '../types/ModalTypes'

export function openModal(modalName, actions) {
    return async (dispatch) => dispatch({
        type: OPEN_MODAL,
        payload: {
            modal_title: modalName,
            modal_data: actions
        }
    })
}

export function closeModal(modalName) {
    return async (dispatch) => dispatch({
        type: CLOSE_MODAL,
        payload: modalName
    })
}