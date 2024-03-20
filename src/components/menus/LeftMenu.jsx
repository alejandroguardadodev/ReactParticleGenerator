import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'

import ListItemCard from '../lists/ListItemCard'

const LeftMenu = () => {
  return (
    <Box sx={{ background: '#072B4C', height: '100%', borderLeft: '1px dashed rgba(255, 255, 255, .35)' }}>
        <List 
            sx={{width: '100%', background: 'transparent'}} component="nav" aria-labelledby='left-menu'
            subheader={
                <ListSubheader component="div" id="left-menu-subheader">
                    Setting
                </ListSubheader>
            }    
        >

          <ListItemCard title="Sprites" />
            
        </List>
    </Box>
  )
}

export default LeftMenu
