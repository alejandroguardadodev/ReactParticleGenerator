import { Outlet } from 'react-router-dom'
import { styled } from '@mui/system';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import SpriteSheetModal from '../modals/windows/SpriteSheetModal';

const BoxContainer = styled(Box)({
    width: '100vw',
    height: '100vh',
    margin: '0px !important',
    padding: '0px !important',
    display: 'flex',
    flexDirection: 'column'
});

const DashboardLayout = () => {
  return (
    <>
        <Container variant="no-space">
            <BoxContainer>
                <Outlet />
            </BoxContainer>
        </Container>

        <SpriteSheetModal />
    </>
  )
}

export default DashboardLayout
