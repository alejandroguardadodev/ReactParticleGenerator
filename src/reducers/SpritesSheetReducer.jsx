import {
    UPLOAD_SPRITES,
    DELETE_SPECIFIC_SPRITE,
    ADD_SPRITE,
    SET_CURRENT_ANIM_SPRITE,
    SET_ANIMATION_ERROR
} from '../types/SpriteSheetTypes'

const initialState = {
    currentAnimSprite: null,
    animationError: false,
    sprites: [
        
    ]
}

export default function(state = initialState, action) {
    const { type } = action

    switch(type) {
        case UPLOAD_SPRITES:
            return {
                ...state,
                sprites: action.payload
            }

        case ADD_SPRITE:
            return {
                ...state,
                sprites: [
                    ...state.sprites,
                    action.payload
                ]
            }

        case SET_CURRENT_ANIM_SPRITE:
            return {
                ...state,
                currentAnimSprite: action.payload
            }

        case SET_ANIMATION_ERROR:
            return {
                ...state,
                animationError: action.payload
            }
        
        case DELETE_SPECIFIC_SPRITE:
            const _deletedIdSprite = state.sprites.filter(sprite => sprite.id !== action.payload)
            
            return {
                ...state,
                sprites: _deletedIdSprite
            }

        default:
            return state
    }
}