import { useRef, useEffect, useState, useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { 
    openMenu,
    closeMenu,
    defineMenuWidth,
    setAnimationPath
 } from '../actions/AnimationMenuAction'

const useAnimationMenu = () => {
    const dispatch = useDispatch()

    const { open, sprite, width, animationPath } = useSelector(state => state.animationMenu)

    const actionOpenAnimationMenu = (_sprite) => dispatch(openMenu(_sprite));
    const actionCloseAnimationMenu = () => dispatch(closeMenu());
    const actionDefineAnimationMenuSize = (containerWidth) => dispatch(defineMenuWidth(containerWidth))

    const actionSetAnimationPath = (data) => dispatch(setAnimationPath(data))

    const resetAnimationPath = () => dispatch(setAnimationPath({
        angle: 0,
        angleSpeed: 0,
        curve: 0
    }))

    const hasAnimationPath = useMemo(() => (sprite !== null && Object.keys(animationPath).length > 0), [animationPath])

    useEffect(() => {
        if (!open) resetAnimationPath();
    }, [open])

    return {
        openAnimationMenu: open,
        currentSprite: sprite,
        animationMenuWidth: width,
        animationPath,
        hasAnimationPath,
        handleOpenAnimationMenu: actionOpenAnimationMenu,
        handleCloseAnimationMenu: actionCloseAnimationMenu,
        defineAnimationMenuWidth: actionDefineAnimationMenuSize,
        setAnimationPath: actionSetAnimationPath,
        resetAnimationPath
    }
}

export default useAnimationMenu