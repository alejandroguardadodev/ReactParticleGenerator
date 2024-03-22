import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { uploadSprites } from '../actions/SpriteSheetAction'

const useSpriteSheet = () => {
    const dispatch = useDispatch()

    const { sprites } = useSelector(state => state.spriteSheets)
    
    useEffect(() => {
        let savedSpritesStr = "";
        
        if ((savedSpritesStr = localStorage.getItem("SpriteSheets")) !== null && savedSpritesStr !== undefined && savedSpritesStr !== "") {
            const _sprites = JSON.parse(savedSpritesStr);
            
            dispatch(uploadSprites(_sprites))
        }
    }, [])

    return {
        sprites
    }
}

export default useSpriteSheet