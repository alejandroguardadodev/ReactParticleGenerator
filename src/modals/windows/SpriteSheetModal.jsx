import { useRef, useEffect, useState } from 'react'

import { useResizeDetector } from 'react-resize-detector'

import useModal from "../../hooks/useModal"
import useSpriteSheet from '../../hooks/useSpriteSheet'

import ModalBase from "../ModalBase"
import SpriteSheetCanvas from '../../canvas/SpriteSheetCanvas'
import SpriteSheetForm from '../../forms/SpriteSheetForm'

import Grid from '@mui/material/Grid'

import alertify from 'alertifyjs';

const initSpritePropeties = {
    columns: "1",
    rows: "1",
    numberOfFrames: "1",
    framesPerRows: "1",
    boxHeight: "0",
    boxWidth: "0",
    offsetRows: "0", 
    offsetColumns: "0",
    framesCounts: "0",
}

const SpriteSheetModal = () => {

    const [image, setImage] = useState(null)

    const [ { imgWidth, imgHeight, realImgWidth, realImgHeight }, setImgSize ] = useState({ 
        imgWidth: 0, 
        imgHeight: 0,
        realImgWidth: 0,
        realImgHeight: 0
    })
    
    const [ spritePropeties, setSpritePropeties ] = useState(initSpritePropeties)

    const [open, setOpen, getMetadata] = useModal("Sprite_Sheet")
    const { addSprite } = useSpriteSheet()

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
        let imgWidth = Math.floor(img_width * ratio)
        let imgHeight = Math.floor(img_height * ratio)

        var imageSize = {
            imgWidth: `${imgWidth}`, 
            imgHeight: `${imgHeight}`,
            realImgWidth: `${imgWidth}`, 
            realImgHeight: `${imgHeight}`,
        }

        setImgSize(imageSize)
        
        setSpritePropeties({
            ...spritePropeties,
            boxWidth: imgWidth,
            boxHeight: imgHeight,
        });
    }, [canvasContainerWidth, canvasContainerHeight, image, open])

    const onChange = (id, value) => {
        let newProps = {
            [id]: value
        }

        switch(id) {
            case 'columns':
                newProps['boxWidth'] = `${Math.floor(Number.parseInt(realImgWidth) / Number.parseInt(value))}`
                break;
            case 'rows':
                newProps['boxHeight'] = `${Math.floor(Number.parseInt(realImgWidth) / Number.parseInt(value))}`
                break;
        }
        
        setSpritePropeties({
            ...spritePropeties,
            ...newProps
        });
    }

    const onUpdate = (data) => {
        
        let nextId = 1, currentId = 0;

        if ((currentId = localStorage.getItem("currentSpriteId")) !== null && currentId !== undefined && currentId !== "")
            nextId = Number.parseInt(currentId) + 1
          
        const imgFileName = "SpriteSheet_" + nextId;

        localStorage.setItem("currentSpriteId", nextId)
        localStorage.setItem(imgFileName, localStorage.getItem('firstOpenImageFile'))

        const dataToSave = {
            id: nextId,
            imgName: imgFileName,
            rows: data.rows,
            columns: data.columns,
            numberOfFrames: data.numberOfFrames, // COlUMNS
            framesPerRows: data.framesPerRows, // ROWS
            offsetX: data.offsetRows,
            offsetY: data.offsetColumns,
        }

        let savedSprites = [], savedSpritesStr = "";

        if ((savedSpritesStr = localStorage.getItem("SpriteSheets")) !== null && savedSpritesStr !== undefined && savedSpritesStr !== "") {
            savedSprites = JSON.parse(savedSpritesStr);
        }

        savedSprites.push(dataToSave)

        localStorage.setItem("SpriteSheets", JSON.stringify(savedSprites))

        addSprite(dataToSave)

        setOpen(false)

        alertify.success('Sprite added succefully'); 
    }

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
                        containerHeight={canvasContainerHeight}
                        spriteProps={spritePropeties}
                        />
                </Grid>
                <Grid item xs={5}>
                    <SpriteSheetForm 
                        onChange={onChange}
                        onUpdate={onUpdate}
                        spriteProps={spritePropeties}
                    />
                </Grid>
            </Grid>
        </ModalBase>
    )
}

export default SpriteSheetModal
