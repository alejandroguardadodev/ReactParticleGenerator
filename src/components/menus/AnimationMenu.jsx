import useAnimationMenu from "../../hooks/useAnimationMenu"

import { styled } from '@mui/system'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

import CloseIcon from '@mui/icons-material/Close';
import { BorderLeft } from "@mui/icons-material"

const MenuDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== "menuWidth",
})(({ theme, menuWidth }) => ({
    '& .MuiPaper-root': {
        width: `${menuWidth}px`,
        background: '#C7BA77',
        boxShadow: '10px 0px 44px -25px rgba(0,0,0,0.64)',
        borderLeft: '1px solid black !important',
    },
}))

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const AnimationMenu = () => {

    const { openAnimationMenu, animationMenuWidth, handleCloseAnimationMenu } = useAnimationMenu()
    
    return (
        <>
            <MenuDrawer 
                menuWidth={Math.ceil(animationMenuWidth)}
                anchor="right" 
                open={openAnimationMenu} 
                variant="persistent"
            >
                <DrawerHeader>
                    <IconButton sx={{ color: 'black' }} onClick={handleCloseAnimationMenu}>
                        <CloseIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider sx={{ background: 'black' }} />
                
            </MenuDrawer>
        </>
    )
}

export default AnimationMenu