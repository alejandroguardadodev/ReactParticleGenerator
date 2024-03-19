import { useRef, useEffect, useState } from 'react'

import { useResizeDetector } from 'react-resize-detector'

import useModal from "../../hooks/useModal"

import ModalBase from "../ModalBase"
import SpriteSheetCanvas from '../../canvas/SpriteSheetCanvas'
import SpriteSheetForm from '../../forms/SpriteSheetForm'

import Grid from '@mui/material/Grid'

const initSpritePropeties = {
    numberOfFrames: "1",
    framesPerRows: "1", 
}

const SpriteSheetModal = () => {

    const [image, setImage] = useState(null)
    const [ { imgWidth, imgHeight }, setImgSize ] = useState({ imgWidth: 0, imgHeight: 0 })
    const [ spritePropeties, setSpritePropeties ] = useState(initSpritePropeties)

    const [open, setOpen, getMetadata] = useModal("Sprite_Sheet")
    const { width: canvasContainerWidth, height: canvasContainerHeight, ref: canvasContainerRef } = useResizeDetector()

    useEffect(() => {
        if(!open) return;

        let _image = new Image();
        var dataImage = localStorage.getItem('firstOpenImageFile');
        _image.src = dataImage;

        setImage(_image)

        setSpritePropeties(initSpritePropeties)
    }, [open])

    useEffect(() => {
        if(!open) return;

        if (canvasContainerWidth === null || canvasContainerWidth === undefined || image === null) return;
        // CALCULATE RATIO --------------------------
        let img_width = image.width
        let img_height = image.height
        
        var hRatio = canvasContainerWidth / img_width
        var vRatio = canvasContainerHeight / img_height

        var ratio  = Math.min(hRatio, vRatio);
        // SET NORMAL IMAGE SET ---------------------
        setImgSize({
            imgWidth: img_width * ratio, 
            imgHeight: img_height * ratio
        })
    }, [canvasContainerWidth, canvasContainerHeight, image, open])

    return (
        <ModalBase open={open} handleClose={() => setOpen(false)}>
            <Grid container spacing={2} sx={{ height: '100%' }}>
                <Grid item xs={7} ref={canvasContainerRef} sx={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                    <SpriteSheetCanvas 
                        image={image}
                        imgWidth={imgWidth}
                        imgHeight={imgHeight}
                        kind={getMetadata('label')} 
                        containerWidth={canvasContainerWidth} 
                        containerHeight={canvasContainerHeight} />
                </Grid>
                <Grid item xs={5}>
                    <SpriteSheetForm 
                        setSpriteProps={setSpritePropeties}
                        spriteProps={spritePropeties}
                    />
                </Grid>
            </Grid>
        </ModalBase>
    )
}

export default SpriteSheetModal
