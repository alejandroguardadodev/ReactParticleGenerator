import { styled } from '@mui/system'

import { useState, useMemo, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector'

import useItemsSortable from '../../../hooks/useItemsSortable';
import useSpriteSheet from '../../../hooks/useSpriteSheet';
import useCanvas from '../../../hooks/useCanvas';

import { useDroppable, DragOverlay } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import SpriteCardsItem from '../../dnds/items/SpriteCardsItem';

const CustomBox = styled(Box)({
    width: '100%',
    padding: '5px 10px',
    boxSizing: 'border-box',
});

const ImgNotFound = styled('img')({
  maxWidth: '100%',
});

const SpritesCardListItemBody = ({ containerWidth }) => {

  const { setNodeRef } = useDroppable({ id: 'container_1'});

  const [activateImage, setActivateImage] = useState(null)
  const [activateItem, setActivateItem] = useState(null)

  const { sprites } = useSpriteSheet()
  const { width: canvasContainerWidth, height: canvasContainerHeight, ref: canvasContainerRef } = useResizeDetector()

  // NEW ------------------------------------------------------
  const { items, activeId: activateCardId } = useItemsSortable('SpritesSheet')

  useEffect(() => {
    if (activateCardId >= 1) {
      const _activateItem = sprites.find(sprite => sprite.id == activateCardId)

      let _image = new Image();
      var dataImage = localStorage.getItem(_activateItem.imgName);
      _image.src = dataImage;

      setActivateImage(_image)
      setActivateItem(_activateItem)
    }
  }, [activateCardId])
  // ----------------------------------------------------------

  const { canvasRef } = useCanvas(canvasContainerWidth, canvasContainerHeight, open, ctx => {
    if (activateImage === null || activateItem === null) return;

    const { columns, rows, offsetX, offsetY } = activateItem
   
    const boxWidth = Math.floor(activateImage.width / columns)
    const boxHeight = Math.floor(activateImage.height / rows)

    var hRatio = canvasContainerWidth / boxWidth
    var vRatio = canvasContainerHeight / boxHeight

    var ratio  = Math.min(hRatio, vRatio);

    let imgWidth = Math.floor(boxWidth * ratio) * .75
    let imgHeight = Math.floor(boxHeight * ratio) * .75

    const centerShift_x = ( ctx.canvas.width - imgWidth ) / 2;
    const centerShift_y = ( ctx.canvas.height - imgHeight ) / 2;  

    ctx.drawImage(activateImage, (offsetX * boxWidth), (offsetY * boxHeight), boxWidth, boxHeight, centerShift_x, centerShift_y, imgWidth, imgHeight);
  })

  const cardWidth = useMemo(() => (Math.floor(containerWidth / 2.7)), [containerWidth])

  return (
    <CustomBox>
      <SortableContext id='container_1' items={items} strategy={rectSortingStrategy}>
        {
          (items !== null && items.length > 0)? 
          (
            <Box ref={setNodeRef} p={2} sx={{ maxWidth: `${containerWidth}px`, display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                {
                  items.map((sprite) => (
                    <SpriteCardsItem key={sprite.id} dragId={sprite.id} handle={true} sprite={sprite} width={cardWidth}/>
                  ))
                }
                <DragOverlay>
                  {
                    activateCardId? (
                      <div
                        ref={canvasContainerRef}
                        style={{
                          width: `${cardWidth}px`,
                          height: `${cardWidth  + 25}px`,
                          backgroundColor: "#E2E0D9",
                          borderRadius: '2px',
                          margin: "10px",

                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <canvas ref={canvasRef} />
                      </div>
                    ) : null
                  }
                </DragOverlay>
            </Box>
          ) : (
            <Stack spacing={2}>
              <ImgNotFound src='img/not_found_404.png' />
              <Typography variant="h3" color="white" textAlign="center" textTransform="uppercase" gutterBottom>
                Content not found
              </Typography>
              <Typography variant="h4" color="white" textAlign="center" textTransform="uppercase" gutterBottom>
                Start uploading your images
              </Typography>
            </Stack>
          )
        }
      </SortableContext>
    </CustomBox>
  )
}

export default SpritesCardListItemBody
