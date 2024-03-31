import { useSelector, useDispatch } from 'react-redux'

import { openModal, closeModal } from '../actions/ModalAction'

const defaultModalProps = {
    onClose: null,
    label: ''
}

const useModal = (modal_title) => {
    const dispatch = useDispatch()

    const { [modal_title] : data } = useSelector(state => state.modal)

    const setOpen = (value, metadata = {}) => {
        if (value) dispatch(openModal(modal_title, { 
            ...defaultModalProps,
            ...metadata
        }))
        else {
            dispatch(closeModal(modal_title))
            
            if (data.onClose !== null) data.onClose()
            //if (onCloseModal !== null || onCloseModal !== null) onCloseModal()
        }
    }

    const getMetadata = (key) => data[key]

    return [
        data.open,
        setOpen,
        getMetadata
    ]
}

export default useModal