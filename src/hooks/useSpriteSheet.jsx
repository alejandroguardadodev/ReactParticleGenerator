import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { 
    uploadSprites,
    deleteSpriteById,
    addSprite,
    setCurrentAnimSprite
} from '../actions/SpriteSheetAction'

const useSpriteSheet = () => {
    const dispatch = useDispatch()

    const { sprites, currentAnimSprite } = useSelector(state => state.spriteSheets)
    
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

    const actionSetCurrentAnimSprite = sprite => dispatch(setCurrentAnimSprite(sprite))

    const actionAddSprite = sprite => {
        dispatch(addSprite(sprite))
    }

    const getAnimationSpriteInfo = id => {
        const curveSpriteKey = `curve_anim_${id}`
        let strCurveAnimations = null, jsonCurveAnimations = {}

        if ((strCurveAnimations = localStorage.getItem("curveAnimations")) !== null && strCurveAnimations !== undefined && strCurveAnimations !== "")
            jsonCurveAnimations = JSON.parse(strCurveAnimations)
        
        return jsonCurveAnimations[curveSpriteKey] || {}
    }

    const findSpriteById = id => {
        const currentSpr = sprites.filter((spr) => spr.id == id)

        if (!currentSpr) return null

        const animationInfo = getAnimationSpriteInfo(id)
        
        return {
            ...currentSpr,
            hasAnimationInfo: (Object.keys(animationInfo).length > 0),
            animationPath: animationInfo
        }
    }

    return {
        sprites,
        currentAnimSprite,
        findSpriteById,
        deleteSpriteById: actionDeleteSpriteById,
        addSprite: actionAddSprite,
        setCurrentAnimSprite: actionSetCurrentAnimSprite
    }
}

export default useSpriteSheet