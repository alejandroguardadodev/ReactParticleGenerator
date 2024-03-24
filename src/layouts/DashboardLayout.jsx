import { useMemo } from 'react';
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/system';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from '../components/Header';

import SpriteSheetModal from '../modals/windows/SpriteSheetModal';

import { useResizeDetector } from 'react-resize-detector'

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

  const { width: containerWidth, height: containerHeight, ref: containerRef } = useResizeDetector()
  const { width: headerWidth, height: headerHeight, ref: headerRef } = useResizeDetector()

  const bodyHeight = useMemo(
    () => {
      return Math.floor(containerHeight) - Math.floor(headerHeight)
    }
  , [containerHeight, headerHeight]);

  return (
    <>
        <Container variant="no-space">
            <BoxContainer ref={containerRef} >
                <Header headerRef={headerRef} />
                <BodyBox sx={{ height: `${bodyHeight}px` }}>
                  <Outlet />
                </BodyBox>
            </BoxContainer>
        </Container>

        <SpriteSheetModal />
    </>
  )
}

export default DashboardLayout
