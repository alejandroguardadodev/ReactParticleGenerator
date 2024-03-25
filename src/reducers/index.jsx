import { combineReducers } from 'redux'

import ModalReducer from './ModalReducer'
import SpritesSheetReducer from './SpritesSheetReducer'
import AnimationMenuReducer from './AnimationMenuReducer'

export default combineReducers({
    modal: ModalReducer,
    spriteSheets: SpritesSheetReducer,
    animationMenu: AnimationMenuReducer
})