import { useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { styled } from '@mui/material/styles'

import useDrawCanvasSprite from '../hooks/useDrawCanvasSprite';
import useSpriteSheet from '../hooks/useSpriteSheet';
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

// ANIMATION INFO -----------------------------------------------
let imgX = 0, imgY = 0, angle = 0, speed = 0, angleSpeed = 0, curve = 0;
// --------------------------------------------------------------

const SpriteAnimationCanvas = ({ containerWidth, containerHeight, isAnimationMenuOpen }) => {
    
    const [animationSetting, setAnimationSetting] = useState(null)
    const [imgSize, setImgSize] = useState([0, 0])

    const { currentAnimSprite } = useSpriteSheet()
    const { spriteSheet, drawBackground, drawSprite, getResizeInfo } = useDrawCanvasSprite({ sprite: currentAnimSprite })

    const { setNodeRef } = useDroppable({
        id: 'animation-droppable'
    });

    const { canvasRef, middleY } = useCanvas(containerWidth, isAnimationMenuOpen? 400 : 500, open, ctx => {
        // Background
        drawBackground(ctx, '#143D61')

        if (animationSetting === null) return

        const [ width, height ] = imgSize
        //const { angleSpeed, curve } = animationSetting

        imgX += speed;
        imgY += curve * Math.sin(angle);

        drawSprite(ctx, width, height, imgX, imgY)

        angle += angleSpeed
    })

    useEffect(() => {
        if (currentAnimSprite === null) return

        if (currentAnimSprite.hasAnimationInfo) {
            setAnimationSetting({ ...currentAnimSprite.animationPath })
            setImgSize([0, 0])

            console.log('Angle: ', currentAnimSprite.animationPath.angle)

            curve = Number.parseInt(`${currentAnimSprite.animationPath.curve}`) / 100
            angleSpeed = Number.parseInt(`${currentAnimSprite.animationPath.angleSpeed}`) / 100
            angle = Number.parseInt(`${currentAnimSprite.animationPath.angle}`) / 100
            speed = 2
        }
    }, [currentAnimSprite])

    useEffect(() => {
        if (spriteSheet === null) return

        const size = getResizeInfo(80, 80)

        setImgSize(size)
    }, [spriteSheet])

    useEffect(() => {
        if (imgSize[0] === 0 || imgSize[1] === 0) return
        const [ width, height ] = imgSize

        imgX = 0 
        imgY = middleY - (height / 2)

    }, [imgSize, middleY])

    return (
        <CanvasContainer ref={setNodeRef} containerWidth={containerWidth} containerHeight={containerHeight}>
            <AnimationCanvas ref={canvasRef} />
        </CanvasContainer>
    )
}

export default SpriteAnimationCanvas
