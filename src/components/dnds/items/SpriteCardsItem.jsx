import { useSortable } from '@dnd-kit/sortable'
import { useRef, useEffect, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import useCanvas from '../../../hooks/useCanvas'
import useSpriteSheet from '../../../hooks/useSpriteSheet'
import useSpriteByCanvas from '../../../hooks/useSpriteByCanvas'

import { styled } from '@mui/material/styles' 
import { CSS } from "@dnd-kit/utilities"

import alertify from 'alertifyjs';

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import IconButton from '@mui/material/IconButton'

import MenuIcon from '@mui/icons-material/Menu';

import SpriteAnimationSubMenu from '../../submenus/SpriteAnimationSubMenu'

const CardContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isDragging" && prop !== "transform" && prop !== "transition",
})
(({ theme, isDragging, transform, transition }) => ({
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
    position: 'relative',
}))

const CardBody = styled(Box, {
  shouldForwardProp: (prop) => prop !== "boxWidth"
})(({ boxWidth }) => ({
  width: `${boxWidth}px`,
  height: `${boxWidth + 25}px`,

  backgroundColor: "#E2E0D9",
  borderRadius: '2px',
  margin: "10px",

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  boxShadow: '0px 0px 30px -10px rgba(0,0,0,0.8)'
}))

const GAMESPEED = 20;

const SpriteCardsItem = ({ dragId, width, sprite }) => {
  let frame = 0, frames = 0, frameX = 0, frameY = 0;

  const [columnFrameLimit, setColumnFrameLimit] = useState(0)
  const [rowFrameLimit, setRowFrameLimit] = useState(0)

  const [anchorEl, setAnchorEl] = useState(null)
  const subMenuOpen = Boolean(anchorEl)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: dragId });

  const {
    id: spriteId,
    imgName: flinename_img,
    rows,
    columns,
    numberOfFrames,
    framesPerRows,
    offsetX,
    offsetY,
  } = sprite

  const { width: containerWidth, height: containerHeight, ref: canvasContainerRef } = useResizeDetector()
  const { img: spriteSheet } = useSpriteByCanvas(flinename_img, { canvasWidth: containerWidth, canvasHeight: containerHeight })

  const { canvasRef } = useCanvas(containerWidth, containerHeight, open, ctx => {
    if (spriteSheet === null) return;
   
    const boxWidth = Math.floor(spriteSheet.width / columns)
    const boxHeight = Math.floor(spriteSheet.height / rows)

    var hRatio = containerWidth / boxWidth
    var vRatio = containerHeight / boxHeight

    var ratio  = Math.min(hRatio, vRatio);

    let imgWidth = Math.floor(boxWidth * ratio) * .75
    let imgHeight = Math.floor(boxHeight * ratio) * .75

    const centerShift_x = ( ctx.canvas.width - imgWidth ) / 2;
    const centerShift_y = ( ctx.canvas.height - imgHeight ) / 2;  
    
    ctx.drawImage(spriteSheet, (boxWidth * offsetX) + (frameX * boxWidth), (boxHeight * offsetY)  + (frameY * boxHeight), boxWidth, boxHeight, centerShift_x, centerShift_y, imgWidth, imgHeight);

    frames++;

    if (frames % GAMESPEED === 0) {
      if (frameX >= columnFrameLimit) {
        if (rows > 1) frameY = (frameY >= rowFrameLimit)? 0 : frameY + 1;
        frameX = 0
      } else frameX++
    }
  })

  const { deleteSpriteById } = useSpriteSheet()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  useEffect(() => {
    setColumnFrameLimit(framesPerRows - 1)
  }, [framesPerRows])

  useEffect(() => {
    setRowFrameLimit(numberOfFrames - 1)
  }, [numberOfFrames])

  useEffect(() => {
    if (!isDragging) frame = 0
  }, [isDragging])

  // EVENTS --------------------

  const onDelete = () => {
    alertify.confirm('Warning!', "Are you sure you want to delete the sprite?", function(){
      deleteSpriteById(spriteId)
      alertify.success('Deleted'); 
    }, function(){});
  }

  return (
    <CardContainer id={dragId} ref={setNodeRef} transform={transform} transition={transition} isDragging={isDragging}>
      <Stack direction="row" justifyContent="flex-end" sx={{ position: 'absolute', top: '4%', right: '6%' }}>
        <IconButton id={`sprite-submenu-${spriteId}-button`} onClick={handleClick} aria-label="sub_menu" sx={{ color: 'black' }}>
          <MenuIcon />
        </IconButton>
      </Stack>

      <CardBody ref={canvasContainerRef} {...listeners} {...attributes} boxWidth={width}>
        <canvas ref={canvasRef} />
      </CardBody>

      <SpriteAnimationSubMenu id={`sprite-submenu-${spriteId}-menu`} sprite={sprite} open={subMenuOpen} anchor={anchorEl} onClose={handleClose} onDelete={onDelete}/>
    </CardContainer>
  )
}

export default SpriteCardsItem
