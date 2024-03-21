import { styled } from '@mui/system'

import { useState, useMemo, useEffect } from 'react';
import useSpriteSheet from '../../../hooks/useSpriteSheet';

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

  const [activateCardId, setActivateCardId] = useState(null);
  const [items, setItems] = useState([])

  const { sprites } = useSpriteSheet()

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
    if (items.length === 0) setItems(sprites)
  }, [sprites])

  const cardWidth = useMemo(() => (Math.floor(containerWidth / 2.7)), [containerWidth])
  
  return (
    <CustomBox>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Box p={2} sx={{ maxWidth: `${containerWidth}px`, display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {
              items.map((sprite) => (
                <SpriteCardsItem key={sprite.id} dragId={sprite.id} handle={true} value={sprite.id} width={cardWidth}/>
              ))
            }
            <DragOverlay>
              {
                activateCardId? (
                  <div
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardWidth  + 25}px`,
                      backgroundColor: "red"
                    }}
                  ></div>
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
