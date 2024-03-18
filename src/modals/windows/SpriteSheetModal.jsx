import { useRef, useEffect } from 'react'

import { useResizeDetector } from 'react-resize-detector'

import useModal from "../../hooks/useModal"

import ModalBase from "../ModalBase"
import SpriteSheetCanvas from '../../canvas/SpriteSheetCanvas'
import SpriteSheetForm from '../../forms/SpriteSheetForm'

import Grid from '@mui/material/Grid'

const SpriteSheetModal = () => {

    const [open, setOpen, getMetadata] = useModal("Sprite_Sheet")
    const { width: canvasContainerWidth, height: canvasContainerHeight, ref: canvasContainerRef } = useResizeDetector()

    return (
        <ModalBase open={open} handleClose={() => setOpen(false)}>
            <Grid container spacing={2} sx={{ height: '100%' }}>
                <Grid item xs={7} ref={canvasContainerRef} sx={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                    <SpriteSheetCanvas kind={getMetadata('label')} containerWidth={canvasContainerWidth} containerHeight={canvasContainerHeight} />
                </Grid>
                <Grid item xs={5}>
                    <SpriteSheetForm />
                </Grid>
            </Grid>
        </ModalBase>
    )
}

export default SpriteSheetModal
