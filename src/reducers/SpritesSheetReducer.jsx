import {
    UPLOAD_SPRITES,
    DELETE_SPECIFIC_SPRITE,
    ADD_SPRITE
} from '../types/SpriteSheetTypes'

const initialState = {
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