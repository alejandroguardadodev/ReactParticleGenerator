import { useSortable } from '@dnd-kit/sortable'

import { styled } from '@mui/material/styles' 
import { CSS } from "@dnd-kit/utilities"

import Box from '@mui/material/Box'

const CardContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isDragging" && prop !== "transform" && prop !== "transition",
})
(({ theme, isDragging, transform, transition }) => ({
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
}))

const CardBody = styled(Box, {
  shouldForwardProp: (prop) => prop !== "boxWidth"
})(({ boxWidth }) => ({
  width: `${boxWidth}px`,
  height: `${boxWidth + 25}px`,

  backgroundColor: "#E2E0D9",
  borderRadius: '2px',
  margin: "10px",
  padding: '5px',

  position: 'relative'
}))

const SpriteCardsItem = ({dragId, width}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: dragId });
  


  return (
    <CardContainer id={dragId} ref={setNodeRef} transform={transform} transition={transition} isDragging={isDragging}>
      <CardBody {...listeners} {...attributes} boxWidth={width}>
        TEST: {dragId}
      </CardBody>
    </CardContainer>
  )
}

export default SpriteCardsItem
