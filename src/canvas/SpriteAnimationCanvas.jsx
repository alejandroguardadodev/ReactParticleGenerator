import { styled } from '@mui/material/styles'

import useCanvas from "../hooks/useCanvas"

const AnimationCanvas = styled("canvas")(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: '3px',
}))

const SpriteAnimationCanvas = ({ containerWidth, containerHeight, isAnimationMenuOpen }) => {

    const { canvasRef } = useCanvas(containerWidth, isAnimationMenuOpen? 400 : 500, open, ctx => {
        // Background
        ctx.fillStyle = '#143D61'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    })

    return (
        <>
            <AnimationCanvas ref={canvasRef} />
        </>
    )
}

export default SpriteAnimationCanvas
