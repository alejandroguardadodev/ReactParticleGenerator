import { combineReducers } from 'redux'

import ModalReducer from './ModalReducer'
import SpritesSheetReducer from './SpritesSheetReducer'

export default combineReducers({
    modal: ModalReducer,
    spriteSheets: SpritesSheetReducer
})