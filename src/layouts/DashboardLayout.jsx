import { Outlet } from 'react-router-dom'
import { styled } from '@mui/system';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from '../components/Header';

import SpriteSheetModal from '../modals/windows/SpriteSheetModal';

const BoxContainer = styled(Box)({
    width: '100vw',
    height: '100vh',
    margin: '0px !important',
    padding: '0px !important',
    display: 'flex',
    flexDirection: 'column'
});

const BodyBox = styled(Box)({
  flexGrow: 1,
});

const DashboardLayout = () => {
  return (
    <>
        <Container variant="no-space">
            <BoxContainer>
                <Header />
                <BodyBox>
                  <Outlet />
                </BodyBox>
            </BoxContainer>
        </Container>

        <SpriteSheetModal />
    </>
  )
}

export default DashboardLayout
