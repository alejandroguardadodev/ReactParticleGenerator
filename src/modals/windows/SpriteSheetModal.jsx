import ModalBase from "../ModalBase"

import useModal from "../../hooks/useModal"

const SpriteSheetModal = () => {

    const [open, setOpen] = useModal("Sprite_Sheet")

    return (
        <ModalBase open={open} handleClose={() => setOpen(false)}>
            HELLO WORLD!!!
        </ModalBase>
    )
}

export default SpriteSheetModal
