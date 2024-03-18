import { useSelector, useDispatch } from 'react-redux'

import { openModal, closeModal } from '../actions/ModalAction'

const useModal = (modal_title) => {
    const dispatch = useDispatch()

    const data = useSelector(state => state.modal)

    const setOpen = (value) => {
        if (value) dispatch(openModal(modal_title))
        else {
            dispatch(closeModal(modal_title))
            //if (onCloseModal !== null || onCloseModal !== null) onCloseModal()
        }
    }

    return [
        data[modal_title],
        setOpen
    ]
}

export default useModal