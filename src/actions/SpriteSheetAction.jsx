import {
    UPLOAD_SPRITES
} from '../types/SpriteSheetTypes'

export function uploadSprites(sprites) {
    return async (dispatch) => dispatch({
        type: UPLOAD_SPRITES,
        payload: sprites
    })
}