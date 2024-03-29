import {
    OPEN_ANIMATION_MENU,
    DEFINE_MENU_SIZE,
    CLOSE_ANIMATION_MENU,
    SET_ANIMATION_PATH
} from '../types/AnimationMenuTypes'

export function defineMenuWidth(containerWidth) {
    return async (dispatch) => dispatch({
        type: DEFINE_MENU_SIZE,
        payload: containerWidth
    })
}

export function openMenu(sprite) {
    return async (dispatch) => dispatch({
        type: OPEN_ANIMATION_MENU,
        payload: sprite
    })
}

export function closeMenu() {
    return async (dispatch) => dispatch({
        type: CLOSE_ANIMATION_MENU
    })
}

export function setAnimationPath(data) {
    return async (dispatch) => dispatch({
        type: SET_ANIMATION_PATH,
        payload: data
    })
}