import { useEffect, useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { styled } from '@mui/material/styles'

import useAnimationMenu from '../hooks/useAnimationMenu'
import useDrawCanvasSprite from '../hooks/useDrawCanvasSprite'
import useSpriteSheet from '../hooks/useSpriteSheet'
import useCanvas from "../hooks/useCanvas"

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

import CloseIcon from '@mui/icons-material/Close'

import alertify from 'alertifyjs'

const ChipError = styled(Chip)(({theme}) => ({
    fontWeight: 400,
    fontFamily: "'Lekton', sans-serif",
    textTransform: 'uppercase',
    padding: '5px 10px 5px 20px',
    position: 'absolute',
    top: '0',
    right: '0',
    transform: 'translate(5px, -50%)'
}))

const AnimationCanvas = styled("canvas", {
    shouldForwardProp: (prop) => prop !== "error"
})(({ theme, error }) => ({
    border: `1px solid ${error? "red" : theme.palette.primary.light}`,
    borderRadius: '3px',
}))

const CanvasContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "containerWidth" && prop !== "containerHeight"
})(({ theme, containerWidth, containerHeight }) => ({
    width: `${containerWidth}px !important`,
    height: `${containerHeight}px !important`,
    position: 'relative'
}))

// ANIMATION INFO -----------------------------------------------
let imgX = 0, imgY = 0, angle = 0, speed = 0, angleSpeed = 0, curve = 0;

const resetAnimationInfo = () => {
    imgX = 0
    imgY = 0
    angle = 0
    speed = 0
    angleSpeed = 0
    curve = 0;
}
// --------------------------------------------------------------

const SpriteAnimationCanvas = ({ containerWidth, containerHeight, isAnimationMenuOpen }) => {
    
    const [animationSetting, setAnimationSetting] = useState(null)
    const [imgSize, setImgSize] = useState([0, 0])

    const { openAnimationMenu, animationPath } = useAnimationMenu()
    const { currentAnimSprite, animationError, setAnimationError } = useSpriteSheet()
    const { spriteSheet, drawBackground, drawSprite, getResizeInfo, removeSpriteSheet } = useDrawCanvasSprite({ sprite: currentAnimSprite })

    const { setNodeRef } = useDroppable({
        id: 'animation-droppable'
    });

    const { canvasRef, middleY } = useCanvas(containerWidth, isAnimationMenuOpen? 400 : 500, true, ctx => {
        // Background
        drawBackground(ctx, '#143D61')

        const canvasWidth = ctx.canvas.width
        const canvasHeigh = ctx.canvas.height

        if (openAnimationMenu) { // TO TESt the animation

            let circleSize = 5
            const increaseY = curve * Math.sin(angle)

            imgX += speed;
            imgY += increaseY

            ctx.beginPath()
            ctx.arc(imgX, imgY, circleSize, 0, 2 * Math.PI);
            ctx.fillStyle = '#1DF098'
            ctx.fill()

            if (imgX >= canvasWidth) imgX = -circleSize

            if ( increaseY > 0 && imgY >= canvasHeigh) imgY = -circleSize
            if ( increaseY < 0 && (imgY + circleSize) <= 0 ) imgY = canvasHeigh

            angle += angleSpeed

            return;
        }

        if (animationSetting === null) return

        const [ width, height ] = imgSize

        const increaseY = curve * Math.sin(angle)

        imgX += speed;
        imgY += increaseY

        drawSprite(ctx, width, height, imgX, imgY)

        if (imgX >= canvasWidth) imgX = -width

        if ( increaseY > 0 && imgY >= canvasHeigh) imgY = -height
        if ( increaseY < 0 && (imgY + height) <= 0 ) imgY = canvasHeigh
        

        angle += angleSpeed
    })

    useEffect(() => {
        if (currentAnimSprite === null) return

        if (currentAnimSprite.hasAnimationInfo) {
            setAnimationSetting({ ...currentAnimSprite.animationPath })
            setImgSize([0, 0])

            console.log('Angle: ', currentAnimSprite.animationPath.angle)

            curve = Number.parseInt(`${currentAnimSprite.animationPath.curve}`) / 100
            angleSpeed = Number.parseInt(`${currentAnimSprite.animationPath.angleSpeed}`) / 1000
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

    useEffect(() => { if (animationError) {
        removeSpriteSheet()
        alertify.error('No Animation Path Defined');
        resetAnimationInfo()
    } }, [animationError])

    useEffect(() => {
        if (openAnimationMenu) {
            removeSpriteSheet()
            resetAnimationInfo()

            imgY = middleY - 5;
            speed = 2
            // PREPEARE FOR ANIMATION TEST
        }
    }, [openAnimationMenu])

    useEffect(() => {
        if (openAnimationMenu) {
            
            curve = Number.parseInt(`${animationPath.curve}`) / 100
            angleSpeed = Number.parseInt(`${animationPath.angleSpeed}`) / 1000
            angle = Number.parseInt(`${animationPath.angle}`) / 100

            imgX = 0
            imgY = middleY - 5;
        }
    }, [animationPath])

    return (
        <CanvasContainer ref={setNodeRef} containerWidth={containerWidth} containerHeight={containerHeight} >
            <AnimationCanvas ref={canvasRef} error={animationError}/>

            {animationError && (<ChipError
                label="No Animation"
                onClick={() => {setAnimationError(false)}}
                onDelete={() => {setAnimationError(false)}}
                deleteIcon={<CloseIcon />}
                color="error"
            />)}
            
        </CanvasContainer>
    )
}

export default SpriteAnimationCanvas
