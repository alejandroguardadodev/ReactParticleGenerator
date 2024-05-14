import { combineReducers } from 'redux'

import ModalReducer from './ModalReducer'
import SpritesSheetReducer from './SpritesSheetReducer'
import AnimationMenuReducer from './AnimationMenuReducer'
import ItemsSortableReducer from './ItemsSortableReducer'

// eslint-disable-next-line react-refresh/only-export-components
export default combineReducers({
    modal: ModalReducer,
    spriteSheets: SpritesSheetReducer,
    animationMenu: AnimationMenuReducer,
    sortabledItem: ItemsSortableReducer
})