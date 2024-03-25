import { useRef, useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { 
    openMenu,
    closeMenu,
    defineMenuWidth
 } from '../actions/AnimationMenuAction'

const useAnimationMenu = () => {
    const dispatch = useDispatch()

    const { open, sprite, width } = useSelector(state => state.animationMenu)

    const actionOpenAnimationMenu = (_sprite) => dispatch(openMenu(_sprite));
    const actionCloseAnimationMenu = () => dispatch(closeMenu());
    const actionDefineAnimationMenuSize = (containerWidth) => dispatch(defineMenuWidth(containerWidth))

    return {
        openAnimationMenu: open,
        currentSprite: sprite,
        animationMenuWidth: width,
        handleOpenAnimationMenu: actionOpenAnimationMenu,
        handleCloseAnimationMenu: actionCloseAnimationMenu,
        defineAnimationMenuWidth: actionDefineAnimationMenuSize
    }
}

export default useAnimationMenu