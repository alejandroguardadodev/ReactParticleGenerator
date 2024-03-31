import {
    OPEN_ANIMATION_MENU,
    CLOSE_ANIMATION_MENU,
    DEFINE_MENU_SIZE,
    SET_ANIMATION_PATH
} from '../types/AnimationMenuTypes'

const initialState = {
    open: false,
    sprite: {},
    width: 0,
    animationPath: {
        angle: 0,
        angleSpeed: 0,
        curve: 0
    }
}

export default function(state = initialState, action) {
    const { type } = action

    switch(type) {
        case DEFINE_MENU_SIZE:
            return {
                ...state,
                width: action.payload
            }

        case OPEN_ANIMATION_MENU:
            return {
                ...state,
                sprite: action.payload,
                open: true,
            }

        case CLOSE_ANIMATION_MENU:
            return {
                ...state,
                sprite: {},
                open: false,
            }

        case SET_ANIMATION_PATH:
            return {
                ...state,
                animationPath: {
                    ...action.payload
                }
            }

        default:
            return state
    }
}