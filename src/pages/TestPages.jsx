import { useState } from "react";

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

import SpriteCardsItem from "../components/dnds/items/SpriteCardsItem";

const TestPages = () => {

  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  }

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <Box p={2} sx={{ maxWidth: '1000px', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', boxShadow: '0px 0px 49px -12px rgba(0,0,0,0.57)' }}>
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {
            items.map((id) => (
              <SpriteCardsItem key={id} dragId={id} handle={true} value={id} />
            ))
          }
          <DragOverlay>
            {
              activeId? (
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                    backgroundColor: "red"
                  }}
                ></div>
              ) : null
            }
          </DragOverlay>
        </SortableContext>
      </Box>
    </DndContext>
  )
}

export default TestPages
