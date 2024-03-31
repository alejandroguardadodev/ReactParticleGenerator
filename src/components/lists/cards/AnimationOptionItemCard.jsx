import { useState } from 'react'
import { styled } from '@mui/system'

import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
    '& .MuiListItemText-root': {
        color: 'black',
    },
    borderBottom: '1px dashed black',
    background: 'transparent !important',
}))

const CustomBox = styled(Box)({
    color: 'black',
});

const AnimationOptionItemCard = ({ title, children }) => {

    const [open, setOpen] = useState(true)

    const handleClick = () => setOpen(!open)

    return (
        <>
            <CustomListItemButton onClick={handleClick} sx={{ paddingBottom: '4px' }}>
                <ListItemText primary={title} />
                <CustomBox>
                    {open ?  <ExpandLess /> : <ExpandMore />}
                </CustomBox>
            </CustomListItemButton>

            <Collapse in={open} sx={{ padding: '18px 16px 8px' }} timeout="auto" unmountOnExit>
                {children}
            </Collapse>
        </>
    )
}

export default AnimationOptionItemCard