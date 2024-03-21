import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'

import ListItemCard from '../lists/ListItemCard'

import SpritesCardListItemBody from '../lists/items/SpritesCardListItemBody'

const BoxContainer = styled(Box)({
  scrollbarWidth: '10px',
  scrollbarColor: '#F2C250 #072b4c',
  '&::-webkit-scrollbar': {
    width: '10px'
  },
  '&::-webkit-scrollbar-track': {
    background: '#072b4c'
  },
  '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#F2C250',
      borderRadius: '10px',
      border: '1px solid white !important'
  }
})

const LeftMenu = ({ height }) => {
  return (
    <BoxContainer sx={{ background: '#072B4C', height: `${Math.floor(height)}px`, borderLeft: '1px dashed rgba(255, 255, 255, .35)', overflowY: 'scroll', overflowX: 'hidden', boxSizing: 'border-box' }}>
        <List sx={{width: '100%', background: 'transparent'}} component="nav" aria-labelledby='left-menu' >
          <ListItemCard title="Sprites" body={<SpritesCardListItemBody />} />
        </List>
    </BoxContainer>
  )
}

export default LeftMenu
