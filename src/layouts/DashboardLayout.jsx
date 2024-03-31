import { useMemo, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/system'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import Header from '../components/Header'

import SpriteSheetModal from '../modals/windows/SpriteSheetModal'
import AnimationMenu from '../components/menus/AnimationMenu'

import useItemsSortable from '../hooks/useItemsSortable'
import useSpriteSheet from '../hooks/useSpriteSheet'

import alertify from 'alertifyjs'

// ----------------
import { useResizeDetector } from 'react-resize-detector'
import { DndContext, useSensors, KeyboardSensor, PointerSensor, useSensor, closestCenter } from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"

const BoxContainer = styled(Box)({
    width: '100vw',
    height: '100vh',
    maxHeight: '100vh',
    margin: '0px !important',
    padding: '0px !important',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    overflow: 'hidden'
});

const BodyBox = styled(Box)({
  flexGrow: 1,
});

const DashboardLayout = () => {

  const { height: containerHeight, ref: containerRef } = useResizeDetector()
  const { height: headerHeight, ref: headerRef } = useResizeDetector()

  const bodyHeight = useMemo( () => (Math.floor(containerHeight) - Math.floor(headerHeight)), [containerHeight, headerHeight]);

  // DnD Kit Context --------------------------------------
  const { setItems, setActiveItemId, items, findIndexByItemId } = useItemsSortable('SpritesSheet')
  const { sprites, setCurrentAnimSprite, findSpriteById, setAnimationError } = useSpriteSheet()

  const defaultAnnouncements = {
    onDragStart(id) {
      console.log(`Picked up draggable item ${id}.`);
    },
    onDragOver(id, overId) {
      if (overId) {
        console.log(
          `Draggable item ${id} was moved over droppable area ${overId}.`
        );
        return;
      }
  
      console.log(`Draggable item ${id} is no longer over a droppable area.`);
    },
    onDragEnd(id, overId) {
      if (overId) {
        console.log(
          `Draggable item ${id} was dropped over droppable area ${overId}`
        );
        return;
      }
  
      console.log(`Draggable item ${id} was dropped.`);
    },
    onDragCancel(id) {
      console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = (event) => {  setActiveItemId(event.active.id) }

  const handleDragEnd = (event) => {
    setActiveItemId(null);

    const { active, over } = event;

    if (active.id !== over.id) {

      if (over.id !== "animation-droppable") {
        const oldIndex = findIndexByItemId(active.id)
        const newIndex = findIndexByItemId(over.id)

        setItems(arrayMove(items, oldIndex, newIndex))
      } else { // START ANIMATION
        const currentSprite = findSpriteById(active.id);
        
        if (currentSprite.hasAnimationInfo) setCurrentAnimSprite(currentSprite)

        setAnimationError(!currentSprite.hasAnimationInfo)

        if (!currentSprite.hasAnimationInfo) alertify.error('No Animation Path Defined');
      }
    }
  }
  
  useEffect(() => {
    if (sprites !== null) setItems(sprites)
  }, [sprites])

  // ------------------------------------------------------

  return (
    <DndContext 
      announcements={defaultAnnouncements} 
      sensors={sensors} 
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd} 
      onDragStart={handleDragStart}
    >
        <Container variant="no-space">
            <BoxContainer ref={containerRef} >
                <Header headerRef={headerRef} />
                <BodyBox sx={{ height: `${bodyHeight}px` }}>
                  <Outlet />
                </BodyBox>
            </BoxContainer>
        </Container>

        <SpriteSheetModal />
        <AnimationMenu />
    </DndContext>
  )
}

export default DashboardLayout
