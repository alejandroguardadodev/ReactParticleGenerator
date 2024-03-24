import {
    UPLOAD_SPRITES,
    DELETE_SPECIFIC_SPRITE,
    ADD_SPRITE
} from '../types/SpriteSheetTypes'

export function uploadSprites(sprites) {
    return async (dispatch) => dispatch({
        type: UPLOAD_SPRITES,
        payload: sprites
    })
}

export function deleteSpriteById(id) {
    return async (dispatch) => dispatch({
        type: DELETE_SPECIFIC_SPRITE,
        payload: id
    })
}

export function addSprite(sprite) {
    return async (dispatch) => dispatch({
        type: ADD_SPRITE,
        payload: sprite
    })
}