import { styled } from '@mui/material/styles'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities"

import Box from '@mui/material/Box'

const Container = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isDragging" && prop !== "transform" && prop !== "transition",
})
(({ theme, isDragging, transform, transition }) => ({
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1
}))

const DraggableItemBase = ({ id, children, setNodeRef, transform, transition, isDragging}) => {
    
    return (
        <Container ref={setNodeRef} transition={transition} isDragging={isDragging} transform={transform}>
           {children}
        </Container>
    )
}

export default DraggableItemBase
