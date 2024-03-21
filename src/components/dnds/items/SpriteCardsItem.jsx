import { styled } from '@mui/material/styles'
import { useSortable } from '@dnd-kit/sortable'

import Box from '@mui/material/Box'

import DraggableItemBase from '../DraggableItemBase'

const CardContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "boxWidth"
})(({ boxWidth }) => ({
  width: `${boxWidth}px`,
  height: `${boxWidth + 25}px`,
  border: "2px solid red",
  backgroundColor: "#cccccc",
  margin: "10px",
}))

const SpriteCardsItem = ({ dragId, width }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: dragId });
  
  return (
    <DraggableItemBase id={dragId} setNodeRef={setNodeRef} transform={transform} transition={transition} isDragging={isDragging}>
      <CardContainer {...listeners} {...attributes} boxWidth={width}>
        TEST
      </CardContainer>
    </DraggableItemBase>
  )
}

export default SpriteCardsItem