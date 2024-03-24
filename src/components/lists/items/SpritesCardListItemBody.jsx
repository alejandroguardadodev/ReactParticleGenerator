import { styled } from '@mui/system'

import { useState, useMemo, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector'

import useSpriteSheet from '../../../hooks/useSpriteSheet';
import useCanvas from '../../../hooks/useCanvas';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core"

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy
} from "@dnd-kit/sortable"

import Box from '@mui/material/Box'
import SpriteCardsItem from '../../dnds/items/SpriteCardsItem';

const CustomBox = styled(Box)({
    width: '100%',
    padding: '5px 10px',
    boxSizing: 'border-box',
});

const SpritesCardListItemBody = ({ containerWidth }) => {

  const [activateCardId, setActivateCardId] = useState(null)
  const [activateImage, setActivateImage] = useState(null)
  const [activateItem, setActivateItem] = useState(null)
  const [items, setItems] = useState([])

  const { sprites } = useSpriteSheet()
  const { width: canvasContainerWidth, height: canvasContainerHeight, ref: canvasContainerRef } = useResizeDetector()

  const findItemById = (id) => {
    let index = -1;

    items.find(function(item, i){
      console.log(item, ' => ', i)

      if(item.id === id) {
        index = i
        return i
      }
    });

    return index
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = (event) => {  setActivateCardId(event.active.id) }

  const handleDragEnd = (event) => {
    setActivateCardId(null);
    const { active, over } = event;

    if (active.id !== over.id)
      setItems((items) => {
        const oldIndex = findItemById(active.id);
        const newIndex = findItemById(over.id);
        console.log(oldIndex, ' - ', newIndex)
        return arrayMove(items, oldIndex, newIndex);
      })
  }

  useEffect(() => {
    if (sprites !== null) {
      setItems(sprites)
    }
  }, [sprites])

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

  const { canvasRef } = useCanvas(canvasContainerWidth, canvasContainerHeight, open, ctx => {
    if (activateImage === null || activateItem === null) return;

    const { columns, rows } = activateItem
   
    const boxWidth = Math.floor(activateImage.width / columns)
    const boxHeight = Math.floor(activateImage.height / rows)

    var hRatio = canvasContainerWidth / boxWidth
    var vRatio = canvasContainerHeight / boxHeight

    var ratio  = Math.min(hRatio, vRatio);

    let imgWidth = Math.floor(boxWidth * ratio) * .75
    let imgHeight = Math.floor(boxHeight * ratio) * .75

    const centerShift_x = ( ctx.canvas.width - imgWidth ) / 2;
    const centerShift_y = ( ctx.canvas.height - imgHeight ) / 2;  

    ctx.drawImage(activateImage, 0, 0, boxWidth, boxHeight, centerShift_x, centerShift_y, imgWidth, imgHeight);
  })

  const cardWidth = useMemo(() => (Math.floor(containerWidth / 2.7)), [containerWidth])
  
  return (
    <CustomBox>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Box p={2} sx={{ maxWidth: `${containerWidth}px`, display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
          <SortableContext items={items} strategy={rectSortingStrategy}>
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
          </SortableContext>
        </Box>
      </DndContext>
    </CustomBox>
  )
}

export default SpritesCardListItemBody
