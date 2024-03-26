import {DndContext, useDraggable, useDroppable} from '@dnd-kit/core';
import { styled } from '@mui/material/styles'

import useCanvas from "../hooks/useCanvas"

import Box from '@mui/material/Box'

const AnimationCanvas = styled("canvas")(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: '3px',
}))

const CanvasContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "containerWidth" && prop !== "containerHeight"
})(({ theme, containerWidth, containerHeight }) => ({
    width: `${containerWidth}px !important`,
    height: `${containerHeight}px !important`
}))

const SpriteAnimationCanvas = ({ containerWidth, containerHeight, isAnimationMenuOpen }) => {

    const { setNodeRef } = useDroppable({
        id: 'animation-droppable'
    });

    const { canvasRef } = useCanvas(containerWidth, isAnimationMenuOpen? 400 : 500, open, ctx => {
        // Background
        ctx.fillStyle = '#143D61'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    })

    return (
        <CanvasContainer ref={setNodeRef} containerWidth={containerWidth} containerHeight={containerHeight}>
            <AnimationCanvas ref={canvasRef} />
        </CanvasContainer>
    )
}

export default SpriteAnimationCanvas
