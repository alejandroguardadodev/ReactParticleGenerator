import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { 
    uploadSprites,
    deleteSpriteById,
    addSprite
} from '../actions/SpriteSheetAction'

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

    const actionDeleteSpriteById = id => {
        let savedSpritesStr = "";
        
        if ((savedSpritesStr = localStorage.getItem("SpriteSheets")) !== null && savedSpritesStr !== undefined && savedSpritesStr !== "") {
            let _sprites = JSON.parse(savedSpritesStr)
            let _lastSprite = _sprites.find(sprite => sprite.id == id)

            _sprites = _sprites.filter(sprite => sprite.id !== id)

            if (_lastSprite !== null) localStorage.removeItem(_lastSprite.imgName)
            localStorage.setItem("SpriteSheets", JSON.stringify(_sprites))
            
            dispatch(deleteSpriteById(id))
        }
    }

    const actionAddSprite = sprite => {
        dispatch(addSprite(sprite))
    }

    return {
        sprites,
        deleteSpriteById: actionDeleteSpriteById,
        addSprite: actionAddSprite
    }
}

export default useSpriteSheet