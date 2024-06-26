import { useState, useEffect, useMemo } from "react"

const useDrawCanvasSprite = ({sprite, isAnimated=false}) => {

    let frames=0, frameX=0, frameY = 0;

    const [ image, setImage ] = useState(null)
    const [columnFrameLimit, setColumnFrameLimit] = useState(null)
    const [rowFrameLimit, setRowFrameLimit] = useState(null)

    const drawBackground = (ctx, background) => {
        ctx.fillStyle = background
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }

    const increaseFrames = () => {
        if (image === null || sprite === null) return;

        const { rows } = sprite

        frames++;

        if (frames % import.meta.env.VITE_APP_GAMESPEED === 0) {
            if (frameX >= columnFrameLimit) {
                if (rows > 1) frameY = (frameY >= rowFrameLimit)? 0 : frameY + 1;
                frameX = 0
            } else frameX++
        }
    }

    const getRatio = (ctx) => {
        var hRatio = ctx.canvas.width / boxWidth
        var vRatio = ctx.canvas.height / boxHeight

        return Math.min(hRatio, vRatio);
    }

    const getResizeInfo = (width, height) => {
        var img_w = width
        var img_h = height
        var img_ratio = 0

        if(boxWidth > img_w){
            img_ratio = img_w / boxWidth;
            img_h = boxHeight * img_ratio;
            img_w = boxWidth * img_ratio;
        }

        // Check if current height is larger than max
        if(boxHeight > img_h){
            img_ratio = img_h / boxHeight;
            img_w = boxWidth * img_ratio;
            img_h = boxHeight * img_ratio;
        }

        return [Math.ceil(img_w), Math.ceil(img_h)]
    }

    const drawSprite = (ctx, width, height, x, y) => {
        if (image === null || sprite === null) return;

        const { offsetX, offsetY } = sprite
        
        ctx.drawImage(image, boxWidth*(offsetX + frameX), boxHeight*(offsetY + frameY), boxWidth, boxHeight, x, y, width, height);

        increaseFrames()
    }

    const drawSpriteForFullBox = (ctx) => {
        if (image === null || sprite === null) return;

        const {
            rows,
            columns,
            numberOfFrames,
            framesPerRows,
            offsetX,
            offsetY,
        } = sprite

        const boxWidth = Math.floor(image.width / columns)
        const boxHeight = Math.floor(image.height / rows)

        var hRatio = ctx.canvas.width / boxWidth
        var vRatio = ctx.canvas.height / boxHeight

        var ratio  = Math.min(hRatio, vRatio);

        let imgWidth = Math.floor(boxWidth * ratio) * .75
        let imgHeight = Math.floor(boxHeight * ratio) * .75

        const centerShift_x = ( ctx.canvas.width - imgWidth ) / 2;
        const centerShift_y = ( ctx.canvas.height - imgHeight ) / 2;  
        
        ctx.drawImage(image, (boxWidth * offsetX) + (frameX * boxWidth), (boxHeight * offsetY)  + (frameY * boxHeight), boxWidth, boxHeight, centerShift_x, centerShift_y, imgWidth, imgHeight);

        frames++;

        let columnFrameLimit = framesPerRows - 1;
        let rowFrameLimit = numberOfFrames - 1;

        if (frames % import.meta.env.VITE_APP_GAMESPEED === 0) {
            if (frameX >= columnFrameLimit) {
                if (rows > 1) frameY = (frameY >= rowFrameLimit)? 0 : frameY + 1;
                frameX = 0
            } else frameX++
        }
    }

    useEffect(() => {
        if (sprite === null || Object.keys(sprite).length === 0) return
        
        let _image = new Image();
        var dataImage = localStorage.getItem(sprite.imgName);
        _image.src = dataImage;
        
        setImage(_image)
        
        // ANIMATION INFO
        const { numberOfFrames, framesPerRows } = sprite

        if (framesPerRows) setColumnFrameLimit(framesPerRows - 1)
        if (framesPerRows) setRowFrameLimit(numberOfFrames - 1)
    }, [sprite])

    const boxWidth = useMemo(() => {
        if (sprite === null || Object.keys(sprite).length === 0 || image === null) return 0;

        const { columns } = sprite

        return Math.floor(image.width / columns)
    }, [image, sprite])

    const boxHeight = useMemo(() => {
        if (sprite === null || Object.keys(sprite).length === 0 || image === null) return 0;

        const { rows } = sprite

        return Math.floor(image.height / rows)
    }, [image, sprite])

    const removeSpriteSheet = () => { setImage(null) }

    return {
        drawSprite,
        getResizeInfo,
        drawBackground,
        drawSpriteForFullBox,
        removeSpriteSheet,
        spriteSheet: image,
        spriteBoxWidth: boxWidth,
        spriteBoxHeight: boxHeight
    }
}

export default useDrawCanvasSprite