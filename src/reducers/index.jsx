import { combineReducers } from 'redux'

import ModalReducer from './ModalReducer'
import SpritesSheetReducer from './SpritesSheetReducer'
import AnimationMenuReducer from './AnimationMenuReducer'
import ItemsSortableReducer from './ItemsSortableReducer'

export default combineReducers({
    modal: ModalReducer,
    spriteSheets: SpritesSheetReducer,
    animationMenu: AnimationMenuReducer,
    sortabledItem: ItemsSortableReducer
})