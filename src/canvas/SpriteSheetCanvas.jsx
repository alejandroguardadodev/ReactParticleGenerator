import { useState, useEffect } from 'react';

import useCanvas from '../hooks/useCanvas'

const SpriteSheetCanvas = ({ image, imgWidth, imgHeight, containerWidth, containerHeight, kind }) => {

    const { canvasRef } = useCanvas(containerWidth, containerHeight, open, ctx => {
        if (imgWidth <= 0 || imgHeight <= 0) return;
        // CENTER IMAGE --------------------------
        var centerShift_x = ( ctx.canvas.width - imgWidth ) / 2;
        var centerShift_y = ( ctx.canvas.height - imgHeight ) / 2;  
        // DRAW IMAGE -------------------------------
        ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x, centerShift_y, imgWidth, imgHeight)
        // Draw Rectangles
        ctx.strokeRect(centerShift_x,centerShift_y,imgWidth, imgHeight)
    })

    return (
        <>
            <canvas ref={canvasRef} />
        </>
    )
}

export default SpriteSheetCanvas
