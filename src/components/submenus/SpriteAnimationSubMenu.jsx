import { styled } from '@mui/system';

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const SpriteMenu = styled(Menu)({
    "& .MuiPaper-root": {
        background: '#252424',
    },
    '& .MuiMenuItem-root': {
        color: 'white',
        padding: '5px 30px',
        fontWeight: 400,
        fontFamily: "'Lekton', sans-serif",
    }
});

const SpriteAnimationSubMenu = ({ id, anchor, open, onClose, onDelete }) => {

    return (
        <SpriteMenu
            id={id}
            aria-labelledby={id}
            anchorEl={anchor}
            open={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <MenuItem onClick={() => { onClose(); onDelete(); }}>Delete Sprite</MenuItem>
        </SpriteMenu>
    )
}

export default SpriteAnimationSubMenu
