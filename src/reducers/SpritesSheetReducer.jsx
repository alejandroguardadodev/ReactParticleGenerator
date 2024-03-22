import {
    UPLOAD_SPRITES
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

        default:
            return state
    }
}