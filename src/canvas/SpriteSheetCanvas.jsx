import { useState, useEffect } from 'react';

import useCanvas from '../hooks/useCanvas'

const SpriteSheetCanvas = ({ image, imgWidth, imgHeight, containerWidth, containerHeight, spriteProps, kind }) => {

    const { columns, rows, numberOfFrames, framesPerRows, offsetRows, offsetColumns } = spriteProps

    const { canvasRef } = useCanvas(containerWidth, containerHeight, open, ctx => {
        if (imgWidth <= 0 || imgHeight <= 0) return;
        // CENTER IMAGE --------------------------
        var centerShift_x = ( ctx.canvas.width - imgWidth ) / 2;
        var centerShift_y = ( ctx.canvas.height - imgHeight ) / 2;  
        // DRAW IMAGE -------------------------------
        ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x, centerShift_y, imgWidth, imgHeight)
        // Draw Rectangles #50F287
        ctx.strokeStyle = "#FF0000";

        let boxWidth = imgWidth / columns
        let boxHeight = imgHeight / rows

        for (var i = 0; i < framesPerRows; i++)
            for (var j = 0; j < numberOfFrames; j++) {
                ctx.strokeRect((centerShift_x  + (boxWidth * offsetRows)) + (boxWidth * i), (centerShift_y  + (boxHeight * offsetColumns)) + (boxHeight * j), boxWidth, boxHeight)
            }
    })

    return (
        <>
            <canvas ref={canvasRef} />
        </>
    )
}

export default SpriteSheetCanvas
