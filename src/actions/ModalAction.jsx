import {
    OPEN_MODAL,
    CLOSE_MODAL
} from '../types/ModalTypes'

export function openModal(modalName) {
    return async (dispatch) => dispatch({
        type: OPEN_MODAL,
        payload: modalName
    })
}

export function closeModal(modalName) {
    return async (dispatch) => dispatch({
        type: CLOSE_MODAL,
        payload: modalName
    })
}