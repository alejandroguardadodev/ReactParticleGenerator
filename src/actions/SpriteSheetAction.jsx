import {
    UPLOAD_SPRITES,
    DELETE_SPECIFIC_SPRITE,
    ADD_SPRITE,
    SET_CURRENT_ANIM_SPRITE,
    SET_ANIMATION_ERROR
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

export function setCurrentAnimSprite(sprite) {
    return async (dispatch) => dispatch({
        type: SET_CURRENT_ANIM_SPRITE,
        payload: sprite
    })
}

export function setAnimationError(err) {
    return async (dispatch) => dispatch({
        type: SET_ANIMATION_ERROR,
        payload: err
    })
}