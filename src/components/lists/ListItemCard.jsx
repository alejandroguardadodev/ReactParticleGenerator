import { useState } from 'react';
import { styled } from '@mui/system';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const CustomBox = styled(Box)({
    color: 'white',
    background: '#072B4C',
    width: '24px',
    height: '24px',
    position: 'absolute',
    right: '5%',
    bottom: '0',
    zIndex:'200',
    transform: 'translateY(50%)',
    border:'2px solid #2678BF',
    '&>svg': {
        fontSize: '1.3rem',
    }
});

const ListItemCard = ({ title, body }) => {
    const [open, setOpen] = useState(true)

    const handleClick = () => setOpen(!open)

    return (
        <>
            <ListItemButton onClick={handleClick} className='left-menu-setting-item' sx={{ paddingBottom: '4px' }}>
                <ListItemText primary={title} />
                <CustomBox>
                    {open ?  <ExpandLess /> : <ExpandMore />}
                </CustomBox>
            </ListItemButton>

            <Collapse in={open} sx={{ padding: '18px 16px 8px' }} timeout="auto" unmountOnExit>
                {body}
            </Collapse>
        </>
    )
}

export default ListItemCard
