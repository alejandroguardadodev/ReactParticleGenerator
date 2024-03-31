import { useMemo } from 'react'
import { styled } from '@mui/system'

import useAnimationMenu from '../../hooks/useAnimationMenu'
import useSpriteSheet from '../../hooks/useSpriteSheet'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'

import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import RouteIcon from '@mui/icons-material/Route'

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

const SpriteAnimationSubMenu = ({ id, anchor, open, onClose, onDelete, sprite }) => {

    const { openAnimationMenu, handleOpenAnimationMenu } = useAnimationMenu()
    const { setAnimationError } = useSpriteSheet()


    const noneAnimation = useMemo(() => {
        if (sprite === null || Object.keys(sprite).length === 0) return true

        const { id: spriteId } = sprite

        const curveSpriteKey = `curve_anim_${spriteId}`

        let strCurveAnimations = null, jsonCurveAnimations = {}

        if ((strCurveAnimations = localStorage.getItem("curveAnimations")) !== null && strCurveAnimations !== undefined && strCurveAnimations !== "")
            jsonCurveAnimations = JSON.parse(strCurveAnimations)

        return !jsonCurveAnimations[curveSpriteKey]
    }, [sprite, openAnimationMenu])

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
            <Divider sx={{ background: 'rgba(255, 255, 255, .2)' }} />
            <MenuItem onClick={() => { 
                onClose(); 
                handleOpenAnimationMenu(sprite); 
                setAnimationError(false); 
            }}>
                <ListItemIcon sx={{ color: '#50F287' }}>
                    <RouteIcon />
                </ListItemIcon>
                {(noneAnimation)? 'Add' : 'Set'} Animation
            </MenuItem>
        </SpriteMenu>
    )
}

export default SpriteAnimationSubMenu
