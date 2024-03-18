import { useRef, useEffect } from 'react'

import { useResizeDetector } from 'react-resize-detector'

import useModal from "../../hooks/useModal"
import useCanvas from '../../hooks/useCanvas'

import ModalBase from "../ModalBase"

import Grid from '@mui/material/Grid'

const SpriteSheetModal = (onClose) => {

    const [open, setOpen] = useModal("Sprite_Sheet", { onClose })

    const { width: canvasContainerWidth, height: canvasContainerHeight, ref: canvasContainerRef } = useResizeDetector()

    const { canvasRef } = useCanvas(canvasContainerWidth, canvasContainerHeight, open, ctx => {
        let image = new Image();
        var dataImage = localStorage.getItem('firstOpenImageFile');
        image.src = dataImage;

        let img_width = image.width
        let img_height = image.height

        var hRatio = ctx.canvas.width / img_width
        var vRatio = ctx.canvas.height / img_height
        var ratio  = Math.min(hRatio, vRatio);
    
        var centerShift_x = ( ctx.canvas.width - img_width*ratio ) / 2;
        var centerShift_y = ( ctx.canvas.height - img_height*ratio ) / 2;  

        ctx.drawImage(image, 0,0, img_width, img_height, centerShift_x,centerShift_y,img_width*ratio, img_height*ratio)

        ctx.strokeRect(centerShift_x,centerShift_y,img_width*ratio, img_height*ratio)
    })

    return (
        <ModalBase open={open} handleClose={() => setOpen(false)}>
            <Grid container spacing={2} sx={{ height: '100%' }}>
                <Grid item xs={7} ref={canvasContainerRef} sx={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                    <canvas ref={canvasRef} />
                </Grid>
                <Grid item xs={5}>OPTIONS</Grid>
            </Grid>
        </ModalBase>
    )
}

export default SpriteSheetModal
