import { useState, useEffect, useMemo } from "react"

const useDrawCanvasSprite = ({sprite, isAnimated=false}) => {

    let frames=0, frameX=0, frameY = 0;

    const [ image, setImage ] = useState(null)

    const drawBackground = (ctx, background) => {
        ctx.fillStyle = background
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }

    const drawSpriteForFullBox = (ctx) => {
        if (image === null) return;

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

    return {
        drawBackground,
        drawSpriteForFullBox,
        spriteSheet: image,
        spriteBoxWidth: boxWidth,
        spriteBoxHeight: boxHeight
    }
}

export default useDrawCanvasSprite